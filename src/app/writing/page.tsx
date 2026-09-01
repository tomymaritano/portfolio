import { PageFrame } from "@/components/page-frame";
import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";
import { YearList } from "@/components/year-list";
import { site } from "@/lib/site";
import { listWriting } from "@/lib/writing-feed";

export const metadata = {
  title: `Writing — ${site.name}`,
  description: "Notes on decisions. X is still the feed.",
  alternates: { canonical: "/writing" },
};

export default async function WritingIndexPage() {
  const notes = await listWriting();
  return (
    <PageTransition>
      <PageFrame className="pt-10 pb-24">
        <h1 className="sr-only">Writing</h1>
        <Reveal as="p" className="mb-10 max-w-[40rem] text-[16px] leading-7 text-muted">
          Notes on decisions.{" "}
          <a href={site.x} target="_blank" rel="noreferrer" className="transition-colors duration-200 hover:text-foreground">
            X is still the feed
          </a>
          .
        </Reveal>
        <YearList items={notes} />
      </PageFrame>
    </PageTransition>
  );
}
