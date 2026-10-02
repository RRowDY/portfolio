import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/projects/project-detail";
import { getProjectBySlug, projects } from "@/content/project-entries";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: `${project.title} | Projects`,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: [{ url: project.thumbnail.src }],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
      <div className="mx-auto w-full max-w-4xl">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 rounded-md text-sm font-medium text-muted outline-none transition-colors duration-200 hover:text-accent-bright focus-visible:text-accent-bright focus-visible:ring-2 focus-visible:ring-accent/50"
        >
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5 motion-reduce:transition-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12.5 8h-9M7.5 4.5 3.5 8l4 3.5" />
          </svg>
          Back to projects
        </Link>

        <div className="mt-10">
          <ProjectDetail project={project} variant="page" />
        </div>
      </div>
    </main>
  );
}
