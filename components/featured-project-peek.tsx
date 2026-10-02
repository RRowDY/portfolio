import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { getProjectTag } from "@/content/projects";
import { getProjectBySlug } from "@/content/project-entries";
import { TagPill } from "@/components/projects/tag-pill";

function PeekArrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="size-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 8h9M8.5 4.5 12.5 8l-4 3.5" />
    </svg>
  );
}

export function FeaturedProjectPeek() {
  const featured = site.featuredSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project) => project !== undefined)
    .slice(0, 2);

  if (featured.length === 0) return null;

  return (
    <section
      id="work"
      aria-labelledby="featured-work-heading"
      className="w-full max-w-2xl scroll-mt-24"
    >
      <div className="flex items-center justify-between gap-4">
        <h2
          id="featured-work-heading"
          className="text-xs font-medium uppercase tracking-[0.2em] text-subtle"
        >
          Selected work
        </h2>
        <Link
          href="/projects"
          className="group inline-flex items-center gap-1.5 rounded-md text-xs font-medium text-muted outline-none transition-colors duration-200 hover:text-accent-bright focus-visible:text-accent-bright focus-visible:ring-2 focus-visible:ring-accent/50"
        >
          All projects
          <PeekArrow />
        </Link>
      </div>

      <ul className="mt-3 grid grid-cols-2 gap-3 sm:gap-4">
        {featured.map((project) => {
          const tag = getProjectTag(project.tags[0] ?? "");

          return (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className={[
                  "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-elevated text-left outline-none",
                  "transition-[border-color,transform,box-shadow] duration-300 ease-out",
                  "hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-accent-glow",
                  "focus-visible:border-accent/50 focus-visible:ring-2 focus-visible:ring-accent/50",
                  "motion-reduce:transform-none motion-reduce:transition-none",
                ].join(" ")}
              >
                <div className="relative aspect-video w-full overflow-hidden bg-background">
                  <Image
                    src={project.thumbnail.src}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 45vw, 320px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
                    quality={90}
                    priority
                  />
                </div>
                <div className="flex min-w-0 flex-1 items-center gap-2 p-3">
                  <p className="min-w-0 flex-1 truncate font-display text-sm font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-accent-bright">
                    {project.title}
                  </p>
                  {tag ? (
                    <span className="hidden sm:block">
                      <TagPill
                        label={tag.label}
                        className={tag.className}
                        size="sm"
                      />
                    </span>
                  ) : null}
                  <span className="shrink-0 text-muted transition-colors duration-200 group-hover:text-accent-bright sm:hidden">
                    <PeekArrow />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
