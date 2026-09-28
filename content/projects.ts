export const projectTags = {
  web: {
    id: "web",
    label: "Web Development",
    className: "bg-accent/15 text-accent-bright border border-accent/30",
  },
  software: {
    id: "software",
    label: "Software Development",
    className: "bg-accent/15 text-accent-bright border border-accent/30",
  },
  graphics: {
    id: "graphics",
    label: "Graphics Design",
    className: "bg-accent/15 text-accent-bright border border-accent/30",
  },
} as const;

export type ProjectTagId = keyof typeof projectTags;

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  tags: ProjectTagId[];
  thumbnail: { src: string; alt: string };
  description?: string;
  gallery?: { src: string; alt: string }[];
  techStack?: string[];
  client?: string;
  completedAt?: string;
  links?: ProjectLink[];
};

export type ProjectSummary = Pick<
  Project,
  | "slug"
  | "title"
  | "shortDescription"
  | "tags"
  | "thumbnail"
  | "techStack"
  | "links"
>;

export function getProjectTag(id: string) {
  if (id in projectTags) {
    return projectTags[id as ProjectTagId];
  }
  return null;
}

export const allProjectTags = Object.values(projectTags);
