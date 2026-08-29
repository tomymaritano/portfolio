import { describe, expect, it } from "vitest";
import { codeSource, fenceLanguage, sectionUrl } from "./copy";

describe("copy helpers", () => {
  it("replaces the hash and keeps the rest of the URL", () => {
    expect(sectionUrl("https://tomymaritano.com/writing/foo?x=1#old", "the-problem")).toBe(
      "https://tomymaritano.com/writing/foo?x=1#the-problem",
    );
  });

  it("strips a trailing newline from fenced source", () => {
    expect(codeSource("const n = 1;\n")).toBe("const n = 1;");
    expect(codeSource("const n = 1;")).toBe("const n = 1;");
  });

  it("reads a fence language and ignores mermaid", () => {
    expect(fenceLanguage("language-ts")).toBe("ts");
    expect(fenceLanguage("language-mermaid")).toBe("");
    expect(fenceLanguage(undefined)).toBe("");
  });
});
