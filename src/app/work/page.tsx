import { PageFrame } from "@/components/page-frame";
import { PageTransition } from "@/components/page-transition";
import { ProductTile } from "@/components/product-tile";
import { Reveal, StaggerIn } from "@/components/reveal";
import { YearList } from "@/components/year-list";
import { homeWork, site, workSections } from "@/lib/site";

export const metadata = {
  title: `Work — ${site.name}`,
  description: "Products, roles, and clients.",
  alternates: { canonical: "/work" },
};

export default function WorkIndexPage() {
  const selected = homeWork();
  const archive = workSections();

  return (
    <PageTransition>
      <PageFrame className="pt-10 pb-24">
        <h1 className="sr-only">Work</h1>
        <section>
          <Reveal as="h2" className="mb-4 font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
            Selected
          </Reveal>
          <StaggerIn as="ul" className="grid gap-4 sm:grid-cols-2" stagger={0.08} y={16}>
            {selected.map((item) => (
              <li key={item.slug} className="h-full">
                <ProductTile item={item} />
              </li>
            ))}
          </StaggerIn>
        </section>
        {archive.length > 0 ? (
          <section className="mt-16">
            <Reveal as="h2" scroll className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
              Archive
            </Reveal>
            {archive.map((section, i) => (
              <div key={section.lane} className={i === 0 ? "mt-8" : "mt-16"}>
                <Reveal as="h3" scroll className="mb-4 text-[13px] text-muted">
                  {section.title}
                </Reveal>
                <YearList items={section.items} />
              </div>
            ))}
          </section>
        ) : null}
      </PageFrame>
    </PageTransition>
  );
}
