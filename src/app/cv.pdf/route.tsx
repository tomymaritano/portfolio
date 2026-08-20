import { createHash } from "node:crypto";
import { renderToBuffer } from "@react-pdf/renderer";
import { contentHash } from "@/lib/catalog";
import { CvDocument, cvData } from "@/lib/cv";

export async function GET(request: Request) {
  const data = cvData();
  const etag = `"${createHash("sha256").update(contentHash(data)).digest("hex")}"`;
  if (request.headers.get("if-none-match") === etag) {
    return new Response(null, { status: 304, headers: { ETag: etag } });
  }

  const buffer = await renderToBuffer(<CvDocument data={data} />);
  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="tomas-maritano-cv.pdf"',
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      ETag: etag,
    },
  });
}
