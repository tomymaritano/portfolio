import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";
import { NavLink, SocialLink } from "@/components/nav-link";
import { shell } from "@/components/page-frame";
import { site } from "@/lib/site";

export function SiteNav() {
  return (
    <header
      className="site-header relative sticky top-0 border-b border-white/5 bg-background/70 backdrop-blur-xl"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className={`${shell} flex h-16 items-center justify-between`}>
        <Link href="/" className="text-[14px] font-semibold tracking-tight transition-colors duration-200 hover:text-foreground sm:text-[15px]">
          <span className="sm:hidden">{site.handle}</span>
          <span className="hidden sm:inline">{site.name}</span>
        </Link>
        <nav aria-label="Site" className="hidden items-center gap-5 text-[13px] text-muted md:flex">
          <NavLink href="/work">Work</NavLink>
          <NavLink href="/writing">Writing</NavLink>
          <SocialLink href={site.github} label="GitHub" mark="github" />
          <SocialLink href={site.linkedin} label="LinkedIn" mark="linkedin" />
          <SocialLink href={site.x} label="Follow on X" mark="x" />
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
