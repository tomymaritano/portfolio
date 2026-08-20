import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { catalogWork, getEntry, listCatalog } from "./catalog";
import { cvData } from "./cv";
import { envAllowsDraft } from "@/mcp/create-server";
import { buildDraftFiles, draftPrBody, draftSchema, sourceHasSlug } from "./draft";

describe("catalog", () => {
  it("lists site, work, and writing from site.ts", () => {
    const catalog = listCatalog();
    expect(catalog.site.line).toMatch(/extract/i);
    expect(catalog.work.map((item) => item.slug)).toContain("dripnex");
    expect(catalog.writing.map((item) => item.slug)).toContain("grok-bot-and-cursor");
    const quantis = catalog.work.find((item) => item.slug === "quantis-intel");
    expect(quantis?.href).toBeNull();
    expect(quantis?.lane).toBe("product");
    expect(catalogWork().every((item) => item.path.startsWith("/work/"))).toBe(true);
  });

  it("returns raw MDX for an entry", async () => {
    const entry = await getEntry("work", "dripnex");
    expect(entry?.title).toBe("Dripnex");
    expect(entry?.body).toMatch(/SQLite/);
    expect(await getEntry("work", "missing")).toBeNull();
  });
});

describe("draft files", () => {
  const source = readFileSync(new URL("./site.ts", import.meta.url), "utf8");

  it("builds an MDX file and a site.ts patch without merging", () => {
    const input = draftSchema.parse({
      kind: "writing",
      slug: "test-note",
      title: "A test note",
      line: "Only a draft.",
      date: "2026-08-20",
      body: "A short body.",
    });
    const files = buildDraftFiles(source, input);
    expect(files.map((file) => file.path)).toEqual([
      "content/writing/test-note.mdx",
      "src/lib/site.ts",
    ]);
    const mdx = files[0]?.content ?? "";
    const next = files[1]?.content ?? "";
    expect(mdx).toContain('title: "A test note"');
    expect(mdx).toContain("A short body.");
    expect(next).toContain('slug: "test-note"');
    expect(next).toContain("export const writing = [");
    expect(sourceHasSlug(source, "test-note")).toBe(false);
    expect(draftPrBody(input)).toMatch(/Do not merge/);
  });

  it("patches work and workLanes together", () => {
    const input = draftSchema.parse({
      kind: "work",
      slug: "new-product",
      title: "New Product",
      line: "A draft case.",
      date: "2026-08-21",
      lane: "product",
      href: null,
    });
    const next = buildDraftFiles(source, input).find((file) => file.path === "src/lib/site.ts")?.content ?? "";
    expect(next).toContain('slug: "new-product"');
    expect(next).toContain('"new-product": "product"');
    expect(() => buildDraftFiles(source, { ...input, slug: "dripnex" })).toThrow(/already/);
  });

  it("does not allow drafts without env tokens", () => {
    expect(envAllowsDraft()).toBe(false);
  });

  it("rejects a bad slug", () => {
    expect(draftSchema.safeParse({ kind: "work", slug: "Nope", title: "X", line: "Y", date: "2026-01-01" }).success).toBe(
      false,
    );
  });
});

describe("cv data", () => {
  it("uses professional copy, not site narrative", () => {
    const data = cvData();
    const blob = JSON.stringify(data);
    expect(data.name).toBe("Tomás Maritano");
    expect(data.title).toBe("Head of Engineering");
    expect(data.summary).toMatch(/Psynth/);
    expect(data.education.school).toMatch(/Tecnológica Nacional/);
    expect(data.products.find((item) => item.slug === "quantis-intel")?.href).toBeNull();
    expect(blob).not.toMatch(/extract messy|desk will send|tooltip list|I ship products/i);
    expect(blob).not.toMatch(/PHI/i);
  });
});
