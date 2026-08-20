import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createPortfolioServer, envAllowsDraft } from "@/mcp/create-server";

const server = createPortfolioServer({ allowDraft: envAllowsDraft() });
const transport = new StdioServerTransport();
await server.connect(transport);
