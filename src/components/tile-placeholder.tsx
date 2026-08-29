import type { WorkItem } from "@/lib/site";

export function TilePlaceholder({ item }: { item: WorkItem }) {
  if (item.cover) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={item.cover} alt="" className="tile-ph h-full w-full object-cover" />
    );
  }

  return (
    <div className="tile-ph relative flex h-full w-full flex-col justify-end bg-[#111] p-5">
      <span className="absolute top-5 left-5 h-7 w-px bg-accent/45" aria-hidden />
      <span className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">{item.title}</span>
      <span className="mt-2 text-[13px] leading-5 text-foreground/70">{item.line}</span>
    </div>
  );
}
