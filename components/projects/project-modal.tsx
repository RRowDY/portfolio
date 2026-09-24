"use client";

import { useEffect } from "react";
import type { Project } from "@/content/projects";
import { ProjectDetail } from "@/components/projects/project-detail";
import Link from "next/link";

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

    const titleId = `project-title-${project.slug}`;

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
                <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-border/60 bg-elevated/95 p-3 backdrop-blur-sm">
                    <Link
                        href={`/projects/${project.slug}`}
                        className="text-sm font-medium text-muted transition-colors hover:text-accent-bright"
                    >
                        View full page
                    </Link>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border border-border px-3 py-1 text-sm text-muted transition-colors hover:text-foreground"
                    >
                        Close
                    </button>
                </div>

                <div className="p-5 sm:p-6">
                    <ProjectDetail project={project} variant="modal" />
                </div>
            </div>
        </div>
    );
}