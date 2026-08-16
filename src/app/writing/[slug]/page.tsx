import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { PageFrame } from "@/components/page-frame";
import { PageTransition } from "@/components/page-transition";
import { loadWriting } from "@/lib/mdx";
import { formatDate, site, writing, writingBySlug } from "@/lib/site";

export function generateStaticParams() {
  return writing.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = writingBySlug(slug);
  if (!item) return {};
  return { title: `${item.title} — ${site.name}`, description: item.line };
}

export default async function WritingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = writingBySlug(slug);
  if (!item) notFound();
  const { content, frontmatter } = await loadWriting(item.slug);

  return (
    <PageTransition>
      <PageFrame className="pt-10 pb-24">
        <header className="reveal">
          <ViewTransition name={`writing-${item.slug}`} share="morph" default="none">
            <h1 className="text-[2rem] leading-tight font-semibold tracking-tight">{frontmatter.title}</h1>
          </ViewTransition>
          <p className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-[13px] text-muted">
            <span>
              <a href={site.x} target="_blank" rel="noreferrer" className="hover:text-foreground">
                @{site.xHandle}
              </a>
              <span>
                {" "}
                | {formatDate(item.date)}
              </span>
            </span>
            <span>{frontmatter.line}</span>
          </p>
        </header>
        <article className="prose-work mt-10 space-y-5 text-[16px] leading-7 text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_code]:rounded [&_code]:bg-card [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[13px] [&_h2]:mt-12 [&_h2]:text-[1.35rem] [&_h2]:font-semibold [&_h2]:tracking-tight [&_li]:text-foreground/85 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_p]:text-foreground/85 [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {content}
        </article>
        <div className="mt-16 text-[13px] text-muted">
          <Link href="/writing" transitionTypes={["nav-back"]} className="hover:text-foreground">
            ← Writing
          </Link>
        </div>
      </PageFrame>
    </PageTransition>
  );
}
