type TagPillProps = {
    label: string;
    className?: string;
};

export function TagPill({ label, className = "" }: TagPillProps) {
    return (
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}>
            {label}
        </span>
    );
}