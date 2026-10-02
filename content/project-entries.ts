import type { Project, ProjectSummary } from "@/content/projects";
export const projects: Project[] = [
  {
    slug: "project-1",
    title: "Project 1",
    shortDescription: "Project 1 description",
    tags: ["web", "software"],
    thumbnail: { src: "/projects/project-1/cover.png", alt: "Project 1" },
    description:
      "Longer write-up for the modal. What it does, what you learned, outcomes.",
    gallery: [{ src: "/projects/project-1/cover.png", alt: "Project 1" }],
    techStack: ["nextjs", "typescript", "git"],
    client: "Personal",
    completedAt: "2024",
    links: [{ label: "Live site", href: "https://example.com" }],
  },
  {
    slug: "project-2",
    title: "Project 2",
    shortDescription: "Project 2 description",
    tags: ["web", "graphics"],
    thumbnail: { src: "/projects/project-2/cover.webp", alt: "Project 2" },
    description: "Another full description for the modal.",
    gallery: [{ src: "/projects/project-2/cover.webp", alt: "Project 2" }],
    techStack: ["react", "postgresql"],
    completedAt: "2025",
  },
];
export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
export function toProjectSummary(project: Project): ProjectSummary {
  return {
    slug: project.slug,
    title: project.title,
    shortDescription: project.shortDescription,
    tags: project.tags,
    thumbnail: project.thumbnail,
    techStack: project.techStack,
    links: project.links,
  };
}
