import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

function authorized(req: NextRequest) {
  const secret = process.env.GHOST_WEBHOOK_SECRET;
  if (!secret) return false;
  const header = req.headers.get("authorization");
  const bearer = header?.startsWith("Bearer ") ? header.slice(7) : "";
  const query = req.nextUrl.searchParams.get("secret") ?? "";
  return bearer === secret || query === secret;
}

export async function POST(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as
    | { post?: { current?: { slug?: string } }; slug?: string }
    | null;
  const slug = body?.post?.current?.slug ?? body?.slug;

  revalidateTag("writing", "max");
  revalidatePath("/writing");
  if (typeof slug === "string" && slug) revalidatePath(`/writing/${slug}`);

  return NextResponse.json({ ok: true, slug: slug ?? null });
}
