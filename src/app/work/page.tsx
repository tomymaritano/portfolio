import { PageFrame } from "@/components/page-frame";
import { PageTransition } from "@/components/page-transition";
import { ProductTile } from "@/components/product-tile";
import { YearList } from "@/components/year-list";
import { homeWork, site, workSections } from "@/lib/site";

export const metadata = { title: `Work — ${site.name}` };

export default function WorkIndexPage() {
  const selected = homeWork();
  const archive = workSections();

  return (
    <PageTransition>
      <PageFrame className="pt-10 pb-24">
        <section className="reveal">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">Selected</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {selected.map((item) => (
              <li key={item.slug}>
                <ProductTile item={item} />
              </li>
            ))}
          </ul>
        </section>
        {archive.length > 0 ? (
          <section className="reveal-view mt-16">
            <h2 className="text-xl font-semibold tracking-tight">Archive</h2>
            {archive.map((section, i) => (
              <div key={section.lane} className={i === 0 ? "mt-8" : "mt-16"}>
                <h3 className="mb-4 text-[13px] text-muted">{section.title}</h3>
                <YearList items={section.items} />
              </div>
            ))}
          </section>
        ) : null}
      </PageFrame>
    </PageTransition>
  );
}
