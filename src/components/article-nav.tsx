"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Neighbor = { href: string; title: string } | null;

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable;
}

export function ArticleNav({
  backHref,
  backLabel,
  newer,
  older,
  extra,
}: {
  backHref: string;
  backLabel: string;
  newer: Neighbor;
  older: Neighbor;
  extra?: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(backHref);
    if (older) router.prefetch(older.href);
    if (newer) router.prefetch(newer.href);
  }, [backHref, older, newer, router]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey || event.repeat) return;
      if (event.isComposing || isTypingTarget(event.target)) return;
      if (document.body.dataset.menu) return;
      if (event.key === "Escape") {
        event.preventDefault();
        router.push(backHref, { transitionTypes: ["nav-back"] });
        return;
      }
      if (event.key === "[" && older) {
        event.preventDefault();
        router.push(older.href, { transitionTypes: ["nav-back"] });
        return;
      }
      if (event.key === "]" && newer) {
        event.preventDefault();
        router.push(newer.href, { transitionTypes: ["nav-forward"] });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [older, newer, backHref, router]);

  return (
    <nav aria-label="Article" className="mt-16 space-y-8">
      <p className="sr-only">
        On a keyboard, Escape returns to {backLabel}
        {newer || older ? ", [ opens the older piece, and ] opens the newer piece" : ""}.
      </p>
      {newer || older ? (
        <div className="grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
          {older ? (
            <Link
              href={older.href}
              transitionTypes={["nav-back"]}
              aria-keyshortcuts="["
              className="group min-w-0 text-[13px] text-muted transition-colors duration-200 hover:text-foreground"
            >
              <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] uppercase">
                Older
                <kbd className="kbd-hint rounded border border-line bg-card px-1 py-px font-mono text-[10px] font-normal tracking-normal normal-case text-muted">
                  [
                </kbd>
              </span>
              <span className="mt-1 block truncate text-[15px] text-foreground/85 group-hover:text-accent">
                ← {older.title}
              </span>
            </Link>
          ) : null}
          {newer ? (
            <Link
              href={newer.href}
              transitionTypes={["nav-forward"]}
              aria-keyshortcuts="]"
              className="group min-w-0 text-[13px] text-muted transition-colors duration-200 hover:text-foreground sm:col-start-2 sm:text-right"
            >
              <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] uppercase sm:justify-end">
                Newer
                <kbd className="kbd-hint rounded border border-line bg-card px-1 py-px font-mono text-[10px] font-normal tracking-normal normal-case text-muted">
                  ]
                </kbd>
              </span>
              <span className="mt-1 block truncate text-[15px] text-foreground/85 group-hover:text-accent">
                {newer.title} →
              </span>
            </Link>
          ) : null}
        </div>
      ) : null}
      <div className="flex items-center justify-between text-[13px] text-muted">
        <Link
          href={backHref}
          transitionTypes={["nav-back"]}
          aria-keyshortcuts="Escape"
          className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-foreground"
        >
          ← {backLabel}
          <kbd className="kbd-hint rounded border border-line bg-card px-1 py-px font-mono text-[10px] font-normal tracking-normal normal-case text-muted">
            esc
          </kbd>
        </Link>
        {extra}
      </div>
    </nav>
  );
}
