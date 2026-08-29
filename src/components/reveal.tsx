"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

type MotionTag = "div" | "ul" | "ol" | "section" | "header" | "article" | "h2" | "h3" | "p";

const ease = "power2.out";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: MotionTag;
  delay?: number;
  y?: number;
  scroll?: boolean;
  "aria-label"?: string;
};

export function Reveal({
  children,
  className,
  as: Tag = "div",
  delay = 0,
  y = 12,
  scroll = false,
  "aria-label": ariaLabel,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (reduced) {
        gsap.set(el, { clearProps: "opacity,transform" });
        return;
      }
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          delay,
          ease,
          ...(scroll
            ? { scrollTrigger: { trigger: el, start: "top 90%", once: true } }
            : {}),
        },
      );
    },
    { scope: ref, dependencies: [reduced, delay, y, scroll] },
  );

  return (
    <Tag ref={ref as never} className={className} data-reveal="" aria-label={ariaLabel}>
      {children}
    </Tag>
  );
}

type StaggerInProps = {
  children: ReactNode;
  className?: string;
  as?: MotionTag;
  delay?: number;
  stagger?: number;
  y?: number;
};

export function StaggerIn({
  children,
  className,
  as: Tag = "div",
  delay = 0,
  stagger = 0.055,
  y = 10,
}: StaggerInProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const items = root.querySelectorAll<HTMLElement>(":scope > *");
      if (!items.length) return;
      if (reduced) {
        gsap.set(items, { clearProps: "opacity,transform" });
        return;
      }
      gsap.fromTo(
        items,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          delay,
          stagger,
          ease,
          scrollTrigger: {
            trigger: root,
            start: "top 90%",
            once: true,
          },
        },
      );
    },
    { scope: ref, dependencies: [reduced, delay, stagger, y] },
  );

  return (
    <Tag ref={ref as never} className={className} data-stagger="">
      {children}
    </Tag>
  );
}
