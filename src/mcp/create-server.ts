import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getEntry, isContentKind, listCatalog } from "@/lib/catalog";
import { draftSchema, submitDraft } from "@/lib/draft";
import { readGithubFile } from "@/lib/github";

export function createPortfolioServer(options: { allowDraft: boolean }) {
  const server = new McpServer({
    name: "tomy-portfolio",
    version: "0.1.0",
  });

  server.registerTool("list_catalog", { description: "List site, work, and writing from the portfolio catalog." }, async () => ({
    content: [{ type: "text", text: JSON.stringify(listCatalog(), null, 2) }],
  }));

  server.registerTool(
    "get_entry",
    {
      description: "Get one work or writing entry, including the raw MDX body.",
      inputSchema: {
        kind: z.enum(["work", "writing"]),
        slug: z.string(),
      },
    },
    async ({ kind, slug }) => {
      if (!isContentKind(kind)) {
        return { content: [{ type: "text", text: "not found" }], isError: true };
      }
      const entry = await getEntry(kind, slug);
      if (!entry) {
        return { content: [{ type: "text", text: "not found" }], isError: true };
      }
      return { content: [{ type: "text", text: JSON.stringify(entry, null, 2) }] };
    },
  );

  server.registerTool(
    "draft_entry",
    {
      description: "Open a GitHub PR that adds a work or writing entry. Never merges.",
      inputSchema: draftSchema.shape,
    },
    async (args) => {
      if (!options.allowDraft) {
        return { content: [{ type: "text", text: "unauthorized" }], isError: true };
      }
      const parsed = draftSchema.safeParse(args);
      if (!parsed.success) {
        return { content: [{ type: "text", text: parsed.error.message }], isError: true };
      }
      try {
        const siteTs = await readGithubFile("src/lib/site.ts");
        const result = await submitDraft(parsed.data, siteTs);
        if (!result.ok) {
          return { content: [{ type: "text", text: result.error }], isError: true };
        }
        return { content: [{ type: "text", text: JSON.stringify(result.pr, null, 2) }] };
      } catch (error) {
        const message = error instanceof Error ? error.message : "draft failed";
        return { content: [{ type: "text", text: message }], isError: true };
      }
    },
  );

  return server;
}

export function envAllowsDraft() {
  return Boolean(process.env.CONTENT_API_TOKEN && process.env.GITHUB_TOKEN);
}
