"use client";

import Link from "next/link";
import { PageFrame } from "@/components/page-frame";
import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";

export default function Error({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <PageTransition>
      <PageFrame className="pt-16 pb-24">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">Error</p>
          <h1 className="mt-2 text-[2rem] leading-tight font-semibold tracking-tight">This page did not render.</h1>
          <p className="mt-4 max-w-[40rem] text-[16px] leading-7 text-foreground/70">
            A route threw. The files are still in git. Retry the render, or go somewhere that is already built.
          </p>
          <p className="mt-8 flex gap-5 text-[13px] text-muted">
            <button type="button" onClick={() => retry()} className="transition-colors duration-200 hover:text-foreground">
              Retry
            </button>
            <Link href="/" transitionTypes={["nav-back"]} className="transition-colors duration-200 hover:text-foreground">
              Home
            </Link>
            <Link href="/work" transitionTypes={["nav-forward"]} className="transition-colors duration-200 hover:text-foreground">
              Work
            </Link>
            <Link href="/writing" transitionTypes={["nav-forward"]} className="transition-colors duration-200 hover:text-foreground">
              Writing
            </Link>
          </p>
        </Reveal>
      </PageFrame>
    </PageTransition>
  );
}
