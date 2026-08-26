"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide";
import { ViewTransition } from "react";
import { ToggleMorphIcon } from "@/components/hover-morph-icon";
import { TilePlaceholder } from "@/components/tile-placeholder";
import { homeMeta, type WorkItem } from "@/lib/site";

export function ProductTile({ item }: { item: WorkItem }) {
  const meta = homeMeta[item.slug as keyof typeof homeMeta];
  const [over, setOver] = useState(false);

  return (
    <Link
      href={`/work/${item.slug}`}
      transitionTypes={["nav-forward"]}
      onPointerEnter={() => setOver(true)}
      onPointerLeave={() => setOver(false)}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-card transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none"
    >
      <ViewTransition name={`work-${item.slug}`} share="morph" default="none">
        <div className="relative aspect-16/10 overflow-hidden bg-[#111]">
          <div className="h-full transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none">
            <TilePlaceholder item={item} />
          </div>
        </div>
      </ViewTransition>
      <div className="flex flex-1 flex-col px-5 py-4">
        <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
          {meta?.tag}
          {meta && "role" in meta && meta.role ? ` · ${meta.role}` : ""}
        </p>
        <p className="mt-2 text-[1.15rem] leading-tight font-semibold tracking-tight">{item.title}</p>
        <p className="mt-1.5 text-[14px] leading-6 text-foreground/70">{item.line}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-[13px] text-muted transition-colors duration-200 group-hover:text-accent">
          Explore
          <ToggleMorphIcon rest={ArrowRight} hover={ArrowUpRight} on={over} />
        </span>
      </div>
    </Link>
  );
}
