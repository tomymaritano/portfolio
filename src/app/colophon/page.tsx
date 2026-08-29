import { PageFrame } from "@/components/page-frame";
import { PageTransition } from "@/components/page-transition";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata = {
  title: `Colophon — ${site.name}`,
  description: "How this site is made.",
  alternates: { canonical: "/colophon" },
};

export default function ColophonPage() {
  return (
    <PageTransition>
      <PageFrame className="pt-10 pb-24">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">Colophon</p>
          <h1 className="mt-2 text-[2rem] leading-tight font-semibold tracking-tight">How this is made.</h1>
          <p className="prose-work mt-6 text-[16px] leading-7 text-foreground/85">
            A case is a file and a folder of stills. Next.js, Tailwind, MDX in git. No CMS. No admin.
            Drafts arrive as pull requests from <code>/api/content</code>. The CV at{" "}
            <code>/cv.pdf</code> is generated from the same catalog. Hosted on Vercel. Navigation
            uses the View Transitions API. On a case or a note, <code>[</code> is older and{" "}
            <code>]</code> is newer. A mint hairline tracks how far you have read. Lists,
            archive scroll, the mobile menu, diagrams, selected-work hover, and tile loops use
            GSAP. Nav
            morphicons follow the same{" "}
            <code>prefers-reduced-motion</code> preference.
          </p>
        </Reveal>
      </PageFrame>
    </PageTransition>
  );
}
