import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { authorizeContent } from "@/lib/auth";
import { createPortfolioServer } from "@/mcp/create-server";

async function handle(request: Request) {
  const allowDraft = authorizeContent(request) === "ok";
  const server = createPortfolioServer({ allowDraft });
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });
  await server.connect(transport);
  return transport.handleRequest(request);
}

export const GET = handle;
export const POST = handle;
export const DELETE = handle;
