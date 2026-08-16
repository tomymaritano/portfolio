import Link from "next/link";
import { ViewTransition } from "react";
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
      transitionTypes={["nav-forward"]}
      className="group flex min-h-[280px] flex-col overflow-hidden rounded-2xl border border-line bg-card transition duration-300 hover:border-foreground/20 sm:min-h-[320px]"
    >
      <ViewTransition name={`work-${item.slug}`} share="morph" default="none">
        <div className="relative min-h-0 flex-1 overflow-hidden transition duration-500 group-hover:scale-[1.02]">
          {children}
        </div>
      </ViewTransition>
      <div className="flex items-center justify-between px-4 py-3 text-[13px]">
        <span>{item.title}</span>
        <span className="text-muted transition duration-300 group-hover:translate-x-0.5 group-hover:text-foreground">
          Explore →
        </span>
      </div>
    </Link>
  );
}
