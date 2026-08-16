import { describe, expect, it } from "vitest";
import { site, work, workBySlug, workIndex, writingBySlug, writingIndex } from "./site";

describe("site", () => {
  it("has public links", () => {
    expect(site.x.startsWith("https://x.com/")).toBe(true);
    expect(site.email.includes("@")).toBe(true);
    expect(site.linkedin.includes("linkedin.com")).toBe(true);
    expect(site.github.includes("github.com")).toBe(true);
    expect(site.about.length).toBeGreaterThanOrEqual(3);
    expect(site.contributions.length).toBeGreaterThanOrEqual(4);
    const stack = site.stack.flatMap((row) => row.items);
    expect(stack).toEqual(
      expect.arrayContaining(["TypeScript", "React", "Python", "Rust", "Lua", "C#", "AWS", "Kubernetes", "Terraform", "ArgoCD", "Tailwind"]),
    );
    expect(stack).not.toEqual(expect.arrayContaining(["Vue.js", "Nuxt"]));
  });

  it("indexes published work and writing", () => {
    expect(workBySlug("psynth")?.title).toBe("Psynth");
    expect(workBySlug("readied")?.href).toBe("https://readied.app");
    expect(workBySlug("cairn")?.repo?.includes("github.com")).toBe(true);
    expect(workBySlug("criterionx")?.repo?.includes("github.com")).toBe(true);
    expect(workBySlug("readied")?.repo?.includes("github.com")).toBe(true);
    expect(workBySlug("missing")).toBeNull();
    expect(writingBySlug("claude-code-pm")?.date).toBe("2025-10-03");
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
    expect(projects[0]?.slug).toBe("psynth");
    expect(projects.map((item) => item.slug)).toContain("criterionx");
    expect(projects.map((item) => item.slug)).not.toContain("claude-code-pm");
    expect(notes[0]?.slug).toBe("section-generation-pipeline");
  });
});
