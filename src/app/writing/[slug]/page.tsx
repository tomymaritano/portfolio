import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { ArticleNav } from "@/components/article-nav";
import { ReadingProgress } from "@/components/reading-progress";
import { PageFrame } from "@/components/page-frame";
import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";
import { sanitizeGhostHtml } from "@/lib/ghost";
import { loadWriting } from "@/lib/mdx";
import { getWriting, listWriting, writingNeighborsFromFeed } from "@/lib/writing-feed";
import { formatDate, site, workForNote } from "@/lib/site";

export const dynamicParams = true;

export async function generateStaticParams() {
  const notes = await listWriting();
  return notes.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getWriting(slug);
  if (!item) return {};
  const title = `${item.title} — ${site.name}`;
  return {
    title,
    description: item.line,
    alternates: { canonical: `/writing/${item.slug}` },
    openGraph: { title, description: item.line, url: `/writing/${item.slug}` },
  };
}

export default async function WritingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getWriting(slug);
  if (!item) notFound();

  const local = item.source === "local" ? await loadWriting(item.slug) : null;
  const title = local?.frontmatter.title ?? item.title;
  const line = local?.frontmatter.line ?? item.line;
  const minutes = local?.minutes ?? item.minutes;
  const { newer, older } = await writingNeighborsFromFeed(item.slug);
  const related = item.source === "local" ? workForNote(item.slug) : null;

  return (
    <PageTransition>
      <ReadingProgress />
      <PageFrame className="pt-10 pb-24">
        <Reveal as="header">
          <ViewTransition name={`writing-${item.slug}`} share="morph" default="none">
            <h1 className="text-pretty text-[2rem] leading-tight font-medium tracking-tight">{title}</h1>
          </ViewTransition>
          <p className="mt-3 flex flex-col gap-y-1 text-[13px] text-muted sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
            <span>
              <a href={site.x} target="_blank" rel="noreferrer" className="transition-colors duration-200 hover:text-foreground">
                @{site.xHandle}
              </a>
              <span>
                {" "}
                | {formatDate(item.date)} · {minutes} min
              </span>
            </span>
            <span className="sm:text-right">{line}</span>
          </p>
        </Reveal>
        {local ? (
          <Reveal as="article" delay={0.08} className="prose-work mt-10 space-y-5 text-[16px] leading-7">
            {local.content}
          </Reveal>
        ) : (
          <Reveal
            as="article"
            delay={0.08}
            className="prose-work ghost-body mt-10 space-y-5 text-[16px] leading-7"
          >
            <div dangerouslySetInnerHTML={{ __html: sanitizeGhostHtml(item.html ?? "") }} />
          </Reveal>
        )}
        <ArticleNav
          backHref="/writing"
          backLabel="Writing"
          newer={newer ? { href: newer.path, title: newer.title } : null}
          older={older ? { href: older.path, title: older.title } : null}
          extra={
            related ? (
              <Link href={`/work/${related.slug}`} transitionTypes={["nav-forward"]} className="transition-colors duration-200 hover:text-foreground">
                Case: {related.title} →
              </Link>
            ) : null
          }
        />
      </PageFrame>
    </PageTransition>
  );
}
