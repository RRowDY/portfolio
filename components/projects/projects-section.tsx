"use client";

import { useMemo, useState } from "react";
import { projects, type Project, type ProjectTagId } from "@/content/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectModal } from "@/components/projects/project-modal";
import { TagFilter } from "@/components/projects/tag-filter";

export function ProjectsSection() {
    const [selectedTagIds, setSelectedTagIds] = useState<ProjectTagId[]>([]);
    const [openSlug, setOpenSlug] = useState<string | null>(null);

    const filteredProjects = useMemo(() => {
        if (selectedTagIds.length === 0) return projects;

        return projects.filter((project) =>
            project.tags.some((tagId) => selectedTagIds.includes(tagId)),
        );
    }, [selectedTagIds]);

    const openProject: Project | null =
        openSlug == null
            ? null
            : projects.find((p) => p.slug === openSlug) ?? null;

    return (
        <>
            <div className="mt-8">
                <TagFilter
                    selectedIds={selectedTagIds}
                    onChange={setSelectedTagIds}
                />
            </div>

            {filteredProjects.length === 0 ? (
                <p className="mt-10 text-muted">No projects match these tags.</p>
            ) : (
                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map((project) => (
                        <ProjectCard
                            key={project.slug}
                            project={project}
                            onSelect={() => setOpenSlug(project.slug)}
                        />
                    ))}
                </div>
            )}

            <ProjectModal
                project={openProject}
                onClose={() => setOpenSlug(null)}
            />
        </>
    );
}