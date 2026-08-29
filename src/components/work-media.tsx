import type { WorkItem } from "@/lib/site";
import { MuteMedia } from "@/components/mute-media";
import { Reveal } from "@/components/reveal";
import { ScreenReel } from "@/components/screen-reel";
import { TilePlaceholder } from "@/components/tile-placeholder";

export function WorkMedia({ item }: { item: WorkItem }) {
  const frames = [...new Set([item.cover, ...(item.stills ?? [])].filter((src): src is string => Boolean(src)))];

  return (
    <Reveal as="section" scroll className="mt-14" y={16} aria-label={`${item.title} product`}>
      {item.loop ? (
        <div className="overflow-hidden rounded-2xl border border-white/14 bg-[#141414]">
          <div className="aspect-16/10">
            <MuteMedia src={item.loop} cover={item.cover} label={item.title} />
          </div>
        </div>
      ) : frames.length > 0 ? (
        <ScreenReel frames={frames} label={`${item.title} screens`} />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-line">
          <div className="aspect-16/10">
            <TilePlaceholder item={item} />
          </div>
        </div>
      )}
    </Reveal>
  );
}
