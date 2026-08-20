import { getEntry, isContentKind } from "@/lib/catalog";

export async function GET(
  _request: Request,
  context: { params: Promise<{ kind: string; slug: string }> },
) {
  const { kind, slug } = await context.params;
  if (!isContentKind(kind)) {
    return Response.json({ error: "not found" }, { status: 404 });
  }
  const entry = await getEntry(kind, slug);
  if (!entry) {
    return Response.json({ error: "not found" }, { status: 404 });
  }
  return Response.json(entry, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
