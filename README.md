# tomymaritano.com

Personal site. Next.js, Tailwind, MDX in git. No CMS. No admin.

Home is the about. Work is products, roles, and clients. Writing is the technical notes. A case is a file and a folder of stills.

```bash
npm install
npm run dev    # :3200
npm test
npm run mcp    # stdio MCP for Cursor
```

## Routes

| Path | What |
| --- | --- |
| `/` | About: photo, line, bio, Work paragraph, stack |
| `/work` | Year list — Products / Roles / Clients |
| `/work/{slug}` | Case |
| `/writing` | Notes |
| `/writing/{slug}` | Note |
| `/colophon` | How this is made |
| `/cv.pdf` | CV generated from the same catalog |

`/about` redirects to `/`.

## Content

- Index and bio live in `src/lib/site.ts`
- Cases: `content/work/{slug}.mdx` + `public/work/{slug}/`
- Notes: `content/writing/{slug}.mdx`
- Adding a case by hand: MDX + stills + a row in `site.ts`

## Catalog, drafts, MCP

Git stays the source of truth. The catalog is public. Drafts open a pull request and never merge.

| Endpoint | What |
| --- | --- |
| `GET /api/content` | Site, work, writing |
| `GET /api/content/{work\|writing}/{slug}` | One entry + raw MDX |
| `POST /api/content/draft` | Bearer `CONTENT_API_TOKEN` → GitHub PR |
| `GET /api/mcp` | Same tools over Streamable HTTP (Grok Bot) |

MCP tools: `list_catalog`, `get_entry`, `draft_entry`. Cursor uses stdio (`.cursor/mcp.json`). Grok Bot uses `/api/mcp`. `draft_entry` needs the same bearer as the HTTP draft route.

```bash
cp .env.example .env.local
```

| Var | What |
| --- | --- |
| `CONTENT_API_TOKEN` | Shared secret for drafts |
| `GITHUB_TOKEN` | Fine-grained: contents + pull requests, this repo only |
| `GITHUB_REPO` | `owner/repo` (default `tomymaritano/portfolio`) |

Spec: `docs/superpowers/specs/2026-08-16-portfolio-design.md`
