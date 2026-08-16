import Image from "next/image";
import Link from "next/link";
import { PageFrame } from "@/components/page-frame";
import { PageTransition } from "@/components/page-transition";
import { site } from "@/lib/site";

export const metadata = { title: `About — ${site.name}` };

export default function AboutPage() {
  return (
    <PageTransition>
      <PageFrame>
        <h1 className="reveal text-3xl font-semibold tracking-tight">About</h1>
        <p className="reveal reveal-delay-1 mt-2 text-lg font-medium tracking-tight">{site.name}</p>
        <div className="reveal reveal-delay-2 mt-8 text-[16px] leading-7 text-foreground/85">
          <Image
            src={site.photo}
            alt={site.name}
            width={208}
            height={208}
            priority
            className="mx-auto mb-6 block size-32 rounded-full object-cover object-[center_20%] sm:float-right sm:mx-0 sm:mb-4 sm:ml-6 sm:size-52"
          />
          <div className="space-y-5">
            {site.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className="clear-both" />

        <h2 className="reveal-view mt-16 text-xl font-semibold tracking-tight">Technical contributions</h2>
        <ul className="mt-6 space-y-5 text-[16px] leading-7 text-foreground/85">
          {site.contributions.map((item) => (
            <li key={item.href}>
              {item.lead}
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-foreground underline underline-offset-4 hover:text-foreground/80"
              >
                {item.title}
              </a>
              {item.tail}
            </li>
          ))}
        </ul>

        <h2 className="reveal-view mt-16 text-xl font-semibold tracking-tight">Stack</h2>
        <ul className="mt-6 space-y-3 text-[15px] leading-7">
          {site.stack.map((row) => (
            <li key={row.label} className="grid grid-cols-[6.5rem_1fr] gap-x-4 sm:grid-cols-[7.5rem_1fr]">
              <span className="text-muted">{row.label}</span>
              <span className="text-foreground/85">{row.items.join(" · ")}</span>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex flex-wrap gap-4 text-[13px] text-muted">
          <Link href="/" transitionTypes={["nav-back"]} className="hover:text-foreground">
            ← Home
          </Link>
          <a href={site.x} target="_blank" rel="noreferrer" className="hover:text-foreground">
            Follow me
          </a>
          <a href={site.github} target="_blank" rel="noreferrer" className="hover:text-foreground">
            GitHub
          </a>
        </div>
      </PageFrame>
    </PageTransition>
  );
}
