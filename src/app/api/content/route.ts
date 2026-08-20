import { listCatalog } from "@/lib/catalog";

export async function GET() {
  const catalog = listCatalog();
  return Response.json(catalog, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
