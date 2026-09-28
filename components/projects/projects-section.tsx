"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  getProjectBySlug,
  projects,
  type Project,
  type ProjectTagId,
} from "@/content/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectModal } from "@/components/projects/project-modal";
import { TagFilter } from "@/components/projects/tag-filter";

export function ProjectsSection() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedTagIds, setSelectedTagIds] = useState<ProjectTagId[]>([]);

  const filteredProjects = useMemo(() => {
    if (selectedTagIds.length === 0) return projects;

    return projects.filter((project) =>
      project.tags.some((tagId) => selectedTagIds.includes(tagId)),
    );
  }, [selectedTagIds]);

  const slugFromUrl = searchParams.get("project");
  const openProject: Project | null = slugFromUrl
    ? (getProjectBySlug(slugFromUrl) ?? null)
    : null;

  const openModal = useCallback(
    (slug: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("project", slug);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const closeModal = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("project");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }, [pathname, router, searchParams]);

  return (
    <>
      <div className="mt-8">
        <TagFilter selectedIds={selectedTagIds} onChange={setSelectedTagIds} />
      </div>

      {filteredProjects.length === 0 ? (
        <p className="mt-10 text-muted">No projects match these tags.</p>
      ) : (
        <div className="mt-12 flex flex-col gap-8 text-left">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              flipped={index % 2 === 1}
              onSelect={() => openModal(project.slug)}
            />
          ))}
        </div>
      )}

      <ProjectModal project={openProject} onClose={closeModal} />
    </>
  );
}
