"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const NOTES = [
  { title: "Editor playground", tag: "#demo", active: true },
  { title: "Dripnex — Now / Next / Not", tag: "#now" },
  { title: "Psynth automation", tag: "#dev" },
];

const TASKS = ["Slash menu", "Alerts", "Task list", "Outline"];

export function DripnexLoop() {
  const [tick, setTick] = useState(0);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setTick((n) => n + 1), 1400);
    return () => window.clearInterval(id);
  }, [reduce]);

  const done = reduce ? 3 : tick % 5;

  return (
    <div className="flex h-full min-h-[240px] bg-[#121212] text-[11px]" aria-hidden>
      <aside className="hidden w-[108px] shrink-0 border-r border-white/6 bg-[#161616] p-2.5 sm:block">
        <p className="mb-3 text-[12px] text-white/80">Notes</p>
        <p className="rounded-md bg-[#ff8a1e]/15 px-2 py-1 text-[#ff8a1e]">Active</p>
        <p className="px-2 py-1 text-white/40">On Hold</p>
        <p className="mt-3 px-2 text-[10px] tracking-[0.14em] text-white/25 uppercase">Tags</p>
        <p className="px-2 py-0.5 text-white/45">#dev</p>
        <p className="px-2 py-0.5 text-white/45">#now</p>
      </aside>
      <div className="hidden w-[168px] shrink-0 border-r border-white/6 bg-[#141414] md:block">
        {NOTES.map((note) => (
          <div
            key={note.title}
            className={`border-l-2 px-3 py-2.5 ${
              note.active ? "border-[#ff8a1e] bg-white/4" : "border-transparent"
            }`}
          >
            <p className={note.active ? "text-white" : "text-white/55"}>{note.title}</p>
            <p className="mt-0.5 text-[10px] text-white/30">{note.tag}</p>
          </div>
        ))}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-white/6 px-3 py-2 text-[10px] text-white/35">
          <span>notes / active / playground</span>
          <span className="text-[#ff8a1e]">
            {Math.min(done, TASKS.length)} of {TASKS.length} tasks
          </span>
        </div>
        <div className="grid flex-1 grid-cols-1 gap-3 p-3 sm:grid-cols-2">
          <div className="font-mono text-[11px] leading-5 text-white/55">
            <p className="text-[#ff8a1e]"># Editor playground</p>
            <p className="mt-2">A local markdown surface.</p>
            {TASKS.map((task, i) => (
              <p key={task} className={i < done ? "text-white/70" : "text-white/35"}>
                {i < done ? "[x]" : "[ ]"} {task}
              </p>
            ))}
          </div>
          <div className="hidden sm:block">
            <p className="text-[15px] font-semibold text-[#ff8a1e]">Editor playground</p>
            <p className="mt-2 text-white/60">A local markdown surface.</p>
            <div className="mt-3 rounded-md border border-[#ff8a1e]/25 bg-[#ff8a1e]/8 px-2.5 py-2 text-[#ff8a1e]">
              Tip — SQLite now. Sync next.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
