import { readFile } from "node:fs/promises";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import type { WorkSlug } from "@/lib/site";

export async function loadWork(slug: WorkSlug) {
  const file = path.join(process.cwd(), "content/work", `${slug}.mdx`);
  const source = await readFile(file, "utf8");
  return compileMDX<{ title: string; line: string }>({
    source,
    options: { parseFrontmatter: true },
  });
}
