"use client";

import { useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const POINTS = [42, 48, 45, 51, 49, 58, 55, 62, 60, 67];

export function DolarGauchoLoop({ paused = false }: { paused?: boolean }) {
  const [n, setN] = useState(POINTS.length);
  const reduce = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduce || paused) return;
      const beat = gsap.delayedCall(0.7, () => {
        setN((count) => (count >= POINTS.length ? 3 : count + 1));
      });
      return () => beat.kill();
    },
    { dependencies: [n, paused, reduce] },
  );

  const slice = POINTS.slice(0, n);
  const last = slice[slice.length - 1] ?? POINTS[0];
  const w = 280;
  const h = 88;
  const max = Math.max(...POINTS);
  const min = Math.min(...POINTS);
  const d = slice
    .map((value, i) => {
      const x = (i / (POINTS.length - 1)) * w;
      const y = h - ((value - min) / (max - min)) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div className="flex h-full flex-col justify-between bg-[#0c0c0c] p-4" aria-hidden>
      <div className="flex items-baseline justify-between">
        <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">USD / ARS</p>
        <p className="font-mono text-2xl tracking-tight">{last}</p>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="mt-3 h-20 w-full text-accent">
        <path d={d} fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <p className="font-mono text-[11px] text-muted">{reduce ? "still" : "AI reading the strip"}</p>
    </div>
  );
}
