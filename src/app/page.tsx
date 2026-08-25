import Image from "next/image";
import Link from "next/link";
import { PageFrame } from "@/components/page-frame";
import { PageTransition } from "@/components/page-transition";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <PageTransition>
      <PageFrame className="pt-12 pb-24">
        <header className="reveal">
          <Image
            src={site.photo}
            alt={site.name}
            width={208}
            height={208}
            priority
            className="mx-auto mb-6 hidden size-32 rounded-full object-cover object-[center_20%] sm:float-right sm:mx-0 sm:mb-4 sm:ml-6 sm:size-40 md:block"
          />
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
        </header>

        <div className="reveal reveal-delay-1 mt-10 space-y-5 text-[16px] leading-7 text-foreground/85">
          {site.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="clear-both" />

        <section className="reveal reveal-delay-2 mt-16">
          <h2 className="text-xl font-semibold tracking-tight">Work</h2>
          <p className="mt-5 text-[16px] leading-7 text-foreground/85">
            <Link href="/work/psynth" className="text-foreground underline underline-offset-4 transition-colors duration-200 hover:text-accent">
              Psynth
            </Link>{" "}
            is clinical reporting: test results and intake become a draft the psychologist reviews and
            signs.{" "}
            <Link href="/work/dripnex" className="text-foreground underline underline-offset-4 transition-colors duration-200 hover:text-accent">
              Dripnex
            </Link>{" "}
            is an AI note taker — SQLite now, sync when those surfaces ship.{" "}
            <Link href="/work/dolargaucho" className="text-foreground underline underline-offset-4 transition-colors duration-200 hover:text-accent">
              DolarGaucho
            </Link>{" "}
            is quotes and a model that reads the Argentine week.{" "}
            <Link href="/work/quantis-intel" className="text-foreground underline underline-offset-4 transition-colors duration-200 hover:text-accent">
              Quantis-intel
            </Link>{" "}
            is the financial report a desk will send.
          </p>
          <p className="mt-6 text-[13px] text-muted">
            <Link href="/work" transitionTypes={["nav-forward"]} className="transition-colors duration-200 hover:text-foreground">
              My work →
            </Link>
          </p>
        </section>

        <section className="reveal-view mt-16">
          <h2 className="text-xl font-semibold tracking-tight">Stack</h2>
          <ul className="mt-6 space-y-3 text-[15px] leading-7">
            {site.stack.map((row) => (
              <li key={row.label} className="grid grid-cols-[6.75rem_1fr] gap-x-4 sm:grid-cols-[7.5rem_1fr]">
                <span className="text-muted">{row.label}</span>
                <span className="text-foreground/85">{row.items.join(" · ")}</span>
              </li>
            ))}
          </ul>
        </section>
      </PageFrame>
    </PageTransition>
  );
}
