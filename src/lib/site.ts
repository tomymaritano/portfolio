export const site = {
  name: "Tomás Maritano",
  handle: "tomás",
  headline: "I ship products.",
  line: "I extract messy inputs into structured data, then generate the document someone will send.",
  city: "Buenos Aires",
  x: "https://x.com/tomymaritano",
  xHandle: "tomymaritano",
  email: "tomymaritano@gmail.com",
  github: "https://github.com/tomymaritano",
  linkedin: "https://www.linkedin.com/in/tomymaritano",
  photo: "/perfil.png",
  about: [
    "I take a messy input and produce a document a person will send — not a dump of the model. I'm a senior full-stack engineer at Psynth (sole lead on engineering). I joined as a design engineer.",
    "I was twelve, making brochure sites on a CMS. Client pages, not products. Buenos Aires. I studied at Universidad Tecnológica Nacional.",
    "Su Web Express hired me in 2017. Then Wolt in Copenhagen, Grandvalira in Andorra, Valere Realms, Unicoin in 2024. Frontend first, then the stack under it. I did not abandon the surface. I started owning what it sits on. I write when the decision is interesting.",
  ],
  contributions: [
    {
      href: "https://dripnex.app",
      title: "Dripnex",
      lead: "Built ",
      tail: ", an AI note taker. SQLite now — local today so the same notes can sync when other surfaces ship.",
    },
    {
      href: "https://psynth.ai",
      title: "Psynth",
      lead: "Senior full-stack engineer (sole lead) at ",
      tail: ". Test results and intake become a draft the psychologist reviews and signs. I joined as a design engineer.",
    },
    {
      href: "https://dolargaucho.com",
      title: "DolarGaucho",
      lead: "Built ",
      tail: ". Quotes and a model that reads the Argentine week, so someone can trust the strip and move on.",
    },
    {
      href: "https://readied.app",
      title: "Readied",
      lead: "Built ",
      tail: ", an offline-first Markdown editor. Notes stay as plain files on your machine. No proprietary format. No vendor holding the words.",
    },
    {
      href: "https://tomymaritano.github.io/criterionx/",
      title: "Criterion",
      lead: "Built ",
      tail: ", a deterministic decision engine. Same input, same output, and a reason you can show when someone asks why.",
    },
    {
      href: "https://react-cairn.vercel.app",
      title: "Cairn",
      lead: "Built ",
      tail: ", a state-machine workflow engine. You own the UI. Cairn owns the path, the branches, and the event stream.",
    },
  ],
  stack: [
    { label: "Cloud", items: ["AWS", "GCP", "Vercel", "Kubernetes", "Docker", "Terraform", "ArgoCD", "CodeArtifact"] },
    { label: "Frontend", items: ["TypeScript", "JavaScript", "React", "Next.js", "Svelte", "HTMX", "CSS", "Tailwind", "Three.js"] },
    { label: "Native", items: ["Swift", "React Native", "Electron"] },
    { label: "Backend", items: ["Python", "Node.js", "FastAPI", "Hono", "Express", "tRPC", "Go", "Rust"] },
    { label: "Data", items: ["PostgreSQL", "SQLite", "MongoDB", "Redis", "Prisma"] },
    { label: "Content", items: ["Sanity", "Cloudinary", "MDX"] },
    { label: "AI", items: ["Vertex AI", "Bedrock", "Anthropic", "LLM orchestration", "PyTorch", "Reinforcement learning"] },
    { label: "Keyboards", items: ["QMK", "ZMK", "Lua", "C#"] },
  ],
} as const;

export const work = [
  {
    kind: "work" as const,
    slug: "devwifi",
    title: "DevWifiBar",
    line: "Menu bar radar for AI traffic. Nothing inside TLS.",
    started: 2026,
    date: "2026-08-20",
    year: "2026—",
    href: null as string | null,
    repo: "https://github.com/tomymaritano/devwibar",
    cover: "/work/devwifi/cover.svg",
    loop: undefined as string | undefined,
    stills: ["/work/devwifi/radar.svg"],
  },
  {
    kind: "work" as const,
    slug: "dripnex",
    title: "Dripnex",
    line: "AI note taker. SQLite now, sync next.",
    started: 2026,
    date: "2026-08-18",
    year: "2026—",
    href: "https://dripnex.app",
    repo: "https://github.com/dripnex/readide",
    cover: "/work/dripnex/cover.svg",
    loop: undefined as string | undefined,
    stills: ["/work/dripnex/01.svg", "/work/dripnex/02.svg", "/work/dripnex/03.svg"],
  },
  {
    kind: "work" as const,
    slug: "psynth",
    title: "Psynth",
    line: "Clinical reporting. Senior full-stack / sole lead.",
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
    slug: "quantis-intel",
    title: "Quantis-intel",
    line: "The financial report a desk will send.",
    started: 2026,
    date: "2026-07-15",
    year: "2026",
    href: null as string | null,
    repo: null as string | null,
    cover: "/work/quantis-intel/cover.svg",
    loop: undefined as string | undefined,
    stills: ["/work/quantis-intel/cover.svg"],
  },
  {
    kind: "work" as const,
    slug: "cairn",
    title: "Cairn",
    line: "Onboarding as a state machine, not a tooltip list.",
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
    line: "Notes as plain files on your machine.",
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
    line: "Quotes and a model that reads the Argentine week.",
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
    line: "Same input, same output, and a reason.",
    started: 2025,
    date: "2025-12-29",
    year: "2025",
    href: "https://tomymaritano.github.io/criterionx/",
    repo: "https://github.com/tomymaritano/criterionx",
    cover: undefined as string | undefined,
    loop: undefined as string | undefined,
    stills: [] as string[],
  },
  {
    kind: "work" as const,
    slug: "unicoin",
    title: "Unicoin",
    line: "Crypto with a real-asset story.",
    started: 2024,
    date: "2024-06-01",
    year: "2024",
    href: "https://unicoin.com/",
    repo: null as string | null,
    cover: "/work/unicoin/cover.png",
    loop: undefined as string | undefined,
    stills: ["/work/unicoin/cover.png"],
  },
  {
    kind: "work" as const,
    slug: "unicorn-hunters",
    title: "Unicorn Hunters",
    line: "A TV show that can take the check.",
    started: 2024,
    date: "2024-05-01",
    year: "2024",
    href: "https://unicornhunters.com/",
    repo: null as string | null,
    cover: "/work/unicorn-hunters/cover.png",
    loop: undefined as string | undefined,
    stills: ["/work/unicorn-hunters/cover.png"],
  },
  {
    kind: "work" as const,
    slug: "silvina-moschini",
    title: "Silvina Moschini",
    line: "Lead with the talk, not the bio.",
    started: 2024,
    date: "2024-04-01",
    year: "2024",
    href: "https://silvinamoschini.com/",
    repo: null as string | null,
    cover: "/work/silvina-moschini/cover.gif",
    loop: undefined as string | undefined,
    stills: ["/work/silvina-moschini/cover.gif"],
  },
  {
    kind: "work" as const,
    slug: "billspace",
    title: "BillSpace",
    line: "Cancel one Dutch bill without a local friend.",
    started: 2025,
    date: "2025-05-01",
    year: "2025",
    href: "https://www.billspace.eu/",
    repo: null as string | null,
    cover: "/work/billspace/cover.jpg",
    loop: undefined as string | undefined,
    stills: ["/work/billspace/cover.jpg"],
  },
  {
    kind: "work" as const,
    slug: "heirloom",
    title: "Heirloom",
    line: "Life notes without the feed.",
    started: 2025,
    date: "2025-04-01",
    year: "2025",
    href: "https://getheirloom.app/",
    repo: null as string | null,
    cover: "/work/heirloom/cover.png",
    loop: undefined as string | undefined,
    stills: ["/work/heirloom/cover.png"],
  },
  {
    kind: "work" as const,
    slug: "jetsetz",
    title: "Jetsetz",
    line: "Show the deal, not fifteen filters.",
    started: 2025,
    date: "2025-03-01",
    year: "2025",
    href: "https://jetsetz.com/",
    repo: null as string | null,
    cover: "/work/jetsetz/cover.png",
    loop: undefined as string | undefined,
    stills: ["/work/jetsetz/cover.png"],
  },
  {
    kind: "work" as const,
    slug: "lego-store",
    title: "LEGO Store",
    line: "An e-commerce template you can resell.",
    started: 2025,
    date: "2025-12-09",
    year: "2025",
    href: "https://lego-ecommerce-five.vercel.app/",
    repo: "https://github.com/tomymaritano/lego-store",
    cover: "/work/lego-store/cover.png",
    loop: undefined as string | undefined,
    stills: ["/work/lego-store/cover.png"],
  },
  {
    kind: "work" as const,
    slug: "turbotime",
    title: "TurboTime",
    line: "Name the jobs Excel was actually doing.",
    started: 2025,
    date: "2025-02-01",
    year: "2025",
    href: "https://www.figma.com/make/RmxLXzGCZMOamKV3ps8yeL/TurboTime.ai-design-prototype",
    repo: null as string | null,
    cover: "/work/turbotime/cover.gif",
    loop: undefined as string | undefined,
    stills: ["/work/turbotime/cover.gif"],
  },
  {
    kind: "work" as const,
    slug: "viny",
    title: "Viny",
    line: "The file is the source of truth.",
    started: 2025,
    date: "2025-01-15",
    year: "2025",
    href: null as string | null,
    repo: "https://github.com/tomymaritano/viny",
    cover: "/work/viny/cover.png",
    loop: undefined as string | undefined,
    stills: ["/work/viny/cover.png"],
  },
  {
    kind: "work" as const,
    slug: "menkiki",
    title: "Menkiki",
    line: "Scan food, find a place nearby.",
    started: 2025,
    date: "2025-01-01",
    year: "2025",
    href: null as string | null,
    repo: "https://github.com/tomymaritano/menkiki",
    cover: "/work/menkiki/cover.png",
    loop: undefined as string | undefined,
    stills: ["/work/menkiki/cover.png"],
  },
  {
    kind: "work" as const,
    slug: "freedom-people",
    title: "The Freedom People",
    line: "Checkout that feels like Lightning, not a bank.",
    started: 2023,
    date: "2023-08-01",
    year: "2023",
    href: "https://thefreedompeople.org/",
    repo: null as string | null,
    cover: "/work/freedom-people/cover.png",
    loop: undefined as string | undefined,
    stills: ["/work/freedom-people/cover.png"],
  },
  {
    kind: "work" as const,
    slug: "blacro",
    title: "Blacro Studio",
    line: "Creative agency site that is the proof.",
    started: 2023,
    date: "2023-06-01",
    year: "2023",
    href: "https://blacro.com/",
    repo: null as string | null,
    cover: "/work/blacro/cover.png",
    loop: undefined as string | undefined,
    stills: ["/work/blacro/cover.png"],
  },
  {
    kind: "work" as const,
    slug: "isolla",
    title: "Isolla",
    line: "Furniture, shown at the scale of the piece.",
    started: 2023,
    date: "2023-04-01",
    year: "2023",
    href: "https://isolla.co/",
    repo: null as string | null,
    cover: "/work/isolla/cover.png",
    loop: undefined as string | undefined,
    stills: ["/work/isolla/cover.png"],
  },
  {
    kind: "work" as const,
    slug: "g1m",
    title: "G1M",
    line: "Local checkout, not a US template.",
    started: 2023,
    date: "2023-03-01",
    year: "2023",
    href: "https://www.g1m.com.ar/",
    repo: null as string | null,
    cover: "/work/g1m/cover.png",
    loop: undefined as string | undefined,
    stills: ["/work/g1m/cover.png"],
  },
  {
    kind: "work" as const,
    slug: "privatelimo",
    title: "Private Limo",
    line: "WhatsApp is the checkout.",
    started: 2023,
    date: "2023-02-01",
    year: "2023",
    href: "https://privatelimo.com.ar/es",
    repo: null as string | null,
    cover: "/work/privatelimo/cover.png",
    loop: undefined as string | undefined,
    stills: ["/work/privatelimo/cover.png"],
  },
  {
    kind: "work" as const,
    slug: "grandvalira-sede",
    title: "Grandvalira Sede",
    line: "Roles in the token, checked on every write.",
    started: 2022,
    date: "2022-06-01",
    year: "2022",
    href: null as string | null,
    repo: null as string | null,
    cover: "/work/grandvalira-sede/cover.png",
    loop: undefined as string | undefined,
    stills: ["/work/grandvalira-sede/cover.png"],
  },
] as const;

export const writing = [
  {
    kind: "writing" as const,
    slug: "the-note-came-first",
    title: "The note came first. The names came in one night",
    line: "I named the jobs in the order the surfaces split.",
    started: 2026,
    date: "2026-08-22",
    year: "2026",
  },
  {
    kind: "writing" as const,
    slug: "grok-bot-and-cursor",
    title: "Grok 4.6 in Cursor is not Grok Bot",
    line: "One loop lives in the repo. The other has a computer.",
    started: 2026,
    date: "2026-08-20",
    year: "2026",
  },
  {
    kind: "writing" as const,
    slug: "corne-keyboard",
    title: "A Corne is a 42-key contract",
    line: "Layers are the product. The PCB is just the case.",
    started: 2026,
    date: "2026-08-20",
    year: "2026",
  },
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
    title: "Claude Code is not a ticket translator",
    line: "Prototype the spec before you file it.",
    started: 2025,
    date: "2025-10-03",
    year: "2025",
  },
  {
    kind: "writing" as const,
    slug: "threejs-sanity-integration",
    title: "The canvas does not wait on Sanity",
    line: "Fetch first. Then mount WebGL.",
    started: 2025,
    date: "2025-07-04",
    year: "2025",
  },
  {
    kind: "writing" as const,
    slug: "cloudinary-migration",
    title: "Binaries do not belong in git",
    line: "450MB became 1.2MB. The hour was the cheap part.",
    started: 2025,
    date: "2025-07-03",
    year: "2025",
  },
  {
    kind: "writing" as const,
    slug: "ai-business-validation",
    title: "The model did not replace the calls",
    line: "A week of interviews, not a month of nights.",
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
export type WorkLane = "product" | "role" | "client";

export const workLanes = {
  devwifi: "product",
  dripnex: "product",
  psynth: "product",
  "quantis-intel": "product",
  cairn: "product",
  readied: "product",
  dolargaucho: "product",
  criterionx: "product",
  unicoin: "role",
  "unicorn-hunters": "client",
  "silvina-moschini": "client",
  billspace: "client",
  heirloom: "product",
  jetsetz: "client",
  "lego-store": "product",
  turbotime: "product",
  viny: "product",
  menkiki: "product",
  "freedom-people": "client",
  blacro: "product",
  isolla: "client",
  g1m: "client",
  privatelimo: "client",
  "grandvalira-sede": "role",
} as const satisfies Record<WorkSlug, WorkLane>;

export const workLaneLabel: Record<WorkLane, string> = {
  product: "Product",
  role: "Role",
  client: "Client",
};

export const workNotes = {
  psynth: "section-generation-pipeline",
} as const satisfies Partial<Record<WorkSlug, WritingSlug>>;

export function workLane(slug: WorkSlug): WorkLane {
  return workLanes[slug];
}

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

export const homeSlugs = ["psynth", "dripnex", "dolargaucho", "quantis-intel"] as const;

export type HomeSlug = (typeof homeSlugs)[number];

export const homeMeta = {
  psynth: { tag: "Clinical reporting", role: "Senior Full Stack Engineer" },
  dripnex: { tag: "AI notes" },
  dolargaucho: { tag: "AI finance" },
  "quantis-intel": { tag: "Financial reporting" },
} as const;

export function isHomeSlug(slug: string): slug is HomeSlug {
  return (homeSlugs as readonly string[]).includes(slug);
}

export function homeWork() {
  return homeSlugs.map((slug) => workBySlug(slug)).filter((item): item is WorkItem => item !== null);
}

export function workIndex() {
  return datedIndex(work);
}

export function workSections() {
  const lanes: WorkLane[] = ["product", "role", "client"];
  const titles: Record<WorkLane, string> = {
    product: "Products",
    role: "Roles",
    client: "Clients",
  };
  return lanes
    .map((lane) => ({
      lane,
      title: titles[lane],
      items: datedIndex(work.filter((item) => workLanes[item.slug] === lane && !isHomeSlug(item.slug))),
    }))
    .filter((section) => section.items.length > 0);
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
