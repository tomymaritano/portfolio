import type { ComponentProps, ReactNode } from "react";
import { CodeBlock, HeadingAnchor } from "@/components/copy-control";
import { Mermaid } from "@/components/mermaid";
import { TextLink } from "@/components/text-link";
import { fenceLanguage } from "@/lib/copy";

function mermaidSource(node: ReactNode): string | null {
  if (!node || typeof node !== "object" || !("props" in node)) return null;
  const props = (node as { props: { className?: string; children?: unknown } }).props;
  if (!props.className?.includes("language-mermaid")) return null;
  const body = props.children;
  return typeof body === "string" ? body : Array.isArray(body) ? body.join("") : null;
}

function codeClassName(node: ReactNode): string | undefined {
  if (Array.isArray(node)) return node.map(codeClassName).find(Boolean);
  if (!node || typeof node !== "object" || !("props" in node)) return undefined;
  return (node as { props: { className?: string } }).props.className;
}

function textOf(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (typeof node === "object" && "props" in node) {
    return textOf((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

function headingId(node: ReactNode) {
  const slug = textOf(node)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || undefined;
}

export const mdxComponents = {
  Mermaid,
  h2: ({ children, id, ...props }: ComponentProps<"h2">) => {
    const slug = id ?? headingId(children);
    return (
      <h2 id={slug} {...props}>
        {children}
        {slug ? <HeadingAnchor slug={slug} /> : null}
      </h2>
    );
  },
  h3: ({ children, id, ...props }: ComponentProps<"h3">) => {
    const slug = id ?? headingId(children);
    return (
      <h3 id={slug} {...props}>
        {children}
        {slug ? <HeadingAnchor slug={slug} /> : null}
      </h3>
    );
  },
  a: ({ href, children, ...props }: ComponentProps<"a">) => {
    if (!href) return <a {...props}>{children}</a>;
    if (/^https?:\/\//i.test(href)) {
      return (
        <TextLink {...props} href={href} target="_blank" rel="noreferrer">
          {children}
        </TextLink>
      );
    }
    return (
      <TextLink href={href} {...props}>
        {children}
      </TextLink>
    );
  },
  img: ({ alt, ...props }: ComponentProps<"img">) => (
    <img
      {...props}
      alt={alt ?? ""}
      className="my-8 w-full rounded-xl border border-line bg-card"
    />
  ),
  table: (props: ComponentProps<"table">) => (
    <div className="my-6 overflow-x-auto">
      <table {...props} />
    </div>
  ),
  pre: ({ children, ...props }: ComponentProps<"pre">) => {
    const chart = mermaidSource(children);
    if (chart) return <Mermaid chart={chart} />;
    return (
      <CodeBlock source={textOf(children)} language={fenceLanguage(codeClassName(children))} {...props}>
        {children}
      </CodeBlock>
    );
  },
};
