import { DolarGauchoLoop } from "@/components/loops/dolargaucho-loop";
import { PsynthLoop } from "@/components/loops/psynth-loop";
import { ProductTile } from "@/components/product-tile";
import { site, work } from "@/lib/site";

const loops = {
  psynth: <PsynthLoop />,
  dolargaucho: <DolarGauchoLoop />,
};

export default function HomePage() {
  return (
    <main id="main">
      <section className="mx-auto flex max-w-5xl flex-col items-center px-5 pt-20 pb-14 text-center sm:pt-28">
        <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">{site.city}</p>
        <h1 className="mt-3 text-[2.4rem] leading-[1.08] font-medium tracking-tight sm:text-[3.25rem]">
          {site.headline}
        </h1>
        <p className="mt-4 max-w-lg text-[15px] text-muted">{site.line}</p>
        <a
          href={site.x}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex h-10 items-center rounded-full border border-line px-5 text-[13px] hover:bg-white/5"
        >
          Follow on X →
        </a>
      </section>

      <section id="work" className="mx-auto grid max-w-5xl gap-3 px-5 pb-20 md:grid-cols-2">
        {work.map((item) => (
          <ProductTile key={item.slug} item={item}>
            {loops[item.slug]}
          </ProductTile>
        ))}
      </section>
    </main>
  );
}
