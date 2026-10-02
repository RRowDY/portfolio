"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Project, ProjectSummary, ProjectTagId } from "@/content/projects";
import { filterProjectsByTags } from "@/content/filter-projects";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectModal } from "@/components/projects/project-modal";
import { TagFilter } from "@/components/projects/tag-filter";
import { ScrollReveal } from "@/components/scroll-reveal";

type ProjectsSectionProps = {
  summaries: ProjectSummary[];
  openProject: Project | null;
};

function countLabel(shown: number, total: number) {
  const noun = total === 1 ? "project" : "projects";
  if (shown === total) return `${total} ${noun}`;
  return `Showing ${shown} of ${total} ${noun}`;
}

export function ProjectsSection({
  summaries,
  openProject,
}: ProjectsSectionProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedTagIds, setSelectedTagIds] = useState<ProjectTagId[]>([]);

  const filteredProjects = useMemo(() => {
    return filterProjectsByTags(summaries, selectedTagIds);
  }, [summaries, selectedTagIds]);

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
      <div className="mt-12 flex flex-col items-center gap-4">
        <TagFilter selectedIds={selectedTagIds} onChange={setSelectedTagIds} />
        <p aria-live="polite" className="text-sm text-subtle">
          {countLabel(filteredProjects.length, summaries.length)}
        </p>
      </div>

      {filteredProjects.length === 0 ? (
        <p className="mt-12 text-center text-muted">
          No projects match these tags.
        </p>
      ) : (
        <div className="mt-10 flex flex-col gap-8 text-left">
          {filteredProjects.map((project, index) => (
            <ScrollReveal key={project.slug}>
              <ProjectCard
                project={project}
                flipped={index % 2 === 1}
                onSelect={() => openModal(project.slug)}
                priority={index === 0}
              />
            </ScrollReveal>
          ))}
        </div>
      )}

      <ProjectModal project={openProject} onClose={closeModal} />
    </>
  );
}
