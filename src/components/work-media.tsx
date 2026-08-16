import type { WorkItem } from "@/lib/site";
import { MuteMedia } from "@/components/mute-media";
import { ScreenReel } from "@/components/screen-reel";

export function WorkMedia({ item }: { item: WorkItem }) {
  const frames = [...new Set([item.cover, ...(item.stills ?? [])].filter((src): src is string => Boolean(src)))];

  return (
    <section className="mt-14" aria-label={`${item.title} product`}>
      {item.loop ? (
        <div className="overflow-hidden rounded-2xl border border-line bg-card">
          <div className="aspect-16/10">
            <MuteMedia src={item.loop} cover={item.cover} label={item.title} />
          </div>
        </div>
      ) : (
        <ScreenReel frames={frames} label={`${item.title} screens`} />
      )}
    </section>
  );
}
