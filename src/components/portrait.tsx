"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/lib/site";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const R = 79.5;
const CIRC = 2 * Math.PI * R;

export function Portrait() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { contextSafe } = useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const img = el.querySelector("[data-portrait-img]");
      const ring = el.querySelector("[data-portrait-ring]");
      if (reduced) {
        gsap.set(img, { clearProps: "transform" });
        gsap.set(ring, { strokeDashoffset: 0 });
        return;
      }
      gsap.fromTo(img, { scale: 1.07 }, { scale: 1, duration: 1.35, ease: "power2.out" });
      gsap.fromTo(
        ring,
        { strokeDashoffset: CIRC },
        { strokeDashoffset: 0, duration: 1.15, delay: 0.12, ease: "power2.out" },
      );
    },
    { scope: root, dependencies: [reduced] },
  );

  const hover = contextSafe?.((on: boolean) => {
    if (reduced) return;
    const ring = root.current?.querySelector("[data-portrait-ring]");
    const img = root.current?.querySelector("[data-portrait-img]");
    if (!ring || !img) return;
    gsap.to(ring, {
      stroke: on ? "var(--accent)" : "color-mix(in srgb, var(--muted) 55%, transparent)",
      duration: 0.28,
      ease: "power2.out",
      overwrite: "auto",
    });
    gsap.to(img, {
      scale: on ? 1.03 : 1,
      duration: 0.45,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  return (
    <div
      ref={root}
      className="portrait relative mb-4 ml-6 hidden size-40 md:float-right md:block"
      onPointerEnter={() => hover?.(true)}
      onPointerLeave={() => hover?.(false)}
    >
      <div className="size-full overflow-hidden rounded-full">
        <Image
          src={site.photo}
          alt={site.name}
          width={208}
          height={208}
          priority
          data-portrait-img=""
          className="size-full origin-center object-cover object-[center_20%]"
        />
      </div>
      <svg
        className="pointer-events-none absolute inset-0 size-full -rotate-90"
        viewBox="0 0 160 160"
        aria-hidden
      >
        <circle
          data-portrait-ring=""
          cx="80"
          cy="80"
          r={R}
          fill="none"
          stroke="color-mix(in srgb, var(--muted) 55%, transparent)"
          strokeWidth="1"
          strokeDasharray={CIRC}
          strokeDashoffset={reduced ? 0 : CIRC}
        />
      </svg>
    </div>
  );
}
