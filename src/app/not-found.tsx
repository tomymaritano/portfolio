import Link from "next/link";
import { PageFrame } from "@/components/page-frame";
import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata = {
  title: `Not found — ${site.name}`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <PageTransition>
      <PageFrame className="pt-16 pb-24">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">404</p>
          <h1 className="mt-2 text-[2rem] leading-tight font-semibold tracking-tight">This page is not here.</h1>
          <p className="mt-4 max-w-[40rem] text-[16px] leading-7 text-foreground/70">
            The URL does not match a case or a note. Work and writing live in git; if the file is gone, so is the route.
          </p>
          <p className="mt-8 flex gap-5 text-[13px] text-muted">
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
