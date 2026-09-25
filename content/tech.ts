import type { IconType } from "react-icons";
import {
    SiGit,
    SiGithub,
    SiJavascript,
    SiMysql,
    SiNextdotjs,
    SiPostgresql,
    SiReact,
    SiTypescript,
} from "react-icons/si";

export type TechCategoryId = "frontend" | "backend" | "tools";

export type TechCatalogItem = {
    id: string;
    name: string;
    Icon: IconType;
    category: TechCategoryId;
};

export const techCategoryOrder = ["frontend", "backend", "tools"] as const;

export const techCategoryTitles: Record<TechCategoryId, string> = {
    frontend: "Front-End",
    backend: "Back-End",
    tools: "Tools & Workflow",
};


export const techCatalog: TechCatalogItem[] = [
    { id: "nextjs", name: "Next.js", category: "frontend", Icon: SiNextdotjs },
    { id: "react", name: "React", category: "frontend", Icon: SiReact },
    { id: "typescript", name: "TypeScript", category: "frontend", Icon: SiTypescript },
    { id: "javascript", name: "JavaScript", category: "frontend", Icon: SiJavascript },
    { id: "mysql", name: "MySQL", category: "backend", Icon: SiMysql },
    { id: "postgresql", name: "PostgreSQL", category: "backend", Icon: SiPostgresql },
    { id: "git", name: "Git", category: "tools", Icon: SiGit },
    { id: "github", name: "GitHub", category: "tools", Icon: SiGithub },
  ];
  export function getTechById(id: string) {
    return techCatalog.find((item) => item.id === id);
  }