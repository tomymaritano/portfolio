import { readFile } from "node:fs/promises";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { readingMinutes } from "@/lib/reading";

type Frontmatter = { title: string; line: string };

async function loadMdx(dir: "work" | "writing", slug: string) {
  const file = path.join(process.cwd(), "content", dir, `${slug}.mdx`);
  const source = await readFile(file, "utf8");
  const compiled = await compileMDX<Frontmatter>({
    source,
    components: mdxComponents,
    options: { parseFrontmatter: true },
  });
  return { ...compiled, minutes: readingMinutes(source) };
}

export function loadWork(slug: string) {
  return loadMdx("work", slug);
}

export function loadWriting(slug: string) {
  return loadMdx("writing", slug);
}
