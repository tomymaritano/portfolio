import Link from "next/link";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { shell } from "@/components/page-frame";
import { site } from "@/lib/site";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-20 bg-background/90 backdrop-blur-md" style={{ viewTransitionName: "site-header" }}>
      <div className={`${shell} flex h-16 items-center justify-between`}>
        <Link href="/" className="text-[14px] font-semibold tracking-tight sm:text-[15px]">
          <span className="sm:hidden">{site.handle}</span>
          <span className="hidden sm:inline">{site.name}</span>
        </Link>
        <nav aria-label="Site" className="flex items-center gap-3 text-[12px] text-muted sm:gap-5 sm:text-[13px]">
          <Link href="/about" transitionTypes={["nav-forward"]} className="hover:text-foreground">
            About
          </Link>
          <Link href="/writing" transitionTypes={["nav-forward"]} className="hover:text-foreground">
            Writing
          </Link>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted hover:text-foreground"
          >
            <FaGithub size={15} aria-hidden />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted hover:text-foreground"
          >
            <FaLinkedin size={15} aria-hidden />
          </a>
          <a
            href={site.x}
            target="_blank"
            rel="noreferrer"
            aria-label="Follow on X"
            className="text-muted hover:text-foreground"
          >
            <FaXTwitter size={14} aria-hidden />
          </a>
        </nav>
      </div>
    </header>
  );
}
