import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { PageFrame } from "@/components/page-frame";
import { PageTransition } from "@/components/page-transition";
import { WorkMedia } from "@/components/work-media";
import { loadWork } from "@/lib/mdx";
import { site, work, workBySlug, workLane, workLaneLabel, workNotes, writingBySlug } from "@/lib/site";

export function generateStaticParams() {
  return work.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = workBySlug(slug);
  if (!item) return {};
  return { title: `${item.title} — ${site.name}`, description: item.line };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = workBySlug(slug);
  if (!item) notFound();
  const { content, frontmatter } = await loadWork(item.slug);
  const lane = workLane(item.slug);
  const noteSlug = item.slug in workNotes ? workNotes[item.slug as keyof typeof workNotes] : null;
  const note = noteSlug ? writingBySlug(noteSlug) : null;

  return (
    <PageTransition>
      <PageFrame className="pt-10 pb-24">
        <header className="reveal">
          <ViewTransition name={`work-${item.slug}`} share="morph" default="none">
            <h1 className="text-[2rem] leading-tight font-semibold tracking-tight">{frontmatter.title}</h1>
          </ViewTransition>
          <p className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-[13px] text-muted">
            <span>
              <a href={site.x} target="_blank" rel="noreferrer" className="transition-colors duration-200 hover:text-foreground">
                @{site.xHandle}
              </a>
              <span>
                {" "}
                | {workLaneLabel[lane]} | {item.year}
              </span>
            </span>
            <span>{frontmatter.line}</span>
          </p>
        </header>
        <article className="prose-work mt-10 space-y-5 text-[16px] leading-7 text-foreground [&_h2]:mt-12 [&_h2]:text-[1.5rem] [&_h2]:font-semibold [&_h2]:tracking-tight [&_p]:text-foreground/85 [&_em]:text-foreground">
          {content}
        </article>
        {note ? (
          <p className="mt-12 text-[15px] text-muted">
            <Link href={`/writing/${note.slug}`} transitionTypes={["nav-forward"]} className="transition-colors duration-200 hover:text-foreground">
              {note.title} →
            </Link>
          </p>
        ) : null}
        {item.stills.length > 0 || item.cover ? <WorkMedia item={item} /> : null}
        <div className="mt-16 flex items-center justify-between text-[13px] text-muted">
          <Link href="/work" transitionTypes={["nav-back"]} className="transition-colors duration-200 hover:text-foreground">
            ← Work
          </Link>
          <div className="flex gap-4">
            {item.repo ? (
              <a href={item.repo} target="_blank" rel="noreferrer" className="transition-colors duration-200 hover:text-foreground">
                GitHub
              </a>
            ) : null}
            {item.href ? (
              <a href={item.href} target="_blank" rel="noreferrer" className="transition-colors duration-200 hover:text-foreground">
                Live →
              </a>
            ) : null}
          </div>
        </div>
      </PageFrame>
    </PageTransition>
  );
}
