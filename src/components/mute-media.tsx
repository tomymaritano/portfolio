"use client";

import { useEffect, useState } from "react";

export function MuteMedia({
  src,
  cover,
  label,
}: {
  src?: string;
  cover?: string;
  label: string;
}) {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (!src || reduce) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      cover ? <img src={cover} alt="" className="h-full w-full object-cover" /> : null
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
