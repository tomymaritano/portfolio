export const site = {
  name: "Tomás Maritano",
  handle: "tomás",
  headline: "I ship products.",
  line: "Software engineer and writer. I build software and write about the decisions behind it.",
  city: "Buenos Aires",
  x: "https://x.com/tomymaritano",
  xHandle: "tomymaritano",
  email: "tomymaritano@gmail.com",
  github: "https://github.com/tomymaritano",
  linkedin: "https://www.linkedin.com/in/tomymaritano",
  photo: "/perfil.png",
  about: [
    "I’m a software engineer in Buenos Aires. I design and ship software — HIPAA-compliant healthcare platforms, AI-powered systems, and multi-tenant SaaS. I studied at Universidad Tecnológica Nacional.",
    "I started building client sites at Su Web Express in 2017. In 2020 I moved to Copenhagen and did frontend at Wolt. I later worked full-stack at Grandvalira in Andorra — tourism tech — and as a senior frontend at Valere Realms, on Web3.",
    "In 2024 I joined Unicoin, crypto and fintech. The throughline of the last decade has been the same problem from different angles: make complex systems feel obvious.",
    "I’m now at Psynth. I joined as a design engineer and I lead the development team, building AI-powered psychological assessment tools — the frontend, the design system, and the clinical surface. I also ship my own products. I write when the decision is interesting.",
  ],
  contributions: [
    {
      href: "https://psynth.ai",
      title: "Psynth",
      lead: "I lead the development team at ",
      tail: ", a clinical assessment platform. I joined as a design engineer and now own the path from the surface a clinician uses to the document they actually send — identity, reports, generation, export — as one product system, not a pile of tools.",
    },
    {
      href: "https://dolargaucho.com",
      title: "DolarGaucho",
      lead: "Built ",
      tail: ", Argentine macro as a product. The quote is not the product — the product is how fast someone can trust the strip and move on, instead of assembling the week from screenshots and group chats.",
    },
    {
      href: "https://readied.app",
      title: "Readied",
      lead: "Authored ",
      tail: ", an offline-first Markdown editor. Notes stay as plain files on your machine — no proprietary format, no internet required, no vendor holding the words hostage.",
    },
    {
      href: "https://tomymaritano.github.io/criterionx/",
      title: "Criterion",
      lead: "Authored ",
      tail: ", a deterministic and explainable decision engine. Business-critical rules become pure, testable functions with an audit trail — same input, same output, and a reason you can show when someone asks why.",
    },
    {
      href: "https://react-cairn.vercel.app",
      title: "Cairn",
      lead: "Designed ",
      tail: ", a state-machine workflow engine for onboarding and user guidance. Tour libraries are a linear list of tooltips; Cairn owns the path, the branches, and the event stream, and you own the UI.",
    },
  ],
  stack: [
    { label: "Cloud", items: ["AWS", "GCP", "Kubernetes", "Docker", "Terraform", "ArgoCD"] },
    { label: "Frontend", items: ["TypeScript", "JavaScript", "React", "Next.js", "CSS", "Tailwind"] },
    { label: "Backend", items: ["Python", "Node.js", "FastAPI", "Go", "Rust"] },
    { label: "Keyboards", items: ["Lua", "C#"] },
    { label: "Data", items: ["PostgreSQL", "MongoDB", "Redis", "Prisma"] },
    { label: "AI", items: ["LLM orchestration", "Vertex AI", "Reinforcement learning"] },
  ],
} as const;

export const work = [
  {
    kind: "work" as const,
    slug: "psynth",
    title: "Psynth",
    line: "Clinical product. I lead engineering.",
    started: 2026,
    date: "2026-08-01",
    year: "2026—",
    href: "https://psynth.ai",
    repo: null as string | null,
    cover: "/work/psynth/cover.svg",
    loop: undefined as string | undefined,
    stills: ["/work/psynth/01.svg", "/work/psynth/02.svg", "/work/psynth/03.svg"],
  },
  {
    kind: "work" as const,
    slug: "cairn",
    title: "Cairn",
    line: "Workflow engine for onboarding and guidance.",
    started: 2026,
    date: "2026-06-14",
    year: "2026",
    href: "https://react-cairn.vercel.app",
    repo: "https://github.com/tomymaritano/cairn",
    cover: undefined as string | undefined,
    loop: undefined as string | undefined,
    stills: [] as string[],
  },
  {
    kind: "work" as const,
    slug: "readied",
    title: "Readied",
    line: "Offline-first Markdown editor.",
    started: 2026,
    date: "2026-03-01",
    year: "2026",
    href: "https://readied.app",
    repo: "https://github.com/tomymaritano/readide",
    cover: undefined as string | undefined,
    loop: undefined as string | undefined,
    stills: [] as string[],
  },
  {
    kind: "work" as const,
    slug: "dolargaucho",
    title: "DolarGaucho",
    line: "Argentine macro, as a product.",
    started: 2025,
    date: "2025-08-01",
    year: "2025—",
    href: "https://dolargaucho.com",
    repo: null as string | null,
    cover: "/work/dolargaucho/cover.svg",
    loop: undefined as string | undefined,
    stills: ["/work/dolargaucho/01.svg", "/work/dolargaucho/02.svg", "/work/dolargaucho/03.svg"],
  },
  {
    kind: "work" as const,
    slug: "criterionx",
    title: "Criterion",
    line: "Deterministic, explainable decision engine.",
    started: 2025,
    date: "2025-12-29",
    year: "2025",
    href: "https://tomymaritano.github.io/criterionx/",
    repo: "https://github.com/tomymaritano/criterionx",
    cover: undefined as string | undefined,
    loop: undefined as string | undefined,
    stills: [] as string[],
  },
] as const;

export const writing = [
  {
    kind: "writing" as const,
    slug: "section-generation-pipeline",
    title: "How a report section is generated",
    line: "If gen and regen are two products, they drift.",
    started: 2026,
    date: "2026-08-16",
    year: "2026",
  },
  {
    kind: "writing" as const,
    slug: "claude-code-pm",
    title: "Claude Code: Why Even Bother as a PM?",
    line: "Shipping faster without waiting on a ticket.",
    started: 2025,
    date: "2025-10-03",
    year: "2025",
  },
  {
    kind: "writing" as const,
    slug: "threejs-sanity-integration",
    title: "Three.js + Sanity CMS",
    line: "3D scenes that stay editable.",
    started: 2025,
    date: "2025-07-04",
    year: "2025",
  },
  {
    kind: "writing" as const,
    slug: "cloudinary-migration",
    title: "Migrating Images to Cloudinary",
    line: "Repo size down 99.7%.",
    started: 2025,
    date: "2025-07-03",
    year: "2025",
  },
  {
    kind: "writing" as const,
    slug: "ai-business-validation",
    title: "How AI Helped Me Validate a Business Idea in One Week",
    line: "From vague idea to a plan you can test.",
    started: 2025,
    date: "2025-06-15",
    year: "2025",
  },
] as const;

export type WorkItem = (typeof work)[number];
export type WorkSlug = WorkItem["slug"];
export type WritingItem = (typeof writing)[number];
export type WritingSlug = WritingItem["slug"];
export type IndexItem = WorkItem | WritingItem;

export function workBySlug(slug: string): WorkItem | null {
  return work.find((item) => item.slug === slug) ?? null;
}

export function writingBySlug(slug: string): WritingItem | null {
  return writing.find((item) => item.slug === slug) ?? null;
}

export function itemPath(item: IndexItem) {
  return item.kind === "writing" ? `/writing/${item.slug}` : `/work/${item.slug}`;
}

function datedIndex<T extends IndexItem>(items: readonly T[]) {
  const sorted = [...items].sort((a, b) => b.date.localeCompare(a.date));
  let lastYear: number | null = null;
  return sorted.map((item) => {
    const showYear = item.started !== lastYear;
    lastYear = item.started;
    return { ...item, showYear, path: itemPath(item) };
  });
}

export function workIndex() {
  return datedIndex(work);
}

export function writingIndex() {
  return datedIndex(writing);
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
