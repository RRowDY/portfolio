import { getProjectTag, type Project } from "@/content/projects";
import { MediaGallery } from "@/components/projects/media-gallery";
import { TagPill } from "@/components/projects/tag-pill";
import { TechStack } from "@/components/projects/tech-stack";

type ProjectDetailProps = {
    project: Project;
    variant?: "page" | "modal";
};

export function ProjectDetail({ project, variant = "page" }: ProjectDetailProps) {
    const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : [project.thumbnail];
    
    const titleId = `project-title-${project.slug}`;
    const TitleTag = variant === "page" ? "h1" : "h2";

    return (
        <div className="space-y-6">
            <MediaGallery images={gallery} />
            <div className="space-y-4">
                <TitleTag
                    id={titleId}
                    className="font-display text-2xl font-semibold text-foreground sm:text-3xl"
                >
                    {project.title}
                </TitleTag>
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
                {project.techStack && project.techStack.length > 0 && (
                    <div>
                        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-subtle">
                            Tech stack
                        </p>
                        <TechStack techIds={project.techStack} />
                    </div>
                )}
                <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    {project.client && (
                        <div>
                            <dt className="text-subtle">Client</dt>
                            <dd className="text-foreground">{project.client}</dd>
                        </div>
                    )}
                    {project.completedAt && (
                        <div>
                            <dt className="text-subtle">Completed</dt>
                            <dd className="text-foreground">
                                {project.completedAt}
                            </dd>
                        </div>
                    )}
                </dl>
                {project.description && (
                    <p className="leading-relaxed text-muted">
                        {project.description}
                    </p>
                )}
                {project.links && project.links.length > 0 && (
                    <div className="flex flex-wrap gap-3 pt-2">
                        {project.links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-bright"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}