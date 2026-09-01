"use client";

import MagicRings from "@/components/magic-rings";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export function HomeRings() {
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 z-0 h-dvh w-full"
      style={{ top: "calc(-4rem - env(safe-area-inset-top, 0px))" }}
      aria-hidden
    >
      <MagicRings
        color="#7ec8ff"
        colorTwo="#1a3d5c"
        opacity={0.95}
        ringCount={7}
        lineThickness={1.85}
        baseRadius={0.2}
        radiusStep={0.12}
        scaleRate={0.34}
        noiseAmount={0.02}
        followMouse
        mouseInfluence={0.14}
        hoverScale={1.06}
        clickBurst={false}
      />
    </div>
  );
}
