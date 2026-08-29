"use client";

import { useEffect, useId, useRef, useState } from "react";
import mermaid from "mermaid";
import { CodeBlock, CopyControl } from "@/components/copy-control";
import { codeSource } from "@/lib/copy";
import { gsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

let started = false;

function diagramLabel(chart: string) {
  const match = chart.match(/\[([^\]]+)\]/);
  const name = match?.[1]?.replace(/\s+/g, " ").trim();
  return name ? `Diagram: ${name}` : "Diagram";
}

function ensureMermaid() {
  if (started) return;
  mermaid.initialize({
    startOnLoad: false,
    theme: "dark",
    look: "classic",
    securityLevel: "strict",
    fontFamily: "ui-sans-serif, system-ui, sans-serif",
    flowchart: {
      useMaxWidth: false,
      htmlLabels: true,
      curve: "basis",
      padding: 12,
      nodeSpacing: 28,
      rankSpacing: 36,
      wrappingWidth: 140,
    },
    themeVariables: {
      background: "#0c0c0c",
      mainBkg: "#0c0c0c",
      primaryColor: "#141414",
      primaryTextColor: "#f3f3f3",
      primaryBorderColor: "#2a2a2a",
      secondaryColor: "#111111",
      tertiaryColor: "#050505",
      lineColor: "#6e6e6e",
      textColor: "#f3f3f3",
      nodeTextColor: "#f3f3f3",
      clusterBkg: "#0c0c0c",
      clusterBorder: "#2a2a2a",
      titleColor: "#f3f3f3",
      edgeLabelBackground: "#0c0c0c",
      actorBkg: "#141414",
      actorBorder: "#2a2a2a",
      actorTextColor: "#f3f3f3",
    },
  });
  started = true;
}

function fitSvg(svg: string) {
  return svg.replace(/<svg\b([^>]*)>/i, (_full, attrs: string) => {
    let next = String(attrs)
      .replace(/\s(?:width|height)="[^"]*"/gi, "")
      .replace(/\sstyle="[^"]*"/i, "");
    if (!/\baria-hidden=/i.test(next)) next += ' aria-hidden="true"';
    if (!/\bpreserveAspectRatio=/i.test(next)) next += ' preserveAspectRatio="xMidYMid meet"';
    return `<svg${next}>`;
  });
}

export function Mermaid({ chart }: { chart: string }) {
  const rawId = useId().replace(/:/g, "");
  const figure = useRef<HTMLElement>(null);
  const [svg, setSvg] = useState("");
  const [failed, setFailed] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    let cancelled = false;
    ensureMermaid();
    mermaid
      .render(`diagram-${rawId}`, chart.trim())
      .then((result) => {
        if (!cancelled) setSvg(fitSvg(result.svg));
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [chart, rawId]);

  useGSAP(
    () => {
      const el = figure.current;
      if (!el || !svg) return;
      if (reduced) {
        gsap.set(el, { clearProps: "opacity,transform" });
        return;
      }
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
    },
    { scope: figure, dependencies: [svg, reduced] },
  );

  if (failed) {
    return <CodeBlock source={chart.trim()}>{chart.trim()}</CodeBlock>;
  }

  return (
    <div className="code-block diagram-block my-8">
      {svg ? (
        <figure
          ref={figure}
          data-diagram=""
          role="img"
          aria-label={diagramLabel(chart)}
          className="diagram-frame"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <figure
          className="diagram-frame diagram-frame-pending"
          aria-busy="true"
          aria-label={`Loading ${diagramLabel(chart).toLowerCase()}`}
        />
      )}
      <CopyControl
        text={codeSource(chart.trim())}
        idle="Copy diagram source"
        done="Copied diagram source"
      />
    </div>
  );
}
