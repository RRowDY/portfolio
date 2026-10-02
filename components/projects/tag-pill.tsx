type TagPillProps = {
  label: string;
  className?: string;
  size?: "sm" | "md";
};

const sizeClass = {
  sm: "px-2.5 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
} as const;

export function TagPill({ label, className = "", size = "md" }: TagPillProps) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full font-medium ${sizeClass[size]} ${className}`}
    >
      {label}
    </span>
  );
}
