import { getGhostPost, listGhostPosts, type GhostPost } from "@/lib/ghost";
import { writing, type WritingItem } from "@/lib/site";

export type WritingRow = {
  kind: "writing";
  slug: string;
  title: string;
  line: string;
  started: number;
  date: string;
  year: string;
  source: "local" | "ghost";
  showYear: boolean;
  path: string;
};

export type WritingArticle = WritingRow & {
  html?: string;
  minutes: number;
};

function localRow(item: WritingItem): Omit<WritingRow, "showYear" | "path"> {
  return {
    kind: "writing",
    slug: item.slug,
    title: item.title,
    line: item.line,
    started: item.started,
    date: item.date,
    year: item.year,
    source: "local",
  };
}

function ghostRow(post: GhostPost): Omit<WritingRow, "showYear" | "path"> {
  return {
    kind: "writing",
    slug: post.slug,
    title: post.title,
    line: post.excerpt,
    started: post.started,
    date: post.date,
    year: String(post.started),
    source: "ghost",
  };
}

export function mergeWriting(
  local: readonly Omit<WritingRow, "showYear" | "path">[],
  remote: readonly Omit<WritingRow, "showYear" | "path">[],
) {
  const taken = new Set(local.map((item) => item.slug));
  const extra = remote.filter((item) => !taken.has(item.slug));
  const sorted = [...local, ...extra].sort((a, b) => b.date.localeCompare(a.date));
  let lastYear: number | null = null;
  return sorted.map((item) => {
    const showYear = item.started !== lastYear;
    lastYear = item.started;
    return { ...item, showYear, path: `/writing/${item.slug}` };
  });
}

export async function listWriting(): Promise<WritingRow[]> {
  const remote = await listGhostPosts();
  return mergeWriting(writing.map(localRow), remote.map(ghostRow));
}

export async function getWriting(slug: string): Promise<WritingArticle | null> {
  const local = writing.find((item) => item.slug === slug);
  if (local) {
    return {
      ...mergeWriting([localRow(local)], [])[0],
      minutes: 1,
    };
  }
  const remote = await getGhostPost(slug);
  if (!remote) return null;
  const row = mergeWriting([], [ghostRow(remote)])[0];
  return { ...row, html: remote.html, minutes: remote.minutes };
}

export async function writingNeighborsFromFeed(slug: string) {
  const items = await listWriting();
  const index = items.findIndex((item) => item.slug === slug);
  if (index < 0) return { newer: null, older: null };
  return {
    newer: items[index - 1] ?? null,
    older: items[index + 1] ?? null,
  };
}
