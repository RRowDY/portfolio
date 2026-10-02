"use client";

import { getProjectTag, type Project } from "@/content/projects";
import { MediaGallery } from "@/components/projects/media-gallery";
import { TagPill } from "@/components/projects/tag-pill";
import { TechStack } from "@/components/projects/tech-stack";
import { type MouseEvent } from "react";
import { ArrowChip } from "@/components/arrow-chip";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type ProjectDetailProps = {
  project: Project;
  variant?: "page" | "modal";
  onClose?: () => void;
};

export function ProjectDetail({
  project,
  variant = "page",
  onClose,
}: ProjectDetailProps) {
  const gallery =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : [project.thumbnail];

  const titleId = `project-title-${project.slug}`;
  const TitleTag = variant === "page" ? "h1" : "h2";
  const reduceMotion = useReducedMotion();
  function handleSpotlightMove(event: MouseEvent<HTMLElement>) {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--spot-x",
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--spot-y",
      `${event.clientY - rect.top}px`,
    );
  }
  function handleSpotlightLeave(event: MouseEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--spot-x", "-1000px");
    event.currentTarget.style.setProperty("--spot-y", "-1000px");
  }

  return (
    <div
      className={[
        "group/detail relative rounded-2xl p-px text-left shadow-lg shadow-black/20",
        variant === "modal" ? "max-h-[90vh] shadow-xl shadow-black/40" : "",
      ].join(" ")}
      onMouseMove={handleSpotlightMove}
      onMouseLeave={handleSpotlightLeave}
      style={
        reduceMotion
          ? { backgroundColor: "var(--border)" }
          : {
              background:
                "radial-gradient(200px circle at var(--spot-x, -1000px) var(--spot-y, -1000px), var(--accent-bright), var(--border) 42%)",
            }
      }
    >
      <div
        className={[
          "relative rounded-[inherit] bg-elevated",
          variant === "modal" ? "max-h-[inherit] overflow-hidden" : "",
        ].join(" ")}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/detail:opacity-60 motion-reduce:opacity-0"
          style={{
            background:
              "radial-gradient(160px circle at var(--spot-x, -1000px) var(--spot-y, -1000px), var(--accent-glow), transparent 70%)",
          }}
        />
        <div
          className={
            variant === "modal" ? "max-h-[inherit] overflow-y-auto" : undefined
          }
        >
          {variant === "modal" ? (
            <MediaGallery
              key={project.slug}
              images={gallery}
              onClose={onClose}
              flush
            />
          ) : null}
          <div className="space-y-6 p-5 sm:p-8">
            {variant === "page" ? (
              <MediaGallery
                key={project.slug}
                images={gallery}
                priority
              />
            ) : null}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <TitleTag
                id={titleId}
                className="min-w-0 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
              >
                {project.title}
              </TitleTag>
              <div className="flex shrink-0 flex-wrap items-center gap-6 sm:gap-8">
                {(project.client || project.completedAt) && (
                  <dl className="flex gap-6 text-right text-sm sm:gap-8">
                    {project.client && (
                      <div>
                        <dt className="text-xs text-subtle">Client</dt>
                        <dd className="mt-1 text-foreground">
                          {project.client}
                        </dd>
                      </div>
                    )}
                    {project.completedAt && (
                      <div>
                        <dt className="text-xs text-subtle">Completed</dt>
                        <dd className="mt-1 text-foreground">
                          {project.completedAt}
                        </dd>
                      </div>
                    )}
                  </dl>
                )}
                {variant === "modal" && (
                  <ArrowChip href={`/projects/${project.slug}`}>
                    View full page
                  </ArrowChip>
                )}
              </div>
            </div>
            <div className="grid gap-8 border-t border-border pt-6 lg:grid-cols-[minmax(0,1fr)_16rem]">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tagId) => {
                    const tag = getProjectTag(tagId);
                    if (!tag) return null;
                    return (
                      <TagPill
                        key={tag.id}
                        label={tag.label}
                        className={tag.className}
                      />
                    );
                  })}
                </div>
                {project.description && (
                  <p className="text-base leading-7 text-muted">
                    {project.description}
                  </p>
                )}
                {project.links && project.links.length > 0 && (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {project.links.map((link) => (
                      <ArrowChip key={link.href} href={link.href} external>
                        {link.label}
                      </ArrowChip>
                    ))}
                  </div>
                )}
              </div>
              {project.techStack && project.techStack.length > 0 && (
                <TechStack techIds={project.techStack} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
