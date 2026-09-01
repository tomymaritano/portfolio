import Link from "next/link";
import { PageFrame } from "@/components/page-frame";
import { PageTransition } from "@/components/page-transition";
import { Portrait } from "@/components/portrait";
import { Reveal, StaggerIn } from "@/components/reveal";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <PageTransition>
      <PageFrame className="pt-12 pb-24">
        <Reveal as="header">
          <Portrait />
          <h1 className="text-[2rem] leading-tight font-semibold tracking-tight text-foreground sm:text-[2.35rem]">
            {site.headline}
          </h1>
          <p className="mt-4 max-w-[40rem] text-[16px] leading-7 text-foreground/70">{site.line}</p>
          <p className="mt-4 text-[13px] text-muted">
            <a href={site.x} target="_blank" rel="noreferrer" className="transition-colors duration-200 hover:text-foreground">
              Follow @{site.xHandle}
            </a>
            <span aria-hidden> · </span>
            <a href="/cv.pdf" className="transition-colors duration-200 hover:text-foreground">
              CV
            </a>
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10 space-y-5 text-[16px] leading-7 text-foreground/85">
          {site.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
        <div className="clear-both" />

        <Reveal as="section" delay={0.16} className="mt-16">
          <h2 className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">Work</h2>
          <p className="mt-5 text-[16px] leading-7 text-foreground/85">
            <Link href="/work/psynth" transitionTypes={["nav-forward"]} className="text-foreground underline underline-offset-4 transition-colors duration-200 hover:text-accent">
              Psynth
            </Link>{" "}
            is clinical reporting: test results and intake become a draft the psychologist reviews and
            signs.{" "}
            <Link href="/work/dripnex" transitionTypes={["nav-forward"]} className="text-foreground underline underline-offset-4 transition-colors duration-200 hover:text-accent">
              Dripnex
            </Link>{" "}
            is a hackable AI note taker — SQLite now, sync when those surfaces ship.{" "}
            <Link href="/work/dolargaucho" transitionTypes={["nav-forward"]} className="text-foreground underline underline-offset-4 transition-colors duration-200 hover:text-accent">
              DolarGaucho
            </Link>{" "}
            is quotes and a model that reads the Argentine week.{" "}
            <Link href="/work/quantis-intel" transitionTypes={["nav-forward"]} className="text-foreground underline underline-offset-4 transition-colors duration-200 hover:text-accent">
              Quantis-intel
            </Link>{" "}
            is the financial report a desk will send.
          </p>
          <p className="mt-6 text-[13px] text-muted">
            <Link href="/work" transitionTypes={["nav-forward"]} className="transition-colors duration-200 hover:text-foreground">
              My work →
            </Link>
          </p>
        </Reveal>

        <section className="mt-16">
          <Reveal as="h2" delay={0.2} className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
            Stack
          </Reveal>
          <StaggerIn as="ul" className="mt-6 space-y-3 text-[16px] leading-7" y={8}>
            {site.stack.map((row) => (
              <li key={row.label} className="grid grid-cols-[5.75rem_1fr] items-baseline gap-x-4 sm:grid-cols-[6.5rem_1fr]">
                <span className="text-muted">{row.label}</span>
                <span className="flex flex-wrap gap-x-0 gap-y-1 text-foreground/85">
                  {row.items.map((item) => (
                    <span key={item} className="after:mx-2 after:text-muted after:content-['·'] last:after:content-none">
                      {item}
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </StaggerIn>
        </section>
      </PageFrame>
    </PageTransition>
  );
}
