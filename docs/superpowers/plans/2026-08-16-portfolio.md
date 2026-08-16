# Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a static Next.js portfolio: x.ai-style home (thesis + Follow X + two product tiles) and MDX case pages for Psynth and DolarGaucho.

**Architecture:** No database, no CMS. `src/lib/site.ts` is the index. `content/work/*.mdx` holds narratives. Home tiles wrap scripted UI loops or mute video with a still fallback. All routes are App Router server components except the loops.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS v4, Geist, MDX (`@next/mdx`), Vitest, Vercel Analytics.

---

## File map

| Path | Responsibility |
|---|---|
| `src/lib/site.ts` | Name, X, email, work index |
| `src/lib/site.test.ts` | Index completeness |
| `content/work/psynth.mdx` | Psynth case |
| `content/work/dolargaucho.mdx` | DolarGaucho case |
| `src/mdx-components.tsx` | MDX element map |
| `src/app/layout.tsx` | Geist, skip link, nav, footer |
| `src/app/globals.css` | Tokens, dark field |
| `src/app/page.tsx` | Hero + bento |
| `src/app/work/[slug]/page.tsx` | Case layout |
| `src/app/colophon/page.tsx` | Stack note |
| `src/components/site-nav.tsx` | Nav |
| `src/components/product-tile.tsx` | Card chrome + Explore |
| `src/components/loops/psynth-loop.tsx` | Scripted product chrome |
| `src/components/loops/dolargaucho-loop.tsx` | Scripted macro UI |
| `src/components/mute-media.tsx` | Video or cover, reduced motion |
| `public/work/{slug}/cover.svg` | Still fallback (no PHI) |

---

### Task 1: Scaffold Next + Tailwind + Geist

- [ ] In `/Users/tomasmartiano/Documents/tomy-portfolio`, run `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-turbopack` only if `package.json` is missing; if the folder already has the spec, init with `--yes` flags so it does not wipe `docs/`. Prefer manual `package.json` + `npx next` files if create-next-app refuses a non-empty dir.
- [ ] Keep `docs/superpowers/**` and `.gitignore`.
- [ ] Add `@vercel/analytics`, `vitest`.
- [ ] Commit: `Scaffold Next portfolio`

### Task 2: `site.ts` + test

- [ ] Create `src/lib/site.ts` with:

```ts
export const site = {
  name: "Tomás Maritano",
  handle: "tomás",
  line: "Product engineer. I build software and write about the decisions behind it.",
  city: "Buenos Aires",
  x: "https://x.com/tomymaritano",
  email: "tomymaritano@gmail.com",
} as const;

export const work = [
  {
    slug: "psynth",
    title: "Psynth",
    line: "Clinical product, end to end.",
    year: "2024—",
    href: "https://psynth.ai",
    cover: "/work/psynth/cover.svg",
  },
  {
    slug: "dolargaucho",
    title: "DolarGaucho",
    line: "Argentine macro, as a product.",
    year: "2025—",
    href: null,
    cover: "/work/dolargaucho/cover.svg",
  },
] as const;

export type WorkSlug = (typeof work)[number]["slug"];

export function workBySlug(slug: string) {
  return work.find((item) => item.slug === slug) ?? null;
}
```

- [ ] Test: both slugs present, X is https, email contains `@`.
- [ ] Commit: `Add site config and work index`

### Task 3: Shell — tokens, nav, layout

- [ ] Dark zinc tokens, Geist + Geist Mono.
- [ ] Skip link `#main`. `SiteNav`: name → `/`, Work → `/#work`, X (external, `rel="noreferrer"`).
- [ ] Footer: email as `mailto:`, link to `/colophon`.
- [ ] Commit: `Add site shell and nav`

### Task 4: Home hero + tiles (stills)

- [ ] Centered H1 “I ship products.” + `site.line` + button Follow on X.
- [ ] `#work` bento: two `ProductTile`s linking to `/work/{slug}`, cover image, name, Explore →.
- [ ] Commit: `Add home hero and work tiles`

### Task 5: MDX cases

- [ ] Wire `@next/mdx`.
- [ ] `content/work/*.mdx` with frontmatter matching `site.ts`.
- [ ] Copy: no invented metrics, no PHI. Psynth = systems/craft. DolarGaucho = product + domain.
- [ ] `src/app/work/[slug]/page.tsx` generates static params from `work`. Unknown slug → `notFound()`.
- [ ] Commit: `Add MDX case pages`

### Task 6: Scripted loops

- [ ] `PsynthLoop`: fake sidebar + report list, cycling status, no names/PHI.
- [ ] `DolarGauchoLoop`: fake quote strip + sparkline ticking.
- [ ] Reduced motion: show cover only.
- [ ] Commit: `Add product tile loops`

### Task 7: Colophon + analytics + smoke

- [ ] `/colophon` states Next, MDX, no CMS.
- [ ] `<Analytics />` in root layout.
- [ ] `npm test` green. `curl` local `/`, `/work/psynth`, `/work/dolargaucho`, `/colophon` = 200.
- [ ] Commit: `Add colophon, analytics, and smoke`

## Spec coverage

| Spec | Task |
|---|---|
| Follow X primary | 4 |
| Two tiles, Explore | 4 |
| `/work/psynth`, `/work/dolargaucho` | 5 |
| `/colophon` | 7 |
| MDX files, no admin | 5 |
| Scripted loops, mute, reduced motion | 6 |
| site.ts single config | 2 |
| No PHI | 5, 6 |
| 404 unknown slug | 5 |
| Analytics | 7 |
