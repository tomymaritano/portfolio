"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";
import { Check, Copy } from "lucide";
import { ToggleMorphIcon } from "@/components/hover-morph-icon";
import { codeSource, sectionUrl } from "@/lib/copy";

async function writeClipboard(text: string) {
  if (!navigator.clipboard?.writeText) return false;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function useCopied(ms = 1600) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const mark = () => {
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), ms);
  };

  return { copied, mark };
}

export function CopyControl({
  text,
  idle,
  done,
}: {
  text: string;
  idle: string;
  done: string;
}) {
  const { copied, mark } = useCopied();
  if (!text) return null;

  return (
    <>
      <button
        type="button"
        className="code-copy"
        data-copied={copied ? "" : undefined}
        aria-label={copied ? done : idle}
        title={copied ? "Copied" : idle}
        onClick={() => {
          void writeClipboard(text).then((ok) => {
            if (ok) mark();
          });
        }}
      >
        <ToggleMorphIcon rest={Copy} hover={Check} on={copied} size={16} />
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? done : ""}
      </span>
    </>
  );
}

export function HeadingAnchor({ slug }: { slug: string }) {
  const { copied, mark } = useCopied();

  return (
    <a
      href={`#${slug}`}
      className="heading-anchor"
      data-copied={copied ? "" : undefined}
      aria-label={copied ? "Copied link to this section" : "Copy link to this section"}
      title={copied ? "Copied" : "Copy link"}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
        const url = sectionUrl(window.location.href, slug);
        void writeClipboard(url).then((ok) => {
          if (ok) mark();
        });
      }}
    >
      #
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied link to this section" : ""}
      </span>
    </a>
  );
}

export function CodeBlock({
  source,
  language,
  children,
  ...props
}: ComponentProps<"pre"> & { source: string; language?: string }) {
  return (
    <div className="code-block">
      {language ? <span className="code-lang">{language}</span> : null}
      <pre
        {...props}
        className={`my-6 overflow-x-auto rounded-xl border border-line bg-card p-4 pr-12 font-mono text-[13px] leading-6 text-foreground/85 ${
          language ? "pt-9" : ""
        }`}
      >
        {children}
      </pre>
      <CopyControl text={codeSource(source)} idle="Copy code" done="Copied code" />
    </div>
  );
}
