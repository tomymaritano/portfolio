export function readingMinutes(source: string) {
  const body = source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "").trim();
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
