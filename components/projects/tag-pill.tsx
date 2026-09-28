type TagPillProps = {
  label: string;
  className?: string;
};

export function TagPill({ label, className = "" }: TagPillProps) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium text-${className}`}
    >
      {label}
    </span>
  );
}
