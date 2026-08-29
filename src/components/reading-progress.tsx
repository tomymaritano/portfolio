"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export function ReadingProgress() {
  const bar = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = bar.current;
      if (!el) return;
      if (reduced) {
        gsap.set(el, { scaleX: 0 });
        return;
      }
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "#main",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.25,
          },
        },
      );
    },
    { dependencies: [reduced] },
  );

  return <span ref={bar} className="reading-progress" aria-hidden />;
}
