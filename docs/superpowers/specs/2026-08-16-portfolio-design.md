# Portfolio — Tomás Maritano

Date: 2026-08-16  
Repo: [tomymaritano/portfolio](https://github.com/tomymaritano/portfolio.git)  
Status: draft for review (not implemented)

## Intent

A long-lived personal site that sells Tomás as a **founder-operator** (Psynth) who also builds in public — closer to rauchg.com + the x.ai product bento than to a résumé.

Primary visitor: **founders**.  
Primary action: **follow on X**.  
Proof: **two case studies**, shown as the product itself (multimedia tiles), not as a GitHub dump.

Out of v1: admin/CMS, blog, contact form, Google Auth, job-application layout, cinematic stock/hero mood.

## Positioning

| Decision | Choice |
|---|---|
| Buyer | Founders + personal brand (not hiring-manager CV) |
| Conversion | Follow X |
| Work on the spine | Psynth, DolarGaucho |
| Case shape | Cards on home → one page each |
| Persistence | Files in git (MDX). No admin panel |
| Look | Vercel product chrome + SpaceX restraint; x.ai *grammar* for product tiles |

Psynth is written as systems and craft. **No PHI, no patient data, no internal clinical screens that identify people.** Prefer product chrome, empty states, and abstracted UI.

## Information architecture

| Route | Role |
|---|---|
| `/` | One-line identity. Follow X. Two product tiles. Email as plain text in the footer, not a form. |
| `/work/psynth` | Case: problem → what shipped → one hard decision → media. 4–8 minutes. |
| `/work/dolargaucho` | Same shape, more concrete (product, data, UI). |
| `/colophon` | How the site is built (stack, MDX, no CMS). One screen. |

No `/blog` in v1. X is the feed.

## Home (x.ai grammar)

The x.ai homepage does three things. This site copies the **grammar**, not the five Grok products.

1. **Centered thesis** — one H1, one supporting line, one primary CTA (Follow on X). Optional quiet text link to email.
2. **Product bento** — two large tiles (not five). Each tile *is* the product looping. Name bottom-left, `Explore →` bottom-right. No marketing paragraph on the card.
3. **Nothing else above the fold.** Colophon and email live in a thin footer.

Tile contract (same as x.ai Chat/Build/Imagine):

- Dark rounded surface, hairline border.
- Content is a **scripted reconstruction** of the product UI, or a mute loop of a real capture — never an iframe of production, never office/stock photography.
- Mute always. `prefers-reduced-motion: reduce` → first still, no loop.
- Click (whole card) goes to `/work/{slug}`.

Psynth tile: product chrome / empty or synthetic UI.  
DolarGaucho tile: the actual product surface or a chart/UI loop.

## Case pages

MDX file per case. Fixed section order:

1. Title + one-line
2. Problem
3. What you built
4. One hard decision (the interesting call, not a feature list)
5. Media: one short mute loop + 3–5 stills of the real product
6. Footer: back to `/`, Follow X

No invented metrics. If a number is not public and true, omit it.

## Visual system

- Background near-black (`oklch` zinc, same family as Vercel/Brief).
- Type: **Geist** + Geist Mono for labels. No display serif, no grain overlay, no color accent except the media inside tiles.
- Nav: name · work (anchor to tiles) · X. Sticky, hairline.
- Motion: page enter + tile loops + card hover. One orchestrated moment, not scattered effects.
- Photos/video only as product evidence.

## Stack (longevity)

Chosen because it is files + a build, the same world as Vercel, and survives without a vendor CMS.

- **Next.js** (App Router, TypeScript)
- **Tailwind CSS v4** + a small set of primitives if needed (button, no full dashboard kit required)
- **MDX** for `/work/*` (`next-mdx-remote` or official `@next/mdx`)
- **Content as files:** `content/work/psynth.mdx`, `content/work/dolargaucho.mdx` + frontmatter
- **Media:** `public/work/{slug}/` (stills, one short `webm`/`mp4` per case). No upload API.
- **Host:** Vercel, connected to this repo. Domain: existing `tomymaritano.com` if still owned; otherwise `*.vercel.app` until pointed.
- **Analytics:** `@vercel/analytics` only.

Not in v1: Sanity, custom admin, Postgres, Blob uploads, auth.

Adding a third case later = one MDX file, one folder of media, one tile on home. Deploy.

## Content model

```ts
type Work = {
  slug: "psynth" | "dolargaucho";
  title: string;
  line: string;        // one sentence on the home tile
  year: string;
  href: string;        // public product URL if it exists
  cover: string;       // still fallback
  loop?: string;       // mute video
};
```

MDX body is the case narrative. Home reads frontmatter only.

X handle and email live in one `site.ts` config (not duplicated in five components).

## Components

| Unit | Responsibility |
|---|---|
| `SiteNav` | Name, in-page work jump, X. Server. |
| `Hero` | Thesis + Follow X. Server. |
| `ProductTile` | Card chrome + Explore. Wraps a loop. Client only if the loop needs JS. |
| `PsynthLoop` / `DolarGauchoLoop` | Scripted UI or `<video muted playsInline loop>`. Client. Reduced-motion still. |
| `WorkPage` | MDX layout for a case. Server. |
| `site.ts` | Name, X URL, email, work index. |

No shared “marketing landing” from Brief. This repo is independent.

## Data flow

- Build time: Next reads `content/work/*.mdx` and `public/work/**`.
- Runtime: no database. X and email are links.
- Tile loops: client timers or native video; no network to Psynth/DolarGaucho production.

## Errors and constraints

- Missing media → still `cover`; never a broken video.
- Reduced motion → no autoplay, show `cover`.
- Psynth copy and stills reviewed so they cannot contain PHI.
- 404 for unknown `/work/[slug]`.
- External X / product links: `rel="noreferrer"` , new tab only for X and live products, not for internal work routes.

## Testing

- Unit: frontmatter parse / work index (slugs, required fields).
- Smoke: `/`, `/work/psynth`, `/work/dolargaucho`, `/colophon` return 200; `/work/nope` is 404.
- A11y: tiles are links, videos have `aria-hidden` if decorative plus a text name, skip link to `#main`.

## Implementation order (when approved)

1. Scaffold Next on this repo, Geist, Tailwind, Vercel project.
2. `site.ts` + routes + empty MDX shells.
3. Home: hero + two tiles (stills first).
4. Case page template + Psynth / DolarGaucho copy (Tomás supplies facts; no invented numbers).
5. Loops: video or scripted UI, reduced-motion stills.
6. Colophon, analytics, domain.

## Non-goals

- Recreating five x.ai tiles or Grok demos.
- Admin to “upload cases”.
- Blog, CMS, newsletter.
- Pixel-clone of x.ai or vercel.com.

## Open inputs (content, not architecture)

- Exact X URL and public email.
- One true sentence for the H1.
- Which Psynth surfaces are safe to photograph.
- DolarGaucho live URL and which screen is the loop.
