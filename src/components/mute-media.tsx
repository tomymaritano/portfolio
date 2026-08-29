"use client";

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export function MuteMedia({
  src,
  cover,
  label,
}: {
  src?: string;
  cover?: string;
  label: string;
}) {
  const reduce = usePrefersReducedMotion();

  if (!src || reduce) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      cover ? <img src={cover} alt="" aria-hidden className="h-full w-full object-cover" /> : null
    );
  }

  return (
    <video
      className="h-full w-full object-cover"
      src={src}
      poster={cover}
      muted
      playsInline
      loop
      autoPlay
      aria-hidden
      title={label}
    />
  );
}
