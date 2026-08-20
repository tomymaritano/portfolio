import { createHash, timingSafeEqual } from "node:crypto";

function sha(value: string) {
  return createHash("sha256").update(value).digest();
}

export function bearerToken(request: Request) {
  const header = request.headers.get("authorization") ?? "";
  return header.startsWith("Bearer ") ? header.slice(7) : "";
}

export function authorizeContent(request: Request) {
  const expected = process.env.CONTENT_API_TOKEN;
  if (!expected) return "unconfigured" as const;
  const got = bearerToken(request);
  if (!timingSafeEqual(sha(got), sha(expected))) return "denied" as const;
  return "ok" as const;
}

const hits = new Map<string, number[]>();

export function rateLimited(key: string, max = 10, windowMs = 60 * 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((stamp) => now - stamp < windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

export function clientKey(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}
