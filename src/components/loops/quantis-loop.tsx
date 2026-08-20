"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const ROWS = [
  { title: "Income pack", state: "ready" },
  { title: "Variance", state: "ready" },
  { title: "Board draft", state: "idle" },
];

export function QuantisLoop() {
  const [tick, setTick] = useState(0);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setTick((n) => n + 1), 1500);
    return () => window.clearInterval(id);
  }, [reduce]);

  const active = reduce ? ROWS.length : tick % (ROWS.length + 1);
  const width = reduce ? 72 : 28 + ((tick * 17) % 55);

  return (
    <div className="flex h-full min-h-[200px] flex-col bg-[#0c0c0c] p-4" aria-hidden>
      <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">Report / Q3</p>
      <p className="mt-2 text-[15px] font-medium">Drafting the pack</p>
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/8">
        <div className="h-full bg-accent transition-[width] duration-700" style={{ width: `${width}%` }} />
      </div>
      <ul className="mt-4 space-y-2 text-[12px]">
        {ROWS.map((row, i) => (
          <li key={row.title} className="flex items-center justify-between">
            <span className={i < active ? "text-foreground" : "text-muted"}>{row.title}</span>
            <span className="font-mono text-[10px] text-muted uppercase">
              {i < active ? row.state : i === active ? "writing" : "idle"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
