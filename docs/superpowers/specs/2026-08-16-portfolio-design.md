# Portfolio — Tomás Maritano

Date: 2026-08-20  
Repo: [tomymaritano/portfolio](https://github.com/tomymaritano/portfolio.git)  
Status: implemented — founder home (not Featured)

## Intent

A long-lived personal site that sells Tomás as a **founder-operator** (Psynth) who also builds in public — closer to craftz.dog (home is the about) than to a résumé or a product bento.

Primary visitor: **founders**.  
Primary action: **follow on X**.  
Proof: **bio + a Work paragraph** that names the four products. The year list lives on `/work`.

Out of v1: admin/CMS, contact form, Google Auth, job-application layout, cinematic stock/hero mood, glass cards, agentic chat, invented metrics, a heading that says Featured.

## Positioning

| Decision | Choice |
|---|---|
| Buyer | Founders + personal brand (not hiring-manager CV) |
| Conversion | Follow X |
| Work on the spine | Psynth, Dripnex, DolarGaucho, Quantis-intel |
| Case shape | Four products named in the home Work paragraph. Full index on `/work` |
| Persistence | Files in git (MDX). No admin panel |
| Look | Vercel product chrome + SpaceX restraint; x.ai *grammar* for product tiles |

Psynth is written as systems and craft. **No PHI, no patient data, no internal clinical screens that identify people.** Prefer product chrome, empty states, and abstracted UI.

## Information architecture

| Route | Role |
|---|---|
| `/` | About: H1, line, photo, bio, Work paragraph (Psynth, Dripnex, DolarGaucho, Quantis-intel), My work → `/work`, short stack. Follow X. No cards. |
| `/about` | Permanent redirect to `/`. |
| `/work` | Year list of every case. Dripnex first. |
| `/work/dripnex` | Case: problem → what shipped → one hard decision → media. SQLite + sync, not offline. |
| `/work/psynth` | Same shape. No PHI. |
| `/work/dolargaucho` | Same shape. AI finance. |
| `/work/quantis-intel` | Same shape. Financial reporting with AI. |
| `/writing` | Year list of notes. X is still the feed. |
| `/colophon` | How the site is built (stack, MDX, no CMS). One screen. |

## Home (craftz.dog grammar)

The home **is** the about. No product tiles.

1. **Identity** — H1, one line, photo, Follow on X.
2. **Bio** — `site.about` paragraphs.
3. **Work** — one paragraph naming Psynth (clinical reporting, lead engineering), Dripnex (AI notes), DolarGaucho (AI finance), Quantis-intel (financial reporting). Each name links to `/work/{slug}`. Text link “My work →” to `/work`.
4. **Stack** — short label / items rows. Colophon and email live in the footer.

Do not label anything “Featured”. Do not put cards on `/`.

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
- Type: **Geist** + Geist Mono for labels. No display serif, no grain overlay. Site accent only on the H1 or hover — not a second glow on the chrome.
- Nav: name · Work · Writing · GitHub · LinkedIn · X. No About. No icons on Work/Writing. Sticky, hairline. Work stays active on `/work/*`. Below `md`: hamburger (Menu ↔ X). Morphicons only on socials and the menu.
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
  slug: "dripnex" | "psynth" | string;
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
| `SiteNav` | Name, Work, Writing, socials. Server + text `NavLink`. |
| `MobileNav` | Hamburger below `md`. Morphicons Menu ↔ X. |
| `ProductTile` | Case media only. Not used on home. |
| `DripnexLoop` / `PsynthLoop` | Scripted UI. Client. Reduced-motion still. |
| `YearList` | Index on `/work` and `/writing`. |
| `WorkPage` | MDX layout for a case. Server. |
| `site.ts` | Name, X URL, email, `homeWork()`, work index. |

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
- Smoke: `/`, `/work`, `/work/dripnex`, `/work/psynth`, `/colophon` return 200; `/about` redirects to `/`; `/work/nope` is 404.
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
- A “Featured” heading or icon-card row.
- Agentic chat, glassmorphism, cinematic HUD.
- Admin to “upload cases”.
- CMS, newsletter.
- Pixel-clone of x.ai, vercel.com, or zenorocha.com.

## Open inputs (content, not architecture)

- Exact X URL and public email.
- One true sentence for the H1.
- Which Psynth surfaces are safe to photograph.
- DolarGaucho live URL and which screen is the loop.
