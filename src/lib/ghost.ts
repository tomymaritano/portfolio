export type GhostPost = {
  slug: string;
  title: string;
  html: string;
  excerpt: string;
  date: string;
  started: number;
  minutes: number;
};

type GhostApiPost = {
  slug?: string;
  title?: string;
  html?: string | null;
  custom_excerpt?: string | null;
  excerpt?: string | null;
  published_at?: string | null;
  reading_time?: number | null;
};

type GhostList = {
  posts?: GhostApiPost[];
  meta?: { pagination?: { next?: number | null } };
};

function ghostConfig() {
  const url = process.env.GHOST_URL?.replace(/\/$/, "");
  const key = process.env.GHOST_CONTENT_API_KEY;
  if (!url || !key) return null;
  return { url, key };
}

export function ghostConfigured() {
  return ghostConfig() !== null;
}

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function toDate(iso: string) {
  return iso.slice(0, 10);
}

function mapPost(post: GhostApiPost): GhostPost | null {
  if (!post.slug || !post.title || !post.published_at) return null;
  const html = post.html ?? "";
  const excerpt = post.custom_excerpt?.trim() || stripHtml(post.excerpt ?? html).slice(0, 160);
  return {
    slug: post.slug,
    title: post.title,
    html,
    excerpt,
    date: toDate(post.published_at),
    started: Number(post.published_at.slice(0, 4)),
    minutes: Math.max(1, post.reading_time ?? Math.round(stripHtml(html).split(/\s+/).filter(Boolean).length / 220)),
  };
}

async function ghostFetch(path: string) {
  const cfg = ghostConfig();
  if (!cfg) return null;
  const joiner = path.includes("?") ? "&" : "?";
  const res = await fetch(`${cfg.url}/ghost/api/content${path}${joiner}key=${cfg.key}`, {
    headers: { "Accept-Version": "v6.0" },
    next: { revalidate: 120, tags: ["writing"] },
  });
  if (!res.ok) return null;
  return (await res.json()) as GhostList;
}

export async function listGhostPosts() {
  if (!ghostConfigured()) return [];
  const posts: GhostPost[] = [];
  try {
    let page = 1;
    while (page) {
      const data = await ghostFetch(`/posts/?limit=100&page=${page}&formats=html`);
      if (!data?.posts?.length) break;
      for (const row of data.posts) {
        const mapped = mapPost(row);
        if (mapped) posts.push(mapped);
      }
      page = data.meta?.pagination?.next ?? 0;
    }
  } catch {
    return posts;
  }
  return posts;
}

export async function getGhostPost(slug: string) {
  if (!ghostConfigured()) return null;
  try {
    const data = await ghostFetch(`/posts/slug/${encodeURIComponent(slug)}/?formats=html`);
    const row = data?.posts?.[0];
    return row ? mapPost(row) : null;
  } catch {
    return null;
  }
}

export function sanitizeGhostHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
}
