"use client";

import { Reveal } from "@/components/reveal";
import { fontVariables } from "@/lib/fonts";
import { site } from "@/lib/site";
import "./globals.css";

export default function GlobalError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="min-h-dvh bg-background text-foreground">
        <title>{`Error — ${site.name}`}</title>
        <div className="site-atmosphere" aria-hidden />
        <main className="relative z-[1] mx-auto flex min-h-dvh w-full max-w-[680px] flex-col justify-center px-5 py-16">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">Error</p>
            <h1 className="mt-2 text-[2rem] leading-tight font-medium tracking-tight">This page did not render.</h1>
            <p className="mt-4 max-w-[40rem] text-[16px] leading-7 text-foreground/70">
              The root layout threw. The files are still in git. Retry the render, or go somewhere that is already built.
            </p>
            <p className="mt-8 flex gap-5 text-[13px] text-muted">
              <button type="button" onClick={() => retry()} className="transition-colors duration-200 hover:text-foreground">
                Retry
              </button>
              <a href="/" className="transition-colors duration-200 hover:text-foreground">
                Home
              </a>
              <a href="/work" className="transition-colors duration-200 hover:text-foreground">
                Work
              </a>
              <a href="/writing" className="transition-colors duration-200 hover:text-foreground">
                Writing
              </a>
            </p>
          </Reveal>
        </main>
      </body>
    </html>
  );
}
