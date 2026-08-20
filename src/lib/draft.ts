import { z } from "zod";
import { workBySlug, writingBySlug, type WorkLane } from "@/lib/site";
import { openContentPr } from "@/lib/github";

const slugSchema = z
  .string()
  .min(1)
  .max(64)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const draftSchema = z.object({
  kind: z.enum(["work", "writing"]),
  slug: slugSchema,
  title: z.string().min(1).max(120),
  line: z.string().min(1).max(200),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  lane: z.enum(["product", "role", "client"]).optional(),
  href: z.string().url().nullable().optional(),
  body: z.string().min(1).max(80_000).optional(),
});

export type DraftInput = z.infer<typeof draftSchema>;

export type DraftFile = {
  path: string;
  content: string;
};

const defaultBody = `## Problem

## What I built

## One hard decision
`;

export function draftExists(input: DraftInput) {
  return input.kind === "work" ? workBySlug(input.slug) !== null : writingBySlug(input.slug) !== null;
}

export function sourceHasSlug(source: string, slug: string) {
  return source.includes(`slug: "${slug}"`) || source.includes(`slug: '${slug}'`);
}

function yearFromDate(date: string) {
  return date.slice(0, 4);
}

function quote(value: string) {
  return JSON.stringify(value);
}

function mdxFile(input: DraftInput) {
  return `---
title: ${quote(input.title)}
line: ${quote(input.line)}
---

${(input.body ?? defaultBody).trim()}
`;
}

function workEntry(input: DraftInput) {
  const year = yearFromDate(input.date);
  const href = input.href === undefined ? "null as string | null" : input.href === null ? "null as string | null" : `${quote(input.href)}`;
  return `  {
    kind: "work" as const,
    slug: ${quote(input.slug)},
    title: ${quote(input.title)},
    line: ${quote(input.line)},
    started: ${year},
    date: ${quote(input.date)},
    year: ${quote(year)},
    href: ${href},
    repo: null as string | null,
    cover: "",
    loop: undefined as string | undefined,
    stills: [] as string[],
  },`;
}

function writingEntry(input: DraftInput) {
  const year = yearFromDate(input.date);
  return `  {
    kind: "writing" as const,
    slug: ${quote(input.slug)},
    title: ${quote(input.title)},
    line: ${quote(input.line)},
    started: ${year},
    date: ${quote(input.date)},
    year: ${quote(year)},
  },`;
}

function insertAfterMarker(source: string, marker: string, chunk: string) {
  const at = source.indexOf(marker);
  if (at === -1) throw new Error(`missing ${marker}`);
  const insertAt = at + marker.length;
  return `${source.slice(0, insertAt)}\n${chunk}${source.slice(insertAt)}`;
}

export function patchSiteTs(source: string, input: DraftInput) {
  if (sourceHasSlug(source, input.slug)) {
    throw new Error(`slug already in site.ts: ${input.slug}`);
  }

  if (input.kind === "work") {
    const lane: WorkLane = input.lane ?? "product";
    let next = insertAfterMarker(source, "export const work = [", workEntry(input));
    next = insertAfterMarker(next, "export const workLanes = {", `  ${quote(input.slug)}: "${lane}",`);
    return next;
  }

  return insertAfterMarker(source, "export const writing = [", writingEntry(input));
}

export function buildDraftFiles(siteTs: string, input: DraftInput): DraftFile[] {
  return [
    { path: `content/${input.kind}/${input.slug}.mdx`, content: mdxFile(input) },
    { path: "src/lib/site.ts", content: patchSiteTs(siteTs, input) },
  ];
}

export function draftBranch(input: DraftInput) {
  return `content/${input.kind}/${input.slug}`;
}

export function draftPrTitle(input: DraftInput) {
  return `Add ${input.kind}: ${input.title}`;
}

export function draftPrBody(input: DraftInput) {
  return `Draft from the content API. Review the MDX and the \`${input.kind}\` row in \`src/lib/site.ts\`. Do not merge from the API.`;
}

export async function submitDraft(input: DraftInput, siteTs: string) {
  if (draftExists(input) || sourceHasSlug(siteTs, input.slug)) {
    return { ok: false as const, status: 409, error: "slug already exists" };
  }
  const files = buildDraftFiles(siteTs, input);
  const pr = await openContentPr({
    files,
    branch: draftBranch(input),
    title: draftPrTitle(input),
    body: draftPrBody(input),
  });
  return { ok: true as const, pr };
}
