"use client";

import { useRef, type ComponentProps, type PointerEvent, type ReactNode } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

type Props = {
  href?: string;
  children?: ReactNode;
  className?: string;
} & Omit<ComponentProps<"a">, "href" | "children" | "className">;

export function TextLink({ href, children, className = "", onPointerEnter, onPointerLeave, ...rest }: Props) {
  const root = useRef<HTMLAnchorElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  const { contextSafe } = useGSAP(
    () => {
      const el = root.current;
      const line = bar.current;
      if (!el || !line) return;
      gsap.set(el, { color: "var(--mark)" });
      gsap.set(line, {
        scaleX: 0.46,
        transformOrigin: "0% 50%",
        backgroundColor: "var(--mark)",
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  const hover = contextSafe?.((on: boolean) => {
    const el = root.current;
    const line = bar.current;
    if (!el || !line) return;
    if (reduced) {
      gsap.set(el, { color: on ? "var(--accent)" : "var(--mark)" });
      gsap.set(line, { scaleX: 1, backgroundColor: on ? "var(--accent)" : "var(--mark)" });
      return;
    }
    gsap.to(el, {
      color: on ? "var(--accent)" : "var(--mark)",
      duration: 0.28,
      ease: "power2.out",
      overwrite: "auto",
    });
    gsap.to(line, {
      scaleX: on ? 1 : 0.46,
      backgroundColor: on ? "var(--accent)" : "var(--mark)",
      duration: 0.38,
      ease: "power3.out",
      overwrite: "auto",
    });
  });

  if (!href) return children;

  const classNames = `text-link ${className}`.trim();
  const body = (
    <>
      {children}
      <span ref={bar} className="text-link-bar" aria-hidden />
    </>
  );

  const pointer = {
    onPointerEnter: (event: PointerEvent<HTMLAnchorElement>) => {
      hover?.(true);
      onPointerEnter?.(event);
    },
    onPointerLeave: (event: PointerEvent<HTMLAnchorElement>) => {
      hover?.(false);
      onPointerLeave?.(event);
    },
  };

  if (href.startsWith("/")) {
    return (
      <Link
        ref={root}
        href={href}
        transitionTypes={["nav-forward"]}
        className={classNames}
        {...pointer}
      >
        {body}
      </Link>
    );
  }

  return (
    <a
      ref={root}
      href={href}
      className={classNames}
      {...rest}
      {...pointer}
    >
      {body}
    </a>
  );
}
