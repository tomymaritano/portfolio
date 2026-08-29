"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide";
import { ViewTransition } from "react";
import { ToggleMorphIcon } from "@/components/hover-morph-icon";
import { DolarGauchoLoop } from "@/components/loops/dolargaucho-loop";
import { DripnexLoop } from "@/components/loops/dripnex-loop";
import { PsynthLoop } from "@/components/loops/psynth-loop";
import { QuantisLoop } from "@/components/loops/quantis-loop";
import { TilePlaceholder } from "@/components/tile-placeholder";
import { gsap, useGSAP } from "@/lib/gsap";
import { homeMeta, type WorkItem } from "@/lib/site";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const loops = {
  dripnex: DripnexLoop,
  psynth: PsynthLoop,
  dolargaucho: DolarGauchoLoop,
  "quantis-intel": QuantisLoop,
} as const;

function TileMedia({ item, paused, reduced }: { item: WorkItem; paused: boolean; reduced: boolean }) {
  const Loop = item.slug in loops ? loops[item.slug as keyof typeof loops] : null;
  if (Loop && !reduced) return <Loop paused={paused} />;
  return <TilePlaceholder item={item} />;
}

export function ProductTile({ item }: { item: WorkItem }) {
  const meta = homeMeta[item.slug as keyof typeof homeMeta];
  const [over, setOver] = useState(false);
  const root = useRef<HTMLAnchorElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const animate = useRef<(on: boolean) => void>(() => {});

  useGSAP(
    (_ctx, contextSafe) => {
      if (!contextSafe) return;
      animate.current = contextSafe((on: boolean) => {
        const el = root.current;
        if (!el || reduced) return;
        gsap.to(el, {
          y: on ? -4 : 0,
          boxShadow: on ? "0 16px 40px rgba(0,0,0,0.35)" : "0 0 0 rgba(0,0,0,0)",
          duration: on ? 0.32 : 0.42,
          ease: "power2.out",
          overwrite: "auto",
        });
        if (media.current) {
          gsap.to(media.current, {
            scale: on ? 1.04 : 1,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  const lift = (on: boolean) => {
    setOver(on);
    animate.current(on);
  };

  return (
    <Link
      ref={root}
      href={`/work/${item.slug}`}
      transitionTypes={["nav-forward"]}
      onPointerEnter={(event) => {
        if (event.pointerType === "touch") return;
        lift(true);
      }}
      onPointerLeave={() => lift(false)}
      onPointerCancel={() => lift(false)}
      onFocus={() => lift(true)}
      onBlur={() => lift(false)}
      className="group flex h-full cursor-pointer flex-col rounded-2xl border border-line bg-card transition-[border-color] duration-300 hover:border-accent/40 motion-reduce:transition-none"
    >
      <ViewTransition name={`work-${item.slug}`} share="morph" default="none">
        <div className="relative aspect-16/10 overflow-hidden rounded-t-2xl bg-[#111]">
          <div ref={media} className="h-full origin-center">
            <TileMedia item={item} paused={over} reduced={reduced} />
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
        <span className="mt-4 inline-flex items-center text-muted transition-colors duration-200 group-hover:text-accent">
          <ToggleMorphIcon rest={ArrowRight} hover={ArrowUpRight} on={over} />
          <span className="sr-only">Open case</span>
        </span>
      </div>
    </Link>
  );
}
