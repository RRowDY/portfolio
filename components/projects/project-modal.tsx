"use client";

import { useEffect } from "react";
import { getProjectTag, type Project } from "@/content/projects";
import { MediaGallery } from "@/components/projects/media-gallery";
import { TagPill } from "@/components/projects/tag-pill";
import { TechStack } from "@/components/projects/tech-stack";

type ProjectModalProps = {
    project: Project | null;
    onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
    useEffect(() => {
        if (!project) return;

        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") onClose();
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [project, onClose]);

    if (!project) return null;

    const gallery =
        project.gallery && project.gallery.length > 0
            ? project.gallery
            : [project.thumbnail];

    const titleId = `project-modal-title-${project.slug}`;

    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
        >
            <button
                type="button"
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                aria-label="Close dialog"
                onClick={onClose}
            />

            <div
                className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-border bg-elevated shadow-xl"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="sticky top-0 z-10 flex justify-end border-b border-border/60 bg-elevated/95 p-3 backdrop-blur-sm">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border border-border px-3 py-1 text-sm text-muted transition-colors hover:text-foreground"
                    >
                        Close
                    </button>
                </div>

                <div className="space-y-6 p-5 sm:p-6">
                    <MediaGallery images={gallery} />

                    <div className="space-y-4">
                        <h2
                            id={titleId}
                            className="font-display text-2xl font-semibold text-foreground sm:text-3xl"
                        >
                            {project.title}
                        </h2>

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
                                <TechStack tech={project.techStack} />
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
            </div>
        </div>
    );
}