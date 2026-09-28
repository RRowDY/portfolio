"use client";

import { useId } from "react";

type DotPatternProps = {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
  glow?: boolean;
};

export function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  glow = false,
}: DotPatternProps) {
  const id = useId().replace(/:/g, "");

  return (
    <svg
      aria-hidden="true"
      className={[
        "pointer-events-none absolute inset-0 h-full w-full text-accent-bright/30",
        glow ? "motion-safe:animate-dot-glow motion-reduce:opacity-70" : "",
        className ?? "",
      ].join(" ")}
    >
      <defs>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
        <pattern
          id={`${id}-dots`}
          width={width}
          height={height}
          x={x}
          y={y}
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx={cx}
            cy={cy}
            r={glow ? cr * 1.15 : cr}
            fill={glow ? `url(#${id}-glow)` : "currentColor"}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id}-dots)`} />
    </svg>
  );
}
