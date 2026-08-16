import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteNav } from "@/components/site-nav";
import { site } from "@/lib/site";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: site.name,
  description: site.line,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="min-h-dvh bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-background"
        >
          Skip to content
        </a>
        <SiteNav />
        {children}
        <footer className="mx-auto flex max-w-5xl items-center justify-between px-5 py-8 text-[13px] text-muted">
          <a href={`mailto:${site.email}`} className="hover:text-foreground">
            {site.email}
          </a>
          <a href="/colophon" className="hover:text-foreground">
            Colophon
          </a>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
