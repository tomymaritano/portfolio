"use client";

import { useEffect, useState } from "react";

const ROWS = [
  { title: "Weekly brief", state: "ready" },
  { title: "Section lock", state: "ready" },
  { title: "Export", state: "idle" },
];

export function PsynthLoop() {
  const [tick, setTick] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(motion.matches);
    if (motion.matches) return;
    const id = window.setInterval(() => setTick((n) => n + 1), 1600);
    return () => window.clearInterval(id);
  }, []);

  const active = reduce ? ROWS.length : tick % (ROWS.length + 1);

  return (
    <div className="flex h-full min-h-[220px] bg-[#0c0c0c]" aria-hidden>
      <aside className="hidden w-[128px] border-r border-line p-3 text-[11px] text-muted sm:block">
        <p className="mb-3 text-[13px] text-foreground">Psynth</p>
        <p className="rounded-md bg-white/10 px-2 py-1 text-foreground">Reports</p>
        <p className="px-2 py-1">Templates</p>
        <p className="px-2 py-1">Settings</p>
      </aside>
      <div className="flex flex-1 flex-col">
        <div className="border-b border-line px-3 py-2 font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
          Workspace / Reports
        </div>
        <ul className="divide-y divide-line text-[13px]">
          {ROWS.map((row, i) => (
            <li key={row.title} className="flex items-center justify-between px-3 py-2.5">
              <span>{row.title}</span>
              <span className="font-mono text-[10px] text-muted uppercase">
                {i < active ? row.state : i === active ? "generating" : "idle"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
