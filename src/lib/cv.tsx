import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import { catalogSite, catalogWork } from "@/lib/catalog";

type CvItem = {
  slug: string;
  org: string;
  role: string;
  period: string;
  summary: string;
  href?: string | null;
};

const experience: CvItem[] = [
  {
    slug: "psynth",
    org: "Psynth",
    role: "Head of Engineering",
    period: "2026 — Present",
    summary:
      "Lead engineering for a clinical reporting product. Test results and intake become a structured draft for psychologist review and signature.",
    href: "https://psynth.ai",
  },
  {
    slug: "unicoin",
    org: "Unicoin",
    role: "Engineer",
    period: "2024",
    summary: "Product engineering on a cryptocurrency platform.",
    href: "https://www.unicoin.com",
  },
  {
    slug: "grandvalira-sede",
    org: "Grandvalira",
    role: "Full-stack engineer",
    period: "2022",
    summary: "Internal directory: Next.js, Express, Prisma, and JWT role-based access on every write.",
  },
  {
    slug: "earlier",
    org: "Wolt · Valere Realms · Su Web Express",
    role: "Engineering",
    period: "2017 — 2024",
    summary: "Frontend first, then the systems underneath. Copenhagen, Andorra, and Buenos Aires.",
  },
];

const products: CvItem[] = [
  {
    slug: "dripnex",
    org: "Dripnex",
    role: "Founder",
    period: "2026 — Present",
    summary: "AI note-taking product. Local SQLite today; designed so the same notes can sync when other surfaces ship.",
    href: "https://dripnex.app",
  },
  {
    slug: "dolargaucho",
    org: "DolarGaucho",
    role: "Founder",
    period: "2025 — Present",
    summary: "Argentine FX quotes and a weekly macro briefing.",
    href: "https://dolargaucho.com",
  },
  {
    slug: "quantis-intel",
    org: "Quantis-intel",
    role: "Founder",
    period: "2026",
    summary: "Financial reporting system that turns structured inputs into a finished report.",
    href: null,
  },
  {
    slug: "cairn",
    org: "Cairn",
    role: "Author",
    period: "2026",
    summary: "State-machine workflow engine for onboarding paths and event streams.",
    href: "https://react-cairn.vercel.app",
  },
  {
    slug: "readied",
    org: "Readied",
    role: "Author",
    period: "2026",
    summary: "Offline-first Markdown editor. Notes remain plain files on the machine.",
    href: "https://readied.app",
  },
  {
    slug: "criterionx",
    org: "Criterion",
    role: "Author",
    period: "2025",
    summary: "Deterministic decision engine with schemas and an audit trail.",
    href: "https://tomymaritano.github.io/criterionx/",
  },
];

const clients: { org: string; period: string; summary: string }[] = [
  { org: "Unicorn Hunters", period: "2024", summary: "Product engineering for the investment show platform." },
  { org: "Silvina Moschini", period: "2024", summary: "Personal site and talk-led presence." },
  { org: "BillSpace", period: "2025", summary: "Consumer flow for cancelling Dutch household bills." },
  { org: "Jetsetz", period: "2025", summary: "Deal discovery interface." },
  { org: "The Freedom People", period: "2023", summary: "Lightning Network checkout." },
  { org: "Isolla", period: "2023", summary: "Furniture storefront, Next.js." },
  { org: "G1M", period: "2023", summary: "Localized e-commerce checkout." },
  { org: "Private Limo", period: "2023", summary: "Booking flow over WhatsApp." },
];

function host(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function cvData() {
  const listed = catalogSite();
  const work = catalogWork();
  const hrefFor = (slug: string) => work.find((item) => item.slug === slug)?.href ?? null;

  return {
    name: listed.name,
    title: "Head of Engineering",
    city: listed.city,
    email: listed.email,
    linkedin: listed.linkedin,
    github: listed.github,
    summary:
      "Software engineer and engineering lead. I build product systems across frontend, backend, and AI-assisted document generation. Currently Head of Engineering at Psynth. Based in Buenos Aires. Studied at Universidad Tecnológica Nacional.",
    experience: experience.map((item) => ({
      ...item,
      href: item.slug === "earlier" ? null : hrefFor(item.slug) ?? item.href ?? null,
    })),
    products: products.map((item) => ({
      ...item,
      href: hrefFor(item.slug),
    })),
    clients,
    stack: listed.stack.filter((row) => row.label !== "Keyboards"),
    education: {
      school: "Universidad Tecnológica Nacional",
      place: "Buenos Aires, Argentina",
    },
  };
}

export type CvData = ReturnType<typeof cvData>;

const ink = "#1a1a1a";
const mute = "#5c5c5c";
const rule = "#d6d6d6";

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 44,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: ink,
    backgroundColor: "#ffffff",
  },
  header: { marginBottom: 14 },
  name: { fontSize: 18, fontFamily: "Helvetica-Bold", letterSpacing: 0.2 },
  role: { fontSize: 11, color: mute, marginTop: 3 },
  contact: { fontSize: 8.5, color: mute, marginTop: 8 },
  link: { color: ink, textDecoration: "none" },
  rule: { borderBottomWidth: 0.6, borderBottomColor: rule, marginVertical: 10 },
  heading: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: ink,
    marginBottom: 7,
    marginTop: 2,
  },
  summary: { fontSize: 9.5, lineHeight: 1.45, color: ink, marginBottom: 4 },
  row: { marginBottom: 8 },
  rowHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  org: { fontFamily: "Helvetica-Bold", fontSize: 10 },
  roleLine: { fontSize: 9, color: mute, marginTop: 1 },
  period: { fontSize: 8.5, color: mute },
  body: { fontSize: 9, lineHeight: 1.4, color: ink, marginTop: 2 },
  clientGrid: { flexDirection: "row", flexWrap: "wrap" },
  client: { width: "50%", paddingRight: 10, marginBottom: 6 },
  stack: { marginBottom: 3, fontSize: 9 },
  stackLabel: { fontFamily: "Helvetica-Bold" },
  stackItems: { color: mute },
});

function Contact({ data }: { data: CvData }) {
  return (
    <Text style={styles.contact}>
      {data.city}
      {"   "}
      <Link src={`mailto:${data.email}`} style={styles.link}>
        {data.email}
      </Link>
      {"   "}
      <Link src={data.linkedin} style={styles.link}>
        {host(data.linkedin)}
      </Link>
      {"   "}
      <Link src={data.github} style={styles.link}>
        {host(data.github)}
      </Link>
    </Text>
  );
}

function Job({ item }: { item: { org: string; role: string; period: string; summary: string; href?: string | null } }) {
  return (
    <View style={styles.row} wrap={false}>
      <View style={styles.rowHead}>
        <Text style={styles.org}>{item.org}</Text>
        <Text style={styles.period}>{item.period}</Text>
      </View>
      <Text style={styles.roleLine}>{item.role}</Text>
      <Text style={styles.body}>{item.summary}</Text>
    </View>
  );
}

export function CvDocument({ data }: { data: CvData }) {
  return (
    <Document title={`${data.name} — Curriculum Vitae`} author={data.name}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.role}>{data.title}</Text>
          <Contact data={data} />
        </View>

        <View style={styles.rule} />
        <Text style={styles.heading}>Summary</Text>
        <Text style={styles.summary}>{data.summary}</Text>

        <View style={styles.rule} />
        <Text style={styles.heading}>Experience</Text>
        {data.experience.map((item) => (
          <Job key={item.org} item={item} />
        ))}

        <View style={styles.rule} />
        <Text style={styles.heading}>Selected products</Text>
        {data.products.map((item) => (
          <Job key={item.org} item={item} />
        ))}

        <View style={styles.rule} />
        <Text style={styles.heading}>Selected clients</Text>
        <View style={styles.clientGrid}>
          {data.clients.map((item) => (
            <View key={item.org} style={styles.client} wrap={false}>
              <View style={styles.rowHead}>
                <Text style={styles.org}>{item.org}</Text>
                <Text style={styles.period}>{item.period}</Text>
              </View>
              <Text style={styles.body}>{item.summary}</Text>
            </View>
          ))}
        </View>

        <View style={styles.rule} />
        <Text style={styles.heading}>Technical skills</Text>
        {data.stack.map((row) => (
          <Text key={row.label} style={styles.stack}>
            <Text style={styles.stackLabel}>{row.label}  </Text>
            <Text style={styles.stackItems}>{row.items.join(" · ")}</Text>
          </Text>
        ))}

        <View style={styles.rule} />
        <Text style={styles.heading}>Education</Text>
        <View style={styles.rowHead}>
          <Text style={styles.org}>{data.education.school}</Text>
          <Text style={styles.period}>{data.education.place}</Text>
        </View>
      </Page>
    </Document>
  );
}
