import Link from "next/link";

export default function ProjectNotFound() {
    return (
        <main className="flex flex-col px-6 py-16 sm:px-10 lg:px-16">
            <div className="mx-auto w-full max-w-3xl">
                <h1 className="font-display text-2xl font-semibold">Project not found</h1>
                <Link href="/projects" className="mt-4 inline-block text-accent-bright">
                    Back to projects
                </Link>
            </div>
        </main>
    );
}