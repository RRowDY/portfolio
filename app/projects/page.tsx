import { Suspense } from "react";
import { ProjectsSection } from "@/components/projects/projects-section";
import {
  getProjectBySlug,
  projects,
  toProjectSummary,
} from "@/content/project-entries";

type ProjectsPageProps = {
  searchParams: Promise<{ project?: string }>;
};
export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const params = await searchParams;
  const openProject = params.project
    ? (getProjectBySlug(params.project) ?? null)
    : null;
  return (
    <main className="flex flex-col px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-6xl text-center">
        <p className="text-sm font-medium text-accent-bright">Work</p>
        <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
          Projects
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">
          Filter by tag to explore work by area.
        </p>

        <Suspense
          fallback={<p className="mt-10 text-muted">Loading projects...</p>}
        >
          <ProjectsSection
            summaries={projects.map(toProjectSummary)}
            openProject={openProject}
          />{" "}
        </Suspense>
      </div>
    </main>
  );
}
