"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/lib/site";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const R = 79.5;
const CIRC = 2 * Math.PI * R;
const MUTED = "rgba(161,161,161,0.55)";
const ACCENT = "var(--accent)";

export function Portrait() {
  const root = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const ring = useRef<SVGCircleElement>(null);
  const idle = useRef<gsap.core.Tween | null>(null);
  const reduced = usePrefersReducedMotion();

  const { contextSafe } = useGSAP(
    () => {
      const photo = frame.current;
      const circle = ring.current;
      const mark = svg.current;
      if (!photo || !circle || !mark) return;

      gsap.set(mark, { rotation: -90, transformOrigin: "50% 50%" });
      gsap.set(circle, { strokeDasharray: CIRC, stroke: MUTED, opacity: 1 });

      if (reduced) {
        gsap.set(photo, { scale: 1 });
        gsap.set(circle, { strokeDashoffset: 0 });
        return;
      }

      gsap.set(photo, { scale: 1.08 });
      gsap.set(circle, { strokeDashoffset: CIRC });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(photo, { scale: 1, duration: 1.35 }, 0);
      tl.to(circle, { strokeDashoffset: 0, duration: 1.2 }, 0.12);
      tl.add(() => {
        idle.current = gsap.to(circle, {
          opacity: 0.4,
          duration: 3.6,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  const hover = contextSafe?.((on: boolean) => {
    if (reduced) return;
    const photo = frame.current;
    const circle = ring.current;
    if (!photo || !circle) return;
    idle.current?.paused(on);
    if (on) gsap.set(circle, { opacity: 1 });
    gsap.to(circle, {
      stroke: on ? ACCENT : MUTED,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
    gsap.to(photo, {
      scale: on ? 1.04 : 1,
      duration: 0.45,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  return (
    <div
      ref={root}
      className="relative mb-4 ml-6 hidden size-40 md:float-right md:block"
      onPointerEnter={() => hover?.(true)}
      onPointerLeave={() => hover?.(false)}
    >
      <div ref={frame} className="size-full overflow-hidden rounded-full">
        <Image
          src={site.photo}
          alt={site.name}
          width={208}
          height={208}
          priority
          className="size-full origin-center object-cover object-[center_20%]"
        />
      </div>
      <svg
        ref={svg}
        className="pointer-events-none absolute inset-0 size-full"
        viewBox="0 0 160 160"
        aria-hidden
      >
        <circle ref={ring} cx="80" cy="80" r={R} fill="none" strokeWidth="1" />
      </svg>
    </div>
  );
}
