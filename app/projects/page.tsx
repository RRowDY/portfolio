import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/projects/project-card";

export default function ProjectsPage() {
    return (
        <main className="flex flex-1 flex-col px-6 py-16 sm:px-10 lg:px-16">
            <div className="mx-auto w-full max-w-6xl">
                <p className="text-sm font-medium text-accent-bright">Work</p>
                <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                    Projects
                </h1>
                <p className="mt-4 max-w-2xl text-muted">
                    Things I&apos;ve built — more detail coming soon.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                    ))}
                </div>
            </div>
        </main>
    );
}

// export default function ProjectsPage() {
//     return (
//       <main className="flex flex-1 flex-col px-6 py-16 sm:px-10 lg:px-16">
//         <div className="mx-auto w-full max-w-3xl">
//           <h1 className="font-display text-3xl font-semibold">Projects</h1>
//           <p className="mt-4 text-muted">Coming soon.</p>
//         </div>
//       </main>
//     );
//   }