"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HoverMorphIcon, ToggleMorphIcon } from "@/components/hover-morph-icon";
import { navMarks } from "@/components/nav-icons";
import { gsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { site } from "@/lib/site";

const EXIT_MS = 280;

type SheetPhase = "closed" | "opening" | "open" | "closing";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<SheetPhase>("closed");
  const pathname = usePathname();
  const router = useRouter();
  const panelId = useId();
  const reduce = usePrefersReducedMotion();
  const trigger = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (open) {
      setPhase("opening");
      return;
    }
    setPhase((current) => (current === "closed" ? current : "closing"));
  }, [open]);

  useEffect(() => {
    if (phase !== "opening") return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase("open"));
    });
    return () => cancelAnimationFrame(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== "closing") return;
    const ms = reduce ? 0 : EXIT_MS;
    const id = window.setTimeout(() => setPhase("closed"), ms);
    return () => window.clearTimeout(id);
  }, [phase, reduce]);

  useEffect(() => {
    if (phase === "closed") {
      delete document.body.dataset.menu;
      if (wasOpen.current) trigger.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    document.body.dataset.menu = phase;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [phase]);

  useEffect(() => {
    return () => {
      delete document.body.dataset.menu;
      document.body.style.overflow = "";
    };
  }, []);

  const sheet =
    phase !== "closed" ? (
      <MenuSheet
        panelId={panelId}
        phase={phase}
        pathname={pathname}
        reduce={reduce}
        onClose={() => setOpen(false)}
        onGo={(href) => router.push(href, { transitionTypes: ["nav-forward"] })}
      />
    ) : null;

  return (
    <div className="md:hidden">
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-11 items-center justify-center text-muted transition-colors duration-200 hover:text-foreground"
      >
        <ToggleMorphIcon rest={navMarks.menu.rest} hover={navMarks.menu.hover} on={open} />
      </button>
      {sheet}
    </div>
  );
}

function MenuSheet({
  panelId,
  phase,
  pathname,
  reduce,
  onClose,
  onGo,
}: {
  panelId: string;
  phase: Exclude<SheetPhase, "closed">;
  pathname: string;
  reduce: boolean;
  onClose: () => void;
  onGo: (href: string) => void;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const items = el.querySelectorAll<HTMLElement>("[data-menu-item]");
      if (reduce) {
        gsap.set(el, { clearProps: "opacity" });
        gsap.set(items, { clearProps: "opacity,transform" });
        return;
      }
      if (phase === "opening") {
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.22, ease: "power2.out" });
        gsap.fromTo(
          items,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.42, stagger: 0.07, ease: "power2.out" },
        );
        return;
      }
      if (phase === "closing") {
        gsap.to(items, { opacity: 0, y: 8, duration: 0.18, stagger: 0.04, ease: "power2.in" });
        gsap.to(el, { opacity: 0, duration: 0.28, ease: "power2.in" });
      }
    },
    { scope: root, dependencies: [phase, reduce] },
  );

  useLayoutEffect(() => {
    const node = root.current;
    if (!node) return;
    const focusables = [...node.querySelectorAll<HTMLElement>("a, button")];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    node.querySelector<HTMLButtonElement>("[data-menu-close]")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || focusables.length === 0) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    node.addEventListener("keydown", onKey);
    return () => node.removeEventListener("keydown", onKey);
  }, []);

  return createPortal(
    <div
      ref={root}
      id={panelId}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      data-state={phase}
      className="menu-sheet fixed inset-0 z-50 flex flex-col bg-background md:hidden"
      style={{ viewTransitionName: "mobile-menu" }}
    >
      <div className="flex min-h-16 shrink-0 items-center justify-between px-5 pt-[env(safe-area-inset-top)]">
        <Link href="/" transitionTypes={["nav-back"]} onClick={onClose} className="inline-flex items-center">
          <Image
            src={site.photo}
            alt={site.name}
            width={32}
            height={32}
            className="size-8 rounded-full object-cover object-[center_20%]"
          />
        </Link>
        <button
          type="button"
          data-menu-close=""
          aria-label="Close menu"
          onClick={onClose}
          className="inline-flex size-11 items-center justify-center text-foreground"
        >
          <ToggleMorphIcon rest={navMarks.menu.rest} hover={navMarks.menu.hover} on={phase === "open"} />
        </button>
      </div>
      <nav className="flex min-h-0 flex-1 flex-col px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <div className="flex flex-col">
          <SheetLink
            href="/work"
            active={pathname.startsWith("/work")}
            same={pathname === "/work"}
            reduce={reduce}
            onPick={onClose}
            onGo={onGo}
          >
            Work
          </SheetLink>
          <SheetLink
            href="/writing"
            active={pathname.startsWith("/writing")}
            same={pathname === "/writing"}
            reduce={reduce}
            onPick={onClose}
            onGo={onGo}
          >
            Writing
          </SheetLink>
        </div>
        <div
          data-menu-item=""
          className="menu-item mt-auto grid grid-cols-3 gap-2 border-t border-white/5 pt-5"
        >
          <SheetSocial href={site.github} label="GitHub" mark="github" />
          <SheetSocial href={site.linkedin} label="LinkedIn" mark="linkedin" />
          <SheetSocial href={site.x} label="X" mark="x" />
        </div>
      </nav>
    </div>,
    document.body,
  );
}

function SheetLink({
  href,
  active,
  same,
  reduce,
  onPick,
  onGo,
  children,
}: {
  href: string;
  active: boolean;
  same: boolean;
  reduce: boolean;
  onPick: () => void;
  onGo: (href: string) => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      data-menu-item=""
      transitionTypes={["nav-forward"]}
      onClick={(event) => {
        event.preventDefault();
        onPick();
        if (same) return;
        if (reduce) {
          onGo(href);
          return;
        }
        window.setTimeout(() => onGo(href), EXIT_MS);
      }}
      className={`menu-item flex min-h-16 items-center text-[2rem] leading-none font-semibold tracking-tight transition-colors duration-200 ${
        active ? "text-foreground" : "text-muted hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}

function SheetSocial({
  href,
  label,
  mark,
}: {
  href: string;
  label: string;
  mark: Exclude<keyof typeof navMarks, "menu">;
}) {
  const icons = navMarks[mark];
  const [over, setOver] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex min-h-16 flex-col items-center justify-center gap-2 text-[12px] text-muted transition-colors duration-200 hover:text-foreground"
      onPointerEnter={() => setOver(true)}
      onPointerLeave={() => setOver(false)}
    >
      <HoverMorphIcon rest={icons.rest} hover={icons.hover} over={over} />
      {label}
    </a>
  );
}
