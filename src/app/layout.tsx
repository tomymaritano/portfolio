import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { shell } from "@/components/page-frame";
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
      <body className="flex min-h-dvh flex-col bg-background text-foreground">
        <div className="site-atmosphere" aria-hidden />
        <div className="site-shell flex min-h-dvh flex-1 flex-col">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-background"
          >
            Skip to content
          </a>
          <SiteNav />
          <div className="flex flex-1 flex-col">{children}</div>
          <footer className={`${shell} mt-auto flex items-center justify-between py-10 text-[13px] text-muted`}>
            <a href={`mailto:${site.email}`} className="transition-colors duration-200 hover:text-accent">
              {site.email}
            </a>
            <a href="/colophon" className="transition-colors duration-200 hover:text-accent">
              Colophon
            </a>
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
