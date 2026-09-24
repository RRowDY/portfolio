import { Suspense } from "react";
import { ProjectsSection } from "@/components/projects/projects-section";

export default function ProjectsPage() {
    return (
        <main className="flex flex-col px-6 py-16 sm:px-10 lg:px-16">
            <div className="mx-auto w-full max-w-6xl">
                <p className="text-sm font-medium text-accent-bright">Work</p>
                <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                    Projects
                </h1>
                <p className="mt-4 max-w-2xl text-muted">
                    Filter by tag to explore work by area.
                </p>

                <Suspense
                    fallback={
                        <p className="mt-10 text-muted">Loading projects...</p>
                    }
                >
                    <ProjectsSection />
                </Suspense>
            </div>
        </main>
    );
}