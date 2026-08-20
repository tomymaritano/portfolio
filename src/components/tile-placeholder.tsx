import type { WorkItem } from "@/lib/site";

export function TilePlaceholder({ item }: { item: WorkItem }) {
  if (item.cover) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={item.cover} alt="" className="tile-ph h-full w-full object-cover" />
    );
  }

  return (
    <div className="tile-ph flex h-full w-full items-end bg-[#111] p-5">
      <span className="text-[13px] text-muted">{item.title}</span>
    </div>
  );
}
