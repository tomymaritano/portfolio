import { ogCard, ogSize, ogType } from "@/lib/og";
import { workBySlug } from "@/lib/site";

export const size = ogSize;
export const contentType = ogType;

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = (await params) ?? { slug: "" };
  const item = slug ? workBySlug(slug) : null;
  return [
    {
      id: "og",
      alt: item ? `${item.title} — ${item.line}` : "Work",
      size: ogSize,
      contentType: ogType,
    },
  ];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = workBySlug(slug);
  return ogCard({
    kicker: "Work",
    title: item?.title ?? "Work",
    line: item?.line ?? "",
  });
}
