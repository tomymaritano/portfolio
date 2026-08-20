"use client";

import { ArrowUpRight, Menu, X } from "lucide";
import type { IconInput } from "morphicons/react";

export const GithubIcon: IconInput = [
  [
    "path",
    {
      d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
    },
  ],
  ["path", { d: "M9 18c-4.51 2-5-2-7-2" }],
];

export const LinkedInIcon: IconInput = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
  ["path", { d: "M8 10v7" }],
  ["path", { d: "M8 7h.01" }],
  ["path", { d: "M12 17v-4.2a2.2 2.2 0 0 1 4.4 0V17" }],
  ["path", { d: "M12 10h.01" }],
];

export const XIcon: IconInput = [
  ["path", { d: "M17.5 3h3.2l-7 8 8.3 10h-6.5l-5.1-6.6L4.4 21H1.2l7.5-8.6L1 3h6.6l4.6 6z" }],
];

export const navMarks = {
  github: { rest: GithubIcon, hover: ArrowUpRight },
  linkedin: { rest: LinkedInIcon, hover: ArrowUpRight },
  x: { rest: XIcon, hover: ArrowUpRight },
  menu: { rest: Menu, hover: X },
} as const;
