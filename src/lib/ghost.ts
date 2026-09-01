import { createHmac } from "node:crypto";

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
  status?: string | null;
};

type GhostList = {
  posts?: GhostApiPost[];
  meta?: { pagination?: { next?: number | null } };
};

type GhostConfig =
  | { url: string; mode: "content"; key: string }
  | { url: string; mode: "admin"; id: string; secret: string };

function ghostConfig(): GhostConfig | null {
  const url = process.env.GHOST_URL?.replace(/\/$/, "");
  if (!url) return null;
  const content = process.env.GHOST_CONTENT_API_KEY;
  if (content) return { url, mode: "content", key: content };
  const admin = process.env.GHOST_ADMIN_API_KEY;
  if (!admin?.includes(":")) return null;
  const [id, secret] = admin.split(":");
  if (!id || !secret) return null;
  return { url, mode: "admin", id, secret };
}

export function ghostConfigured() {
  return ghostConfig() !== null;
}

function adminToken(id: string, secret: string) {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", kid: id, typ: "JWT" })).toString("base64url");
  const now = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(JSON.stringify({ iat: now, exp: now + 300, aud: "/admin/" })).toString("base64url");
  const sig = createHmac("sha256", Buffer.from(secret, "hex")).update(`${header}.${payload}`).digest("base64url");
  return `${header}.${payload}.${sig}`;
}

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function toDate(iso: string) {
  return iso.slice(0, 10);
}

function mapPost(post: GhostApiPost): GhostPost | null {
  if (post.status && post.status !== "published") return null;
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
  const headers: Record<string, string> = { "Accept-Version": "v6.0" };
  let endpoint: string;
  if (cfg.mode === "content") {
    const joiner = path.includes("?") ? "&" : "?";
    endpoint = `${cfg.url}/ghost/api/content${path}${joiner}key=${cfg.key}`;
  } else {
    endpoint = `${cfg.url}/ghost/api/admin${path}`;
    headers.Authorization = `Ghost ${adminToken(cfg.id, cfg.secret)}`;
  }
  const res = await fetch(endpoint, {
    headers,
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
      const filter = ghostConfig()?.mode === "admin" ? "&filter=status:published" : "";
      const data = await ghostFetch(`/posts/?limit=100&page=${page}&formats=html${filter}`);
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
  const origin = process.env.GHOST_URL?.replace(/\/$/, "") ?? "";
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/href=(["'])#\/portal\/?\1/gi, origin ? `href=$1${origin}/#/portal/$1` : "$&");
}
