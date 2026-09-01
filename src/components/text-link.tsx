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
      if (!bar.current) return;
      gsap.set(bar.current, { scaleX: 0.5, transformOrigin: "0% 50%" });
    },
    { scope: root, dependencies: [reduced] },
  );

  const hover = contextSafe?.((on: boolean) => {
    const el = root.current;
    const line = bar.current;
    if (!el || !line) return;
    el.classList.toggle("is-on", on);
    if (reduced) {
      gsap.set(line, { scaleX: on ? 1 : 0.5 });
      return;
    }
    gsap.to(line, {
      scaleX: on ? 1 : 0.5,
      duration: 0.34,
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
      <Link ref={root} href={href} transitionTypes={["nav-forward"]} className={classNames} {...pointer}>
        {body}
      </Link>
    );
  }

  return (
    <a ref={root} href={href} className={classNames} {...rest} {...pointer}>
      {body}
    </a>
  );
}
