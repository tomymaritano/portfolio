import { describe, expect, it } from "vitest";
import {
  homeSlugs,
  homeWork,
  isHomeSlug,
  site,
  work,
  workBySlug,
  workIndex,
  workLanes,
  workSections,
  writingBySlug,
  writingIndex,
} from "./site";

describe("site", () => {
  it("has public links", () => {
    expect(site.x.startsWith("https://x.com/")).toBe(true);
    expect(site.email.includes("@")).toBe(true);
    expect(site.linkedin.includes("linkedin.com")).toBe(true);
    expect(site.github.includes("github.com")).toBe(true);
    expect(site.about.length).toBeGreaterThanOrEqual(3);
    expect(site.about[0]).not.toMatch(/^I started building/i);
    expect(site.about[0]).not.toMatch(/^I was twelve/i);
    expect(site.about[0]).toMatch(/document|generat|Psynth/i);
    expect(site.line).toMatch(/extract/i);
    expect(site.about.join(" ")).toMatch(/twelve|12/i);
    expect(site.about.join(" ")).toMatch(/CMS/i);
    expect(site.contributions.length).toBeGreaterThanOrEqual(4);
    const stack = site.stack.flatMap((row) => row.items);
    expect(stack).toEqual(
      expect.arrayContaining([
        "TypeScript",
        "React",
        "Python",
        "Rust",
        "Lua",
        "C#",
        "AWS",
        "Kubernetes",
        "Terraform",
        "ArgoCD",
        "Tailwind",
        "Vercel",
        "SQLite",
        "QMK",
        "Three.js",
        "Sanity",
      ]),
    );
    expect(stack).not.toEqual(expect.arrayContaining(["Vue.js", "Nuxt"]));
  });

  it("indexes published work and writing", () => {
    expect(workBySlug("dripnex")?.title).toBe("Dripnex");
    expect(workBySlug("dripnex")?.href).toBe("https://dripnex.app");
    expect(workBySlug("psynth")?.title).toBe("Psynth");
    expect(workBySlug("readied")?.href).toBe("https://readied.app");
    expect(workBySlug("cairn")?.repo?.includes("github.com")).toBe(true);
    expect(workBySlug("criterionx")?.repo?.includes("github.com")).toBe(true);
    expect(workBySlug("readied")?.repo?.includes("github.com")).toBe(true);
    expect(workBySlug("missing")).toBeNull();
    expect(writingBySlug("claude-code-pm")?.date).toBe("2025-10-03");
    expect(workBySlug("devwifi")?.title).toBe("DevWifiBar");
    expect(workBySlug("devwifi")?.repo).toBe("https://github.com/tomymaritano/devwibar");
    expect(writingBySlug("devwibar-tls")).toBeNull();
    expect(writingBySlug("grok-bot-and-cursor")?.title).toBe("Grok 4.6 in Cursor is not Grok Bot");
    expect(writingBySlug("corne-keyboard")?.title).toBe("A Corne is a 42-key contract");
    expect(writingBySlug("grok-bot-and-cursor")?.date).toBe("2026-08-20");
    expect(writingBySlug("corne-keyboard")?.date).toBe("2026-08-20");
    expect(work.some((item) => item.slug === "dolargaucho")).toBe(true);
    expect(work.map((item) => item.slug)).toEqual(
      expect.arrayContaining(["unicoin", "billspace", "grandvalira-sede", "freedom-people", "jetsetz"]),
    );
  });

  it("keeps work and writing on separate indexes", () => {
    const projects = workIndex();
    const notes = writingIndex();
    expect(projects.every((item) => item.kind === "work")).toBe(true);
    expect(notes.every((item) => item.kind === "writing")).toBe(true);
    expect(projects[0]?.slug).toBe("devwifi");
    expect(projects.map((item) => item.slug)).toContain("criterionx");
    expect(projects.map((item) => item.slug)).not.toContain("claude-code-pm");
    expect(homeWork().map((item) => item.slug)).toEqual(["psynth", "dripnex", "dolargaucho", "quantis-intel"]);
    expect(workBySlug("quantis-intel")?.line).toBe("The financial report a desk will send.");
    expect(notes[0]?.slug).toBe("the-note-came-first");
    expect(workLanes.devwifi).toBe("product");
    expect(notes.map((item) => item.slug)).toContain("section-generation-pipeline");
    expect(workLanes.dripnex).toBe("product");
    expect(workLanes.unicoin).toBe("role");
    expect(workLanes.billspace).toBe("client");
    expect(workSections().map((section) => section.lane)).toEqual(["product", "role", "client"]);
  });

  it("keeps the four spine products on /work selected, not in archive", () => {
    expect([...homeSlugs]).toEqual(["psynth", "dripnex", "dolargaucho", "quantis-intel"]);
    expect(homeWork().map((item) => item.slug)).toEqual([...homeSlugs]);
    expect(isHomeSlug("dripnex")).toBe(true);
    expect(isHomeSlug("readied")).toBe(false);
    expect(homeWork().every((item) => item.cover || item.stills.length > 0)).toBe(true);

    const archive = workSections().flatMap((section) => section.items.map((item) => item.slug));
    expect(archive).not.toEqual(expect.arrayContaining([...homeSlugs]));
    expect(archive).toContain("readied");
    expect(archive).toContain("devwifi");
    expect(archive).toContain("unicoin");
    expect(archive).toContain("billspace");

    const products = workSections().find((section) => section.lane === "product")?.items.map((item) => item.slug) ?? [];
    expect(products[0]).toBe("devwifi");
    expect(products).not.toContain("psynth");
    expect(products).not.toContain("dripnex");
  });
});
