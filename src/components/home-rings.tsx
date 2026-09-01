"use client";

import MagicRings from "@/components/magic-rings";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export function HomeRings() {
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;

  return (
    <div
      className="pointer-events-none absolute -top-28 left-1/2 z-0 hidden h-96 w-[40rem] -translate-x-1/2 opacity-60 md:block"
      aria-hidden
    >
      <MagicRings
        color="#6eedc6"
        colorTwo="#245c4c"
        opacity={0.65}
        ringCount={5}
        lineThickness={1.35}
        noiseAmount={0.03}
        followMouse
        mouseInfluence={0.16}
        hoverScale={1.08}
        clickBurst={false}
      />
    </div>
  );
}
