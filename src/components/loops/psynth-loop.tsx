"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const ROWS = [
  { title: "Intake", state: "ready" },
  { title: "Draft report", state: "ready" },
  { title: "Export", state: "idle" },
];

export function PsynthLoop() {
  const [tick, setTick] = useState(0);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setTick((n) => n + 1), 1600);
    return () => window.clearInterval(id);
  }, [reduce]);

  const active = reduce ? ROWS.length : tick % (ROWS.length + 1);

  return (
    <div className="flex h-full min-h-[200px] bg-[#0c0c0c]" aria-hidden>
      <aside className="hidden w-[120px] border-r border-line p-3 text-[11px] text-muted sm:block">
        <p className="mb-3 text-[13px] text-foreground">Psynth</p>
        <p className="rounded-md bg-white/10 px-2 py-1 text-foreground">Reports</p>
        <p className="px-2 py-1">Assessments</p>
        <p className="px-2 py-1">Export</p>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="border-b border-line px-3 py-2 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
          Clinical / Report
        </div>
        <ul className="divide-y divide-line text-[13px]">
          {ROWS.map((row, i) => (
            <li key={row.title} className="flex items-center justify-between px-3 py-2.5">
              <span>{row.title}</span>
              <span
                className={`font-mono text-[10px] uppercase ${
                  i === active && !reduce ? "text-accent" : "text-muted"
                }`}
              >
                {i < active ? row.state : i === active ? "generating" : "idle"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
