import { PageFrame } from "@/components/page-frame";
import { PageTransition } from "@/components/page-transition";
import { YearList } from "@/components/year-list";
import { site, writingIndex } from "@/lib/site";

export const metadata = { title: `Writing — ${site.name}` };

export default function WritingIndexPage() {
  return (
    <PageTransition>
      <PageFrame className="pt-10 pb-24">
        <div className="reveal">
          <YearList items={writingIndex()} />
        </div>
      </PageFrame>
    </PageTransition>
  );
}
