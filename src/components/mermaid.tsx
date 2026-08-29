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
        if (!cancelled) setSvg(result.svg.replace("<svg", '<svg aria-hidden="true"'));
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
      const nodes = el.querySelectorAll<SVGElement>(".node, .cluster");
      const edges = el.querySelectorAll<SVGElement>(".edgePath, .flowchart-link");
      if (reduced) {
        gsap.set(el, { clearProps: "opacity,transform" });
        gsap.set(nodes, { clearProps: "opacity,transform" });
        gsap.set(edges, { clearProps: "opacity" });
        return;
      }
      const tl = gsap.timeline();
      tl.fromTo(el, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
      if (nodes.length) {
        tl.fromTo(
          nodes,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.045, ease: "power2.out" },
          "-=0.18",
        );
      }
      if (edges.length) {
        tl.fromTo(
          edges,
          { opacity: 0 },
          { opacity: 1, duration: 0.32, stagger: 0.02, ease: "power2.out" },
          "-=0.22",
        );
      }
    },
    { scope: figure, dependencies: [svg, reduced] },
  );

  if (failed) {
    return <CodeBlock source={chart.trim()}>{chart.trim()}</CodeBlock>;
  }

  return (
    <div className="code-block my-8">
      {svg ? (
        <figure
          ref={figure}
          data-diagram=""
          role="img"
          aria-label={diagramLabel(chart)}
          className="overflow-x-auto rounded-xl border border-line bg-card p-4 pr-12 [&_svg]:mx-auto [&_svg]:max-w-full [&_svg]:pointer-events-none"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <figure
          className="min-h-40 rounded-xl border border-line bg-card p-4 pr-12"
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
