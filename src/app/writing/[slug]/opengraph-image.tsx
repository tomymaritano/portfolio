import { ogCard, ogSize, ogType } from "@/lib/og";
import { writingBySlug } from "@/lib/site";

export const size = ogSize;
export const contentType = ogType;

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = writingBySlug(slug);
  return [
    {
      id: slug,
      alt: item ? `${item.title} — ${item.line}` : "Writing",
      size: ogSize,
      contentType: ogType,
    },
  ];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = writingBySlug(slug);
  return ogCard({
    kicker: "Writing",
    title: item?.title ?? "Writing",
    line: item?.line ?? "",
  });
}
