import type { WorkItem } from "@/lib/site";
import { MuteMedia } from "@/components/mute-media";

export function WorkMedia({ item }: { item: WorkItem }) {
  return (
    <section className="reveal-view mt-14" aria-label={`${item.title} product`}>
      <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">Product</p>
      <div className="mt-3 overflow-hidden rounded-2xl border border-line bg-card">
        <div className="aspect-16/10">
          <MuteMedia src={item.loop} cover={item.cover} label={item.title} />
        </div>
      </div>
      {item.stills.length > 0 ? (
        <ul className="mt-3 grid grid-cols-3 gap-2">
          {item.stills.map((src) => (
            <li key={src} className="overflow-hidden rounded-xl border border-line bg-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="aspect-4/3 w-full object-cover" />
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
