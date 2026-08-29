export function sectionUrl(href: string, slug: string) {
  const url = new URL(href);
  url.hash = slug;
  return url.toString();
}

export function codeSource(source: string) {
  return source.replace(/\n$/, "");
}

export function fenceLanguage(className?: string) {
  const match = className?.match(/language-([a-z0-9+#-]+)/i);
  const lang = match?.[1]?.toLowerCase();
  if (!lang || lang === "mermaid") return "";
  return lang;
}
