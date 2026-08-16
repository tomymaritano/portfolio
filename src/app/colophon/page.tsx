import { PageTransition } from "@/components/page-transition";
import { site } from "@/lib/site";

export const metadata = { title: `Colophon — ${site.name}` };

export default function ColophonPage() {
  return (
    <PageTransition>
    <main id="main" className="mx-auto max-w-2xl px-5 py-16">
      <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">Colophon</p>
      <h1 className="mt-2 text-3xl font-medium tracking-tight">How this is made.</h1>
      <p className="mt-6 text-[15px] leading-7 text-muted">
        Next.js, Tailwind, MDX in git. No CMS and no admin. A case is a file and a folder of
        stills. Hosted on Vercel. The product tiles on the home page are scripted reconstructions
        — they do not load production apps. Navigation uses the View Transitions API; scroll
        uses CSS <code>animation-timeline: view()</code>.
      </p>
    </main>
    </PageTransition>
  );
}
