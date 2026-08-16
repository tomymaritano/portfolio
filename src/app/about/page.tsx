import Link from "next/link";
import { PageTransition } from "@/components/page-transition";
import { site, work } from "@/lib/site";

export const metadata = { title: `About — ${site.name}` };

export default function AboutPage() {
  return (
    <PageTransition>
      <main id="main" className="mx-auto max-w-2xl px-5 py-16">
        <p className="reveal font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
          {site.city}
        </p>
        <h1 className="reveal reveal-delay-1 mt-2 text-3xl font-medium tracking-tight">About</h1>
        <div className="reveal reveal-delay-2 mt-8 space-y-5 text-[15px] leading-7 text-muted">
          {site.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <p className="reveal-view mt-10 text-[15px] text-foreground">{site.now}</p>
        <ul className="mt-6 space-y-2 text-[15px]">
          {work.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/work/${item.slug}`}
                transitionTypes={["nav-forward"]}
                className="text-muted hover:text-foreground"
              >
                {item.title}
                <span className="text-muted"> — {item.line}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-14 flex gap-4 text-[13px] text-muted">
          <Link href="/" transitionTypes={["nav-back"]} className="hover:text-foreground">
            ← Home
          </Link>
          <a href={site.x} target="_blank" rel="noreferrer" className="hover:text-foreground">
            Follow on X
          </a>
        </div>
      </main>
    </PageTransition>
  );
}
