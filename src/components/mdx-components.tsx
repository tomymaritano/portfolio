import type { ComponentProps, ReactNode } from "react";
import { Mermaid } from "@/components/mermaid";

function mermaidSource(node: ReactNode): string | null {
  if (!node || typeof node !== "object" || !("props" in node)) return null;
  const props = (node as { props: { className?: string; children?: unknown } }).props;
  if (!props.className?.includes("language-mermaid")) return null;
  const body = props.children;
  return typeof body === "string" ? body : Array.isArray(body) ? body.join("") : null;
}

export const mdxComponents = {
  Mermaid,
  pre: ({ children, ...props }: ComponentProps<"pre">) => {
    const chart = mermaidSource(children);
    if (chart) return <Mermaid chart={chart} />;
    return (
      <pre
        {...props}
        className="my-6 overflow-x-auto rounded-xl border border-line bg-card p-4 font-mono text-[13px] leading-6 text-foreground/85"
      >
        {children}
      </pre>
    );
  },
};
