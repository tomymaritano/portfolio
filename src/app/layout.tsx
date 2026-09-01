import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { shell } from "@/components/page-frame";
import { SiteNav } from "@/components/site-nav";
import { site } from "@/lib/site";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
  description: site.line,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.name,
    description: site.line,
    url: "/",
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    creator: `@${site.xHandle}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: site.email,
  image: `${site.url}${site.photo}`,
  jobTitle: "Lead Engineer",
  sameAs: [site.x, site.github, site.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressCountry: "AR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="min-h-dvh bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <div className="site-atmosphere" aria-hidden />
        <div className="site-shell">
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <SiteNav />
          <div>{children}</div>
          <footer className={`${shell} flex items-center justify-between py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] text-[13px] text-muted`}>
            <a href={`mailto:${site.email}`} className="transition-colors duration-200 hover:text-accent">
              {site.email}
            </a>
            <Link href="/colophon" transitionTypes={["nav-forward"]} className="transition-colors duration-200 hover:text-accent">
              Colophon
            </Link>
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
