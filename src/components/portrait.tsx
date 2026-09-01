"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/lib/site";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const SIZE = 160;
const R = 78;
const CIRC = 2 * Math.PI * R;
const ARC = CIRC * 0.22;

export function Portrait() {
  const root = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const spot = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const ring = useRef<SVGCircleElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    (_ctx, contextSafe) => {
      const stage = root.current;
      const frame = card.current;
      const shot = photo.current;
      const light = spot.current;
      const mark = svg.current;
      const arc = ring.current;
      if (!stage || !frame || !shot || !light || !mark || !arc) return;

      gsap.set(mark, { rotation: -90, transformOrigin: "50% 50%" });
      gsap.set(arc, {
        strokeDasharray: `${ARC} ${CIRC - ARC}`,
        strokeDashoffset: 0,
        stroke: "rgba(161,161,161,0.45)",
        opacity: 1,
      });
      gsap.set(frame, { transformPerspective: 720, transformOrigin: "50% 50%" });
      gsap.set(shot, { scale: 1.18, x: 0, y: 0 });
      gsap.set(light, { x: 0, y: 0, opacity: 0, scale: 0.4 });

      if (reduced) {
        gsap.set(shot, { scale: 1.08 });
        gsap.set(arc, { strokeDasharray: CIRC, strokeDashoffset: 0 });
        return;
      }

      const rotY = gsap.quickTo(frame, "rotationY", { duration: 0.55, ease: "power3.out" });
      const rotX = gsap.quickTo(frame, "rotationX", { duration: 0.55, ease: "power3.out" });
      const imgX = gsap.quickTo(shot, "x", { duration: 0.85, ease: "power3.out" });
      const imgY = gsap.quickTo(shot, "y", { duration: 0.85, ease: "power3.out" });
      const lightX = gsap.quickTo(light, "x", { duration: 0.4, ease: "power3.out" });
      const lightY = gsap.quickTo(light, "y", { duration: 0.4, ease: "power3.out" });

      const enter = gsap.timeline({ defaults: { ease: "power3.out" } });
      enter.from(frame, { scale: 0.72, rotationY: 28, z: -80, duration: 1.05 }, 0);
      enter.fromTo(shot, { scale: 1.45, y: 16 }, { scale: 1.18, y: 0, duration: 1.2 }, 0.05);
      enter.fromTo(
        arc,
        { strokeDasharray: `0 ${CIRC}`, strokeDashoffset: CIRC * 0.25 },
        { strokeDasharray: `${ARC} ${CIRC - ARC}`, strokeDashoffset: 0, duration: 0.9 },
        0.2,
      );
      enter.fromTo(mark, { rotation: -140 }, { rotation: -90, duration: 1.1, ease: "power2.inOut" }, 0.15);

      const spin = gsap.to(mark, {
        rotation: "+=360",
        duration: 18,
        ease: "none",
        repeat: -1,
        paused: true,
      });
      enter.add(() => spin.play(), 0.9);

      const track = contextSafe?.((event: PointerEvent) => {
        const box = stage.getBoundingClientRect();
        const nx = (event.clientX - box.left) / box.width - 0.5;
        const ny = (event.clientY - box.top) / box.height - 0.5;
        rotY(nx * 16);
        rotX(ny * -12);
        imgX(nx * -14);
        imgY(ny * -10);
        lightX(nx * 36);
        lightY(ny * 36);
        gsap.to(arc, {
          strokeDashoffset: -((Math.atan2(ny, nx) * CIRC) / (Math.PI * 2)),
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
        });
      });

      const engage = contextSafe?.(() => {
        spin.pause();
        gsap.to(arc, { stroke: "var(--accent)", strokeDasharray: `${ARC * 1.35} ${CIRC}`, duration: 0.35, ease: "power2.out" });
        gsap.to(light, { opacity: 0.9, scale: 1, duration: 0.4, ease: "power2.out" });
        gsap.to(shot, { scale: 1.22, duration: 0.5, ease: "power2.out" });
      });

      const rest = contextSafe?.(() => {
        rotY(0);
        rotX(0);
        imgX(0);
        imgY(0);
        lightX(0);
        lightY(0);
        gsap.to(arc, {
          stroke: "rgba(161,161,161,0.45)",
          strokeDasharray: `${ARC} ${CIRC - ARC}`,
          strokeDashoffset: 0,
          duration: 0.55,
          ease: "power3.out",
        });
        gsap.to(light, { opacity: 0, scale: 0.4, duration: 0.4, ease: "power2.out" });
        gsap.to(shot, { scale: 1.18, duration: 0.55, ease: "power3.out" });
        gsap.to(mark, { rotation: -90, duration: 0.6, ease: "power2.out", onComplete: () => spin.play() });
      });

      if (!track || !engage || !rest) return;

      stage.addEventListener("pointerenter", engage);
      stage.addEventListener("pointermove", track);
      stage.addEventListener("pointerleave", rest);
      return () => {
        stage.removeEventListener("pointerenter", engage);
        stage.removeEventListener("pointermove", track);
        stage.removeEventListener("pointerleave", rest);
        spin.kill();
      };
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <div
      ref={root}
      className="relative mb-4 ml-6 hidden size-40 md:float-right md:block"
      style={{ perspective: 720 }}
    >
      <div ref={card} className="size-full overflow-hidden rounded-full will-change-transform">
        <div ref={photo} className="size-full will-change-transform">
          <Image
            src={site.photo}
            alt={site.name}
            width={208}
            height={208}
            priority
            className="size-full object-cover object-[center_20%]"
          />
        </div>
        <div
          ref={spot}
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(110,237,198,0.28) 0%, rgba(110,237,198,0) 70%)",
            mixBlendMode: "screen",
          }}
        />
      </div>
      <svg
        ref={svg}
        className="pointer-events-none absolute -inset-px size-[calc(100%+2px)]"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden
      >
        <circle ref={ring} cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" strokeWidth="1.25" />
      </svg>
    </div>
  );
}
