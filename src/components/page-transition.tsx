import { ViewTransition } from "react";

const navMap = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "none",
} as const;

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter={navMap} exit={navMap} default="none">
      {children}
    </ViewTransition>
  );
}
