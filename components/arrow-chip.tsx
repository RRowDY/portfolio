import Link from "next/link";
import type { ReactNode } from "react";

type ArrowChipProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
};

const chipClass = [
  "group inline-flex items-center gap-3 rounded-full border border-border py-1 pr-1 pl-4",
  "bg-[color-mix(in_srgb,var(--foreground)_8%,var(--bg-elevated))]",
  "text-sm font-medium text-foreground",
  "transition-[background-color,border-color,opacity] duration-200",
  "hover:border-foreground/30 hover:bg-transparent",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
  "disabled:pointer-events-none disabled:opacity-70",
  "motion-reduce:transition-none",
].join(" ");

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="size-3.5 transition-transform duration-200 group-hover:-rotate-45 motion-reduce:transition-none"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 8h9M8.5 4.5 12.5 8l-4 3.5" />
    </svg>
  );
}

function ChipBody({ children }: { children: ReactNode }) {
  return (
    <>
      <span>{children}</span>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-colors duration-200 group-hover:bg-foreground group-hover:text-[var(--bg-deep)] motion-reduce:transition-none">
        <ArrowIcon />
      </span>
    </>
  );
}

export function ArrowChip({
  children,
  className,
  href,
  external,
  type = "button",
  disabled,
}: ArrowChipProps) {
  const classes = className ? `${chipClass} ${className}` : chipClass;

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        <ChipBody>{children}</ChipBody>
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        <ChipBody>{children}</ChipBody>
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} className={classes}>
      <ChipBody>{children}</ChipBody>
    </button>
  );
}
