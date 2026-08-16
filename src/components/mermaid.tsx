"use client";

import { useEffect, useId, useState } from "react";
import mermaid from "mermaid";

let started = false;

function ensureMermaid() {
  if (started) return;
  mermaid.initialize({
    startOnLoad: false,
    theme: "dark",
    securityLevel: "strict",
    fontFamily: "ui-sans-serif, system-ui, sans-serif",
    themeVariables: {
      background: "#111111",
      primaryColor: "#1a1a1a",
      primaryTextColor: "#ededed",
      primaryBorderColor: "#333333",
      lineColor: "#888888",
      secondaryColor: "#161616",
      tertiaryColor: "#0a0a0a",
      nodeTextColor: "#ededed",
      edgeLabelBackground: "#111111",
    },
  });
  started = true;
}

export function Mermaid({ chart }: { chart: string }) {
  const rawId = useId().replace(/:/g, "");
  const [svg, setSvg] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    ensureMermaid();
    mermaid
      .render(`diagram-${rawId}`, chart.trim())
      .then((result) => {
        if (!cancelled) setSvg(result.svg);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [chart, rawId]);

  if (failed) {
    return (
      <pre className="my-8 overflow-x-auto rounded-xl border border-line bg-card p-4 text-[13px] text-muted">
        {chart.trim()}
      </pre>
    );
  }

  return (
    <figure
      className="my-8 overflow-x-auto rounded-xl border border-line bg-card p-4 [&_svg]:mx-auto [&_svg]:max-w-full"
      dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
    />
  );
}
