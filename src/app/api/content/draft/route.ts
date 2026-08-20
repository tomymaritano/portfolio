import { authorizeContent, clientKey, rateLimited } from "@/lib/auth";
import { draftSchema, submitDraft } from "@/lib/draft";
import { readGithubFile } from "@/lib/github";

export async function POST(request: Request) {
  const auth = authorizeContent(request);
  if (auth === "unconfigured") {
    return Response.json({ error: "content api is not configured" }, { status: 503 });
  }
  if (auth === "denied") {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  if (rateLimited(clientKey(request))) {
    return Response.json({ error: "rate limited" }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json({ error: "invalid json" }, { status: 422 });
  }

  const parsed = draftSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: "invalid draft", issues: parsed.error.flatten() }, { status: 422 });
  }

  try {
    const siteTs = await readGithubFile("src/lib/site.ts");
    const result = await submitDraft(parsed.data, siteTs);
    if (!result.ok) {
      return Response.json({ error: result.error }, { status: result.status });
    }
    return Response.json({ pr: result.pr }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "draft failed";
    return Response.json({ error: message }, { status: 502 });
  }
}
