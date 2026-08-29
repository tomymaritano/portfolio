"use client";

import { MorphIcon, type IconInput } from "morphicons/react";

const spring = "bouncy" as const;

const iconProps = {
  strokeWidth: 1.75,
  color: "currentColor",
  spring,
  reducedMotion: "user" as const,
  className: "overflow-visible",
};

export function HoverMorphIcon({
  rest,
  hover,
  over,
  size = 20,
}: {
  rest: IconInput;
  hover: IconInput;
  over: boolean;
  size?: number;
}) {
  return (
    <span className="pointer-events-none inline-flex size-5 shrink-0 items-center justify-center overflow-visible">
      <MorphIcon icon={over ? hover : rest} size={size} {...iconProps} />
    </span>
  );
}

export function ToggleMorphIcon({
  rest,
  hover,
  on,
  size = 20,
}: {
  rest: IconInput;
  hover: IconInput;
  on: boolean;
  size?: number;
}) {
  return (
    <span className="pointer-events-none inline-flex size-5 shrink-0 items-center justify-center overflow-visible">
      <MorphIcon icon={on ? hover : rest} size={size} {...iconProps} />
    </span>
  );
}
