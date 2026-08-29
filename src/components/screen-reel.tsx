"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const INTERVAL_S = 3.2;

export function ScreenReel({
  frames,
  label,
}: {
  frames: string[];
  label: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const slides = root.current?.querySelectorAll<HTMLElement>("[data-slide]");
      if (!slides?.length) return;
      if (reduced) {
        gsap.set(slides, { opacity: (i) => (i === index ? 1 : 0) });
        return;
      }
      gsap.to(slides, {
        opacity: (i) => (i === index ? 1 : 0),
        duration: 0.7,
        ease: "power2.out",
        overwrite: "auto",
      });
    },
    { scope: root, dependencies: [index, reduced] },
  );

  useGSAP(
    () => {
      if (reduced || paused || frames.length < 2) return;
      const beat = gsap.delayedCall(INTERVAL_S, () => {
        setIndex((current) => (current + 1) % frames.length);
      });
      return () => beat.kill();
    },
    { dependencies: [index, paused, reduced, frames.length] },
  );

  if (frames.length === 0) return null;

  const go = (next: number) => {
    setIndex((next + frames.length) % frames.length);
  };

  return (
    <div
      ref={root}
      className="relative overflow-hidden rounded-2xl border border-white/14 bg-[#141414] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      role="region"
      aria-label={label}
      aria-keyshortcuts={frames.length > 1 ? "ArrowLeft ArrowRight" : undefined}
      tabIndex={frames.length > 1 ? 0 : undefined}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(event) => {
        if (frames.length < 2) return;
        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(index + 1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(index - 1);
        }
      }}
    >
      {frames.length > 1 ? (
        <p className="sr-only">On a keyboard, left and right change screens.</p>
      ) : null}
      <p className="sr-only" aria-live="polite">
        {frames.length > 1 ? `Screen ${index + 1} of ${frames.length}` : label}
      </p>
      <div className="relative aspect-16/10">
        {frames.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${i}-${src}`}
            data-slide=""
            src={src}
            alt=""
            aria-hidden
            className={`absolute inset-0 h-full w-full object-cover ${i === index ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>
      {frames.length > 1 ? (
        <span className="kbd-hint pointer-events-none absolute top-3 right-3 gap-1">
          <kbd className="rounded border border-white/15 bg-background/80 px-1.5 py-px font-mono text-[10px] text-muted">
            ←
          </kbd>
          <kbd className="rounded border border-white/15 bg-background/80 px-1.5 py-px font-mono text-[10px] text-muted">
            →
          </kbd>
        </span>
      ) : null}
      {frames.length > 1 ? (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2" role="tablist" aria-label={label}>
          {frames.map((src, i) => (
            <button
              key={`${i}-${src}`}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Screen ${i + 1}`}
              className={`h-2.5 rounded-full transition-[width,background-color] duration-300 ${
                i === index ? "w-6 bg-foreground" : "w-2.5 bg-foreground/45 hover:bg-foreground/75"
              }`}
              onClick={() => go(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
