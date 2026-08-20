import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  itemPath,
  site,
  work,
  workBySlug,
  workLane,
  writing,
  writingBySlug,
  type WorkLane,
} from "@/lib/site";

export type ContentKind = "work" | "writing";

export type CatalogWork = {
  kind: "work";
  slug: string;
  title: string;
  line: string;
  year: string;
  started: number;
  date: string;
  lane: WorkLane;
  path: string;
  href: string | null;
  repo: string | null;
};

export type CatalogWriting = {
  kind: "writing";
  slug: string;
  title: string;
  line: string;
  year: string;
  started: number;
  date: string;
  path: string;
};

export function catalogSite() {
  return {
    name: site.name,
    handle: site.handle,
    headline: site.headline,
    line: site.line,
    city: site.city,
    x: site.x,
    xHandle: site.xHandle,
    email: site.email,
    github: site.github,
    linkedin: site.linkedin,
    about: [...site.about],
    stack: site.stack.map((row) => ({ label: row.label, items: [...row.items] })),
  };
}

export function catalogWork(): CatalogWork[] {
  return work.map((item) => ({
    kind: "work",
    slug: item.slug,
    title: item.title,
    line: item.line,
    year: item.year,
    started: item.started,
    date: item.date,
    lane: workLane(item.slug),
    path: itemPath(item),
    href: item.href,
    repo: item.repo,
  }));
}

export function catalogWriting(): CatalogWriting[] {
  return writing.map((item) => ({
    kind: "writing",
    slug: item.slug,
    title: item.title,
    line: item.line,
    year: item.year,
    started: item.started,
    date: item.date,
    path: itemPath(item),
  }));
}

export function listCatalog() {
  return {
    site: catalogSite(),
    work: catalogWork(),
    writing: catalogWriting(),
  };
}

export function contentHash(value: unknown) {
  return JSON.stringify(value);
}

export async function readRawMdx(kind: ContentKind, slug: string) {
  const file = path.join(process.cwd(), "content", kind, `${slug}.mdx`);
  return readFile(file, "utf8");
}

export async function getEntry(kind: ContentKind, slug: string) {
  if (kind === "work") {
    const item = workBySlug(slug);
    if (!item) return null;
    const listed = catalogWork().find((row) => row.slug === slug);
    if (!listed) return null;
    try {
      const body = await readRawMdx("work", slug);
      return { ...listed, body };
    } catch {
      return null;
    }
  }

  const item = writingBySlug(slug);
  if (!item) return null;
  const listed = catalogWriting().find((row) => row.slug === slug);
  if (!listed) return null;
  try {
    const body = await readRawMdx("writing", slug);
    return { ...listed, body };
  } catch {
    return null;
  }
}

export function isContentKind(value: string): value is ContentKind {
  return value === "work" || value === "writing";
}
