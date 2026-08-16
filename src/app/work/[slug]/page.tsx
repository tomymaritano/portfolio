import Link from "next/link";
import { notFound } from "next/navigation";
import { loadWork } from "@/lib/mdx";
import { site, work, workBySlug, type WorkSlug } from "@/lib/site";

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
  const { content, frontmatter } = await loadWork(item.slug as WorkSlug);

  return (
    <main id="main" className="mx-auto max-w-2xl px-5 py-16">
      <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
        {item.year}
      </p>
      <h1 className="mt-2 text-3xl font-medium tracking-tight">{frontmatter.title}</h1>
      <p className="mt-3 text-muted">{frontmatter.line}</p>
      <article className="prose-work mt-10 space-y-4 text-[15px] leading-7 text-foreground/90 [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-medium [&_h2]:tracking-tight [&_p]:text-muted [&_em]:text-foreground">
        {content}
      </article>
      <div className="mt-14 flex items-center justify-between text-[13px] text-muted">
        <Link href="/" className="hover:text-foreground">
          ← Home
        </Link>
        <a href={site.x} target="_blank" rel="noreferrer" className="hover:text-foreground">
          Follow on X
        </a>
      </div>
    </main>
  );
}
