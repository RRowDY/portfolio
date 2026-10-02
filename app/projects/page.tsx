import { Suspense } from "react";
import { ProjectsSection } from "@/components/projects/projects-section";
import { SectionHeading } from "@/components/section-heading";
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
    <main className="flex flex-1 flex-col px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          as="h1"
          eyebrow="Work"
          title="Projects"
          intro="A look at what I've designed and built. Filter by tag to narrow it down."
        />

        <Suspense
          fallback={<p className="mt-12 text-center text-muted">Loading...</p>}
        >
          <ProjectsSection
            summaries={projects.map(toProjectSummary)}
            openProject={openProject}
          />
        </Suspense>
      </div>
    </main>
  );
}
