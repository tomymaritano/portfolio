import Link from "next/link";
import type { WorkItem } from "@/lib/site";

export function ProductTile({
  item,
  children,
}: {
  item: WorkItem;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={`/work/${item.slug}`}
      className="group flex min-h-[280px] flex-col overflow-hidden rounded-2xl border border-line bg-card sm:min-h-[320px]"
    >
      <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
      <div className="flex items-center justify-between px-4 py-3 text-[13px]">
        <span>{item.title}</span>
        <span className="text-muted transition group-hover:text-foreground">Explore →</span>
      </div>
    </Link>
  );
}
