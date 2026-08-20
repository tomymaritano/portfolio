import { PageFrame } from "@/components/page-frame";
import { PageTransition } from "@/components/page-transition";
import { YearList } from "@/components/year-list";
import { site, workSections } from "@/lib/site";

export const metadata = { title: `Work — ${site.name}` };

export default function WorkIndexPage() {
  return (
    <PageTransition>
      <PageFrame className="pt-10 pb-24">
        {workSections().map((section, i) => (
          <section key={section.lane} className={i === 0 ? "reveal" : "reveal-view mt-16"}>
            <h2 className="mb-4 text-xl font-semibold tracking-tight">{section.title}</h2>
            <YearList items={section.items} />
          </section>
        ))}
      </PageFrame>
    </PageTransition>
  );
}
