import { PageFrame } from "@/components/page-frame";
import { PageTransition } from "@/components/page-transition";
import { site } from "@/lib/site";

export const metadata = { title: `Colophon — ${site.name}` };

export default function ColophonPage() {
  return (
    <PageTransition>
      <PageFrame>
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">Colophon</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">How this is made.</h1>
        <p className="mt-6 text-[16px] leading-7 text-foreground/85">
          A case is a file and a folder of stills. Next.js, Tailwind, MDX in git. No CMS. No admin.
          Drafts arrive as pull requests from <code>/api/content</code>. The CV at{" "}
          <code>/cv.pdf</code> is generated from the same catalog. Hosted on Vercel. Navigation
          uses the View Transitions API; scroll uses CSS <code>animation-timeline: view()</code>.
        </p>
      </PageFrame>
    </PageTransition>
  );
}
