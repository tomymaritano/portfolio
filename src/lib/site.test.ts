import { describe, expect, it } from "vitest";
import { site, work, workBySlug } from "./site";

describe("site", () => {
  it("has a public X URL and email", () => {
    expect(site.x.startsWith("https://x.com/")).toBe(true);
    expect(site.email.includes("@")).toBe(true);
  });

  it("indexes the two spine cases", () => {
    expect(work.map((item) => item.slug)).toEqual(["psynth", "dolargaucho"]);
    expect(workBySlug("psynth")?.title).toBe("Psynth");
    expect(workBySlug("missing")).toBeNull();
  });
});
