import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { ArticleNav } from "@/components/article-nav";
import { ReadingProgress } from "@/components/reading-progress";
import { PageFrame } from "@/components/page-frame";
import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";
import { loadWriting } from "@/lib/mdx";
import { formatDate, site, workForNote, writing, writingBySlug, writingNeighbors } from "@/lib/site";

export function generateStaticParams() {
  return writing.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = writingBySlug(slug);
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
  const item = writingBySlug(slug);
  if (!item) notFound();
  const { content, frontmatter, minutes } = await loadWriting(item.slug);
  const { newer, older } = writingNeighbors(item.slug);
  const related = workForNote(item.slug);

  return (
    <PageTransition>
      <ReadingProgress />
      <PageFrame className="pt-10 pb-24">
        <Reveal as="header">
          <ViewTransition name={`writing-${item.slug}`} share="morph" default="none">
            <h1 className="text-pretty text-[2rem] leading-tight font-semibold tracking-tight">{frontmatter.title}</h1>
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
            <span className="sm:text-right">{frontmatter.line}</span>
          </p>
        </Reveal>
        <Reveal as="article" delay={0.08} className="prose-work mt-10 space-y-5 text-[16px] leading-7">
          {content}
        </Reveal>
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
