"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ViewTransition } from "react";
import { StaggerIn } from "@/components/reveal";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

type Row = {
  kind: string;
  slug: string;
  title: string;
  line: string;
  started: number;
  showYear: boolean;
  path: string;
};

function groupByYear(items: readonly Row[]) {
  const groups: { year: number; items: Row[] }[] = [];
  for (const item of items) {
    const last = groups[groups.length - 1];
    if (last && last.year === item.started) last.items.push(item);
    else groups.push({ year: item.started, items: [item] });
  }
  return groups;
}

export function YearList({
  items,
  spine = true,
  markFirst = false,
}: {
  items: readonly Row[];
  spine?: boolean;
  markFirst?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const groups = groupByYear(items);

  const { contextSafe } = useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const line = el.querySelector<HTMLElement>("[data-archive-spine]");
      const years = el.querySelectorAll<HTMLElement>("[data-archive-year]");
      if (reduced) {
        if (line) gsap.set(line, { clearProps: "transform" });
        gsap.set(years, { clearProps: "color" });
        years.forEach((year) => year.classList.remove("is-live"));
        return;
      }
      if (spine && line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              end: "bottom 50%",
              scrub: 0.35,
            },
          },
        );
      }
      el.querySelectorAll<HTMLElement>("[data-archive-group]").forEach((group) => {
        const year = group.querySelector<HTMLElement>("[data-archive-year]");
        if (!year) return;
        const paint = (on: boolean, tween: boolean) => {
          year.classList.toggle("is-live", on);
          gsap.to(year, {
            color: on ? "var(--foreground)" : "var(--muted)",
            duration: tween ? 0.22 : 0,
            ease: "power2.out",
            overwrite: "auto",
          });
        };
        const trigger = ScrollTrigger.create({
          trigger: group,
          start: "top 5rem",
          end: "bottom 5rem",
          onToggle: (self) => paint(self.isActive, true),
        });
        paint(trigger.isActive, false);
      });
    },
    { scope: root, dependencies: [reduced, items.length, spine] },
  );

  const hair = contextSafe((row: HTMLElement, on: boolean) => {
    if (reduced) return;
    if (row.hasAttribute("data-year-latest")) return;
    const mark = row.querySelector<HTMLElement>("[data-year-hair]");
    if (!mark) return;
    gsap.to(mark, {
      scaleY: on ? 1 : 0,
      duration: on ? 0.2 : 0.28,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey || event.repeat) return;
      if (event.key !== "j" && event.key !== "k" && event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      const rows = [...document.querySelectorAll<HTMLAnchorElement>(".year-row")];
      const index = rows.findIndex((row) => row === document.activeElement);
      if (index < 0) return;
      const next = event.key === "j" || event.key === "ArrowDown" ? index + 1 : index - 1;
      const target = rows[next];
      if (!target) return;
      event.preventDefault();
      target.focus();
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [items.length]);

  return (
    <div ref={root} className="relative">
      <p className="sr-only">On a keyboard, j and k move between rows once one is focused.</p>
      {spine ? (
        <span className="archive-spine-clip" aria-hidden>
          <span data-archive-spine="" className="archive-spine" />
        </span>
      ) : null}
      {groups.map((group, groupIndex) => (
        <div key={group.year} data-archive-group="" className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-x-6">
          <div>
            <p data-archive-year="" className="archive-year sticky top-20 pt-4 text-[15px] tabular-nums">
              {group.year}
            </p>
          </div>
          <StaggerIn as="ol" stagger={0.045} y={8}>
            {group.items.map((item, itemIndex) => {
              const latest = markFirst && groupIndex === 0 && itemIndex === 0;
              return (
                <li key={`${item.kind}-${item.slug}`} className="relative overflow-hidden">
                  <Link
                    href={item.path}
                    transitionTypes={["nav-forward"]}
                    onPointerEnter={(event) => hair(event.currentTarget, true)}
                    onPointerLeave={(event) => hair(event.currentTarget, false)}
                    onFocus={(event) => hair(event.currentTarget, true)}
                    onBlur={(event) => hair(event.currentTarget, false)}
                    aria-keyshortcuts="j k"
                    data-year-latest={latest ? "" : undefined}
                    className="year-row group relative flex min-h-11 cursor-pointer flex-col overflow-hidden py-4"
                  >
                    <span data-year-hair="" className="year-hair" aria-hidden />
                    <ViewTransition name={`${item.kind}-${item.slug}`} share="morph" default="none">
                      <span
                        className={`text-pretty text-[16px] leading-snug transition-colors duration-200 group-hover:text-accent ${
                          latest ? "text-accent" : "text-foreground"
                        }`}
                      >
                        {item.title}
                      </span>
                    </ViewTransition>
                    <span className="mt-1.5 max-w-[34rem] text-[14px] leading-6 text-muted transition-colors duration-200 group-hover:text-foreground/65">
                      {item.line}
                    </span>
                  </Link>
                </li>
              );
            })}
          </StaggerIn>
        </div>
      ))}
    </div>
  );
}
