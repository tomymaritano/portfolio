import { ogCard, ogSize, ogType } from "@/lib/og";
import { getWriting } from "@/lib/writing-feed";

export const size = ogSize;
export const contentType = ogType;

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = (await params) ?? { slug: "" };
  const item = slug ? await getWriting(slug) : null;
  return [
    {
      id: "og",
      alt: item ? `${item.title} — ${item.line}` : "Writing",
      size: ogSize,
      contentType: ogType,
    },
  ];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getWriting(slug);
  return ogCard({
    kicker: "Writing",
    title: item?.title ?? "Writing",
    line: item?.line ?? "",
  });
}
