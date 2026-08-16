export const site = {
  name: "Tomás Maritano",
  handle: "tomás",
  headline: "I ship products.",
  line: "Product engineer. I build software and write about the decisions behind it.",
  city: "Buenos Aires",
  x: "https://x.com/tomymaritano",
  email: "tomymaritano@gmail.com",
  now: "Building Psynth.",
  about: [
    "I’m a product engineer in Buenos Aires. I design and ship software — Psynth, and products like DolarGaucho.",
    "I care about the last mile: the thing someone actually sends, reads, or trusts on Monday. Not the demo.",
    "I write when the decision is interesting. Most of that lives on X.",
  ],
} as const;

export const work = [
  {
    slug: "psynth",
    title: "Psynth",
    line: "Clinical product, end to end.",
    year: "2024—",
    href: "https://psynth.ai",
    cover: "/work/psynth/cover.svg",
    loop: undefined as string | undefined,
    stills: [
      "/work/psynth/01.svg",
      "/work/psynth/02.svg",
      "/work/psynth/03.svg",
    ],
  },
  {
    slug: "dolargaucho",
    title: "DolarGaucho",
    line: "Argentine macro, as a product.",
    year: "2025—",
    href: null as string | null,
    cover: "/work/dolargaucho/cover.svg",
    loop: undefined as string | undefined,
    stills: [
      "/work/dolargaucho/01.svg",
      "/work/dolargaucho/02.svg",
      "/work/dolargaucho/03.svg",
    ],
  },
] as const;

export type WorkItem = (typeof work)[number];
export type WorkSlug = WorkItem["slug"];

export function workBySlug(slug: string): WorkItem | null {
  return work.find((item) => item.slug === slug) ?? null;
}
