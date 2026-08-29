import { ogCard, ogSize, ogType } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.line}`;
export const size = ogSize;
export const contentType = ogType;

export default function Image() {
  return ogCard({ kicker: site.xHandle, title: site.headline, line: site.line });
}
