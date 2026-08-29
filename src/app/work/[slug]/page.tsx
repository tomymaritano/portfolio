import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { ArticleNav } from "@/components/article-nav";
import { ReadingProgress } from "@/components/reading-progress";
import { PageFrame } from "@/components/page-frame";
import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";
import { WorkMedia } from "@/components/work-media";
import { loadWork } from "@/lib/mdx";
import { site, work, workBySlug, workLane, workLaneLabel, workNeighbors, workNotes, writingBySlug } from "@/lib/site";

export function generateStaticParams() {
  return work.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = workBySlug(slug);
  if (!item) return {};
  const title = `${item.title} — ${site.name}`;
  return {
    title,
    description: item.line,
    alternates: { canonical: `/work/${item.slug}` },
    openGraph: { title, description: item.line, url: `/work/${item.slug}` },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = workBySlug(slug);
  if (!item) notFound();
  const { content, frontmatter, minutes } = await loadWork(item.slug);
  const lane = workLane(item.slug);
  const noteSlug = item.slug in workNotes ? workNotes[item.slug as keyof typeof workNotes] : null;
  const note = noteSlug ? writingBySlug(noteSlug) : null;
  const { newer, older } = workNeighbors(item.slug);

  return (
    <PageTransition>
      <ReadingProgress />
      <PageFrame className="pt-10 pb-24">
        <Reveal as="header">
          <ViewTransition name={`work-${item.slug}`} share="morph" default="none">
            <h1 className="text-pretty text-[2rem] leading-tight font-semibold tracking-tight">{frontmatter.title}</h1>
          </ViewTransition>
          <p className="mt-3 flex flex-col gap-y-1 text-[13px] text-muted sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
            <span>
              <a href={site.x} target="_blank" rel="noreferrer" className="transition-colors duration-200 hover:text-foreground">
                @{site.xHandle}
              </a>
              <span>
                {" "}
                | {workLaneLabel[lane]} | {item.year} · {minutes} min
              </span>
            </span>
            <span className="sm:text-right">{frontmatter.line}</span>
          </p>
        </Reveal>
        <Reveal as="article" delay={0.08} className="prose-work mt-10 space-y-5 text-[16px] leading-7">
          {content}
        </Reveal>
        <WorkMedia item={item} />
        <ArticleNav
          backHref="/work"
          backLabel="Work"
          newer={newer ? { href: newer.path, title: newer.title } : null}
          older={older ? { href: older.path, title: older.title } : null}
          extra={
            <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2">
              {note ? (
                <Link href={`/writing/${note.slug}`} transitionTypes={["nav-forward"]} className="transition-colors duration-200 hover:text-foreground">
                  Note: {note.title} →
                </Link>
              ) : null}
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
          }
        />
      </PageFrame>
    </PageTransition>
  );
}
