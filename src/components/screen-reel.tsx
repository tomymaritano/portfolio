"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const INTERVAL_MS = 3200;

export function ScreenReel({
  frames,
  label,
}: {
  frames: string[];
  label: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce || paused || frames.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % frames.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [frames.length, paused, reduce]);

  if (frames.length === 0) return null;

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/14 bg-[#141414]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-16/10">
        {frames.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${i}-${src}`}
            src={src}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      {frames.length > 1 ? (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2" role="tablist" aria-label={label}>
          {frames.map((src, i) => (
            <button
              key={`${i}-${src}`}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Screen ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-6 bg-foreground" : "w-2.5 bg-foreground/45 hover:bg-foreground/75"
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
