"use client";

import InfiniteSpiral from "@/components/infinite-spiral";
import { homeWork } from "@/lib/site";

export function WorkSpiral() {
  const items = homeWork().flatMap((item) => {
    const srcs = [...new Set([item.cover, ...item.stills].filter((src): src is string => Boolean(src)))];
    return srcs.map((src, i) => ({
      id: `${item.slug}-${i}`,
      src,
      alt: item.title,
      href: `/work/${item.slug}`,
      label: item.title,
    }));
  });

  return (
    <div className="relative h-dvh min-h-[100dvh] overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(126,200,255,0.2),transparent_68%)]">
      <InfiniteSpiral
        items={items}
        speed={0.24}
        radius={720}
        cardWidth={340}
        cardHeight={212}
        verticalSpacing={88}
        cardsPerTurn={6}
        perspective={1500}
        edgeFade={0.04}
        edgeBlur={0.4}
        grayscale={0}
        pauseOnHover
        className="h-full min-h-0"
      />
    </div>
  );
}
