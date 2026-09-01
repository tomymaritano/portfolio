import type { MetadataRoute } from "next";
import { itemPath, site, work } from "@/lib/site";
import { listWriting } from "@/lib/writing-feed";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const notes = await listWriting();
  const latest = notes[0]?.date ?? work[0]?.date ?? "2026-08-22";
  const pages = [
    { path: "/", date: latest },
    { path: "/work", date: work[0]?.date ?? latest },
    { path: "/writing", date: notes[0]?.date ?? latest },
    { path: "/colophon", date: latest },
  ];

  return [
    ...pages.map((page) => ({
      url: `${site.url}${page.path === "/" ? "" : page.path}`,
      lastModified: page.date,
    })),
    ...work.map((item) => ({
      url: `${site.url}${itemPath(item)}`,
      lastModified: item.date,
    })),
    ...notes.map((item) => ({
      url: `${site.url}${item.path}`,
      lastModified: item.date,
    })),
  ];
}
