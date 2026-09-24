import type { TechItem } from "@/content/projects";

type TechStackProps = {
    tech: TechItem[];
};

function TechIcon({ name }: { name: string }) {
    return (
        <span
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-elevated text-xs font-semibold text-accent-bright"
            aria-hidden="true"
        >
            {name.charAt(0).toUpperCase()}
        </span>
    );
}

export function TechStack({ tech }: TechStackProps) {
    if (tech.length === 0) return null;

    return (
        <ul className="flex flex-wrap gap-3">
            {tech.map((techItem) => (
                <li
                    key={techItem.id}
                    className="flex items-center gap-2 rounded-lg border border-border bg-elevated/40 px-2.5 py-1.5">
                    
                    <TechIcon name={techItem.name} />
                    <span className="text-sm text-foreground">{techItem.name}</span>
                </li>
            ))}
        </ul>
    );
}