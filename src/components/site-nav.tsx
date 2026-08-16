import Link from "next/link";
import { site } from "@/lib/site";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-5">
        <Link href="/" className="text-[13px] tracking-tight">
          {site.handle}
        </Link>
        <nav aria-label="Site" className="flex items-center gap-5 text-[13px] text-muted">
          <a href="/#work" className="hover:text-foreground">
            work
          </a>
          <a href={site.x} target="_blank" rel="noreferrer" className="hover:text-foreground">
            x
          </a>
        </nav>
      </div>
    </header>
  );
}
