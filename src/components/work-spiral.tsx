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
    <InfiniteSpiral
      items={items}
      speed={0.32}
      radius={150}
      cardWidth={168}
      cardHeight={105}
      verticalSpacing={50}
      cardsPerTurn={6}
      edgeFade={0.42}
      edgeBlur={5}
      grayscale={0.08}
      pauseOnHover
      className="h-[26rem] sm:h-[32rem]"
    />
  );
}
