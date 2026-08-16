import Link from "next/link";
import { ViewTransition } from "react";

type Row = {
  kind: string;
  slug: string;
  title: string;
  line: string;
  started: number;
  showYear: boolean;
  path: string;
};

export function YearList({ items }: { items: readonly Row[] }) {
  return (
    <ol>
      {items.map((item) => (
        <li key={`${item.kind}-${item.slug}`}>
          <Link
            href={item.path}
            transitionTypes={["nav-forward"]}
            className="grid grid-cols-[3.5rem_minmax(0,1fr)] items-baseline gap-x-4 py-[0.85rem] text-[15px] sm:grid-cols-[3.5rem_minmax(0,1fr)_auto]"
          >
            <span className="text-muted tabular-nums">{item.showYear ? item.started : ""}</span>
            <ViewTransition name={`${item.kind}-${item.slug}`} share="morph" default="none">
              <span className="text-foreground">{item.title}</span>
            </ViewTransition>
            <span className="hidden text-right text-muted sm:block">{item.line}</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
