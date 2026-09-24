import Image from "next/image";
import { getProjectTag, type Project } from "@/content/projects";
import { TagPill } from "./tag-pill";

type ProjectCardProps = {
    project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <article
            className="flex flex-col overflow-hidden rounded-xl border border-border bg-elevated/50"
        >
            <div className="relative aspect-video overflow-hidden">
                <Image
                    src={project.thumbnail.src}
                    alt={project.thumbnail.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority
                    placeholder="blur"
                    blurDataURL={project.thumbnail.src}
                />
            </div>

            <div className="flex flex-1 flex-col gap-3 p-4">
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tagId) => {
                        const tag = getProjectTag(tagId);
                        if (!tag) return null;
                        return (
                            <TagPill
                                key={tag.id}
                                label={tag.label}
                                className={tag.className}
                            />
                        );
                    })}
                </div>

                <h2 className="font-display text-lg font-semibold text-foreground">
                    {project.title}
                </h2>

                <p className="text-sm leading-relaxed text-muted">
                    {project.shortDescription}
                </p>
            </div>
        </article>
    );
}