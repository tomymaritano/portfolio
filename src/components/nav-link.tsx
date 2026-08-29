"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HoverMorphIcon } from "@/components/hover-morph-icon";
import { navMarks } from "@/components/nav-icons";

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      transitionTypes={["nav-forward"]}
      className={`relative inline-flex items-center pb-0.5 transition-colors duration-200 ${
        active
          ? "text-foreground after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:bg-foreground/40"
          : "hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}

export function SocialLink({
  href,
  label,
  mark,
  named = false,
}: {
  href: string;
  label: string;
  mark: Exclude<keyof typeof navMarks, "menu">;
  named?: boolean;
}) {
  const icons = navMarks[mark];
  const [over, setOver] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={named ? undefined : label}
      className={`inline-flex text-muted transition-colors duration-200 hover:text-foreground ${
        named ? "items-center gap-2" : "size-11 items-center justify-center"
      }`}
      onPointerEnter={() => setOver(true)}
      onPointerLeave={() => setOver(false)}
    >
      <HoverMorphIcon rest={icons.rest} hover={icons.hover} over={over} />
      {named ? <span>{label}</span> : null}
    </a>
  );
}
