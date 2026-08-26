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
            className="group grid cursor-pointer grid-cols-[3.5rem_minmax(0,1fr)] items-baseline gap-x-4 py-[0.85rem] text-[16px] sm:grid-cols-[3.5rem_minmax(0,1fr)_auto]"
          >
            <span className="text-muted tabular-nums">{item.showYear ? item.started : ""}</span>
            <ViewTransition name={`${item.kind}-${item.slug}`} share="morph" default="none">
              <span className="text-foreground transition-colors duration-200 group-hover:text-accent">
                {item.title}
              </span>
            </ViewTransition>
            <span className="col-start-2 mt-0.5 text-[13px] leading-5 text-muted transition-colors duration-200 group-hover:text-foreground/65 sm:col-start-3 sm:mt-0 sm:text-right sm:text-[16px] sm:leading-normal">
              {item.line}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
