"use client";

import Image from "next/image";
import { FaLink } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";
import { useRef, useState, type MouseEvent } from "react";
import { getProjectTag, type ProjectSummary } from "@/content/projects";
import { getTechById } from "@/content/tech";
import { TagPill } from "@/components/projects/tag-pill";
import { TechIconTile } from "@/components/tech-icon-tile";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type ProjectCardProps = {
  project: ProjectSummary;
  onSelect?: () => void;
  flipped?: boolean;
  priority?: boolean;
};

function LinkIcon({ href }: { href: string }) {
  const Icon = href.includes("github.com") ? SiGithub : FaLink;
  return <Icon className="size-4" aria-hidden />;
}

export function ProjectCard({
  project,
  onSelect,
  flipped = false,
  priority = false,
}: ProjectCardProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const reduceMotion = useReducedMotion();

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (reduceMotion || !frameRef.current) return;

    const rect = frameRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    setTilt({ rotateX: -y * 10, rotateY: x * 10 });
  }

  function handleMouseLeave() {
    setTilt({ rotateX: 0, rotateY: 0 });
  }

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

  const interactive = Boolean(onSelect);
  const techItems = (project.techStack ?? [])
    .map((id) => getTechById(id))
    .filter((item) => item !== undefined);

  return (
    <article
      className="group/card relative rounded-2xl p-px shadow-lg shadow-black/20"
      onMouseMove={handleSpotlightMove}
      onMouseLeave={handleSpotlightLeave}
      style={
        reduceMotion
          ? { backgroundColor: "var(--border)" }
          : {
              background:
                "radial-gradient(320px circle at var(--spot-x, -1000px) var(--spot-y, -1000px), var(--accent-bright), var(--border) 42%)",
            }
      }
    >
      <div className="relative rounded-[inherit] bg-elevated">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 motion-reduce:opacity-0"
          style={{
            background:
              "radial-gradient(260px circle at var(--spot-x, -1000px) var(--spot-y, -1000px), var(--accent-glow), transparent 70%)",
          }}
        />
        <div
          className={[
            "pointer-events-none relative z-10 flex w-full flex-col gap-6 p-5 sm:p-8 lg:flex-row lg:items-center lg:gap-10",
            flipped ? "lg:flex-row-reverse" : "",
          ].join(" ")}
        >
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
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
              {project.links && project.links.length > 0 && (
                <div className="pointer-events-auto relative z-20 ml-1 flex shrink-0 gap-2">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="flex size-8 items-center justify-center rounded-full border border-border bg-background text-foreground outline-none transition-colors duration-200 hover:border-accent/50 hover:text-accent-bright focus-visible:border-accent/50 focus-visible:ring-2 focus-visible:ring-accent/50"
                    >
                      <LinkIcon href={link.href} />
                    </a>
                  ))}
                </div>
              )}
            </div>

            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {project.title}
            </h2>

            <p className="text-base leading-7 text-muted sm:text-lg sm:leading-8">
              {project.shortDescription}
            </p>

            {techItems.length > 0 && (
              <ul
                className="mt-2 flex flex-wrap items-center gap-1 pb-8"
                aria-label="Tech Stack"
              >
                {techItems.map((item) => (
                  <li key={item.id}>
                    <TechIconTile name={item.name} Icon={item.Icon} size="sm" />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div
            ref={frameRef}
            className="pointer-events-auto relative aspect-video w-full shrink-0 cursor-pointer overflow-hidden rounded-xl border border-border bg-background lg:w-[52%]"
            onClick={interactive ? onSelect : undefined}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={
              reduceMotion
                ? undefined
                : {
                    transform: `perspective(900px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                    transition: "transform 200ms ease-out",
                  }
            }
          >
            <Image
              src={project.thumbnail.src}
              alt=""
              fill
              quality={90}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 640px"
              priority={priority}
            />
          </div>
        </div>
        {interactive ? (
          <button
            type="button"
            onClick={onSelect}
            aria-label={`Open ${project.title}`}
            className="absolute inset-0 z-0 cursor-pointer rounded-[inherit] focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:outline-none"
          />
        ) : null}
      </div>
    </article>
  );
}
