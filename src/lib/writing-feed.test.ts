import { describe, expect, it } from "vitest";
import { mergeWriting } from "@/lib/writing-feed";

describe("mergeWriting", () => {
  it("keeps local notes and appends Ghost posts that do not collide", () => {
    const merged = mergeWriting(
      [
        {
          kind: "writing",
          slug: "local-note",
          title: "Local",
          line: "From git",
          started: 2026,
          date: "2026-08-01",
          year: "2026",
          source: "local",
        },
      ],
      [
        {
          kind: "writing",
          slug: "local-note",
          title: "Ghost copy",
          line: "Should lose",
          started: 2026,
          date: "2026-09-01",
          year: "2026",
          source: "ghost",
        },
        {
          kind: "writing",
          slug: "new-from-ghost",
          title: "New",
          line: "From Ghost",
          started: 2026,
          date: "2026-09-02",
          year: "2026",
          source: "ghost",
        },
      ],
    );
    expect(merged.map((item) => item.slug)).toEqual(["new-from-ghost", "local-note"]);
    expect(merged[0]?.source).toBe("ghost");
    expect(merged[1]?.source).toBe("local");
    expect(merged[1]?.title).toBe("Local");
  });
});
