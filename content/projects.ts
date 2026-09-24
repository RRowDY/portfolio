export const projectTags = {
    web: {
        id: "web",
        label: "Web Development",
        className: "bg-accent/15 text-accent-bright border border-accent/30"
    },
    software: {
        id: "software",
        label: "Software Development",
        className: "bg-accent/15 text-accent-bright border border-accent/30"
    },
    graphics: {
        id: "graphics",
        label: "Graphics Design",
        className: "bg-accent/15 text-accent-bright border border-accent/30"
    }
} as const;

export type ProjectTagId = keyof typeof projectTags;

export type ProjectLink = {
    label: string;
    href: string;
};

export type TechItem = {
    id: string;
    name: string;
};

export type Project = {
    slug: string;
    title: string;
    shortDescription: string;
    tags: ProjectTagId[];
    thumbnail: { src: string; alt: string };
    description?: string;
    gallery?: { src: string; alt: string }[];
    techStack?: TechItem[];
    client?: string;
    completedAt?: string;
    links?: ProjectLink[];
};

export const projects: Project[] = [
    {
        slug: "project-1",
        title: "Project 1",
        shortDescription: "Project 1 description",
        tags: ["web", "software"],
        thumbnail: { src: "/images/project-1.jpg", alt: "Project 1" },
        description:
            "Longer write-up for the modal. What it does, what you learned, outcomes.",
        gallery: [
            { src: "/images/project-1.jpg", alt: "Project 1 main" },
            { src: "/images/project-1.jpg", alt: "Project 1 detail" },
        ],
        techStack: [
            { id: "nextjs", name: "Next.js" },
            { id: "typescript", name: "TypeScript" },
        ],
        client: "Personal",
        completedAt: "2024",
        links: [{ label: "Live site", href: "https://example.com" }],
    },
    {
        slug: "project-2",
        title: "Project 2",
        shortDescription: "Project 2 description",
        tags: ["web", "graphics"],
        thumbnail: { src: "/images/project-2.webp", alt: "Project 2" },
        description: "Another full description for the modal.",
        gallery: [{ src: "/images/project-2.webp", alt: "Project 2" }],
        techStack: [{ id: "react", name: "React" }],
        completedAt: "2025",
    },
];

export function getProjectTag(id: string) {
    if (id in projectTags) {
        return projectTags[id as ProjectTagId];
    }
    return null;
}

export const allProjectTags = Object.values(projectTags);