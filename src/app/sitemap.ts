import type { MetadataRoute } from "next";
import { itemPath, site, work, writing } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = writing[0]?.date ?? work[0]?.date ?? "2026-08-22";
  const pages = [
    { path: "/", date: latest },
    { path: "/work", date: work[0]?.date ?? latest },
    { path: "/writing", date: writing[0]?.date ?? latest },
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
    ...writing.map((item) => ({
      url: `${site.url}${itemPath(item)}`,
      lastModified: item.date,
    })),
  ];
}
