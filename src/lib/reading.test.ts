import { describe, expect, it } from "vitest";
import { readingMinutes } from "./reading";

describe("readingMinutes", () => {
  it("counts body words after frontmatter and rounds to minutes", () => {
    expect(readingMinutes(`---\ntitle: x\n---\n\n${"word ".repeat(220)}`)).toBe(1);
    expect(readingMinutes(`---\ntitle: x\n---\n\n${"word ".repeat(330)}`)).toBe(2);
    expect(readingMinutes("---\ntitle: x\n---\n\nShort.")).toBe(1);
  });
});
