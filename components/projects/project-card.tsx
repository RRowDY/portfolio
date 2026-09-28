"use client";

import Image from "next/image";
import { FaLink } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";
import { useSyncExternalStore, useRef, useState, type MouseEvent } from "react";
import { getProjectTag, type Project } from "@/content/projects";
import { getTechById } from "@/content/tech";
import { TagPill } from "@/components/projects/tag-pill";
import { TechIconTile } from "@/components/tech-icon-tile";

const REDUCED_MOTION_MEDIA_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION_MEDIA_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}
function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_MEDIA_QUERY).matches;
}
function getReducedMotionServerSnapshot() {
  return true;
}

type ProjectCardProps = {
  project: Project;
  onSelect?: () => void;
  flipped?: boolean;
};

function LinkIcon({ href }: { href: string }) {
  const Icon = href.includes("github.com") ? SiGithub : FaLink;
  return <Icon className="size-4" aria-hidden />;
}

export function ProjectCard({
  project,
  onSelect,
  flipped = false,
}: ProjectCardProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

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
        />{" "}
        {project.links && project.links.length > 0 && (
          <div
            className={[
              "absolute top-6 z-10 flex gap-2",
              flipped ? "left-6 lg:left-auto lg:right-6" : "left-6",
            ].join(" ")}
          >
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="flex size-10 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-105"
              >
                <LinkIcon href={link.href} />
              </a>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={onSelect}
          disabled={!interactive}
          className={[
            "flex w-full flex-col gap-6 p-5 text-left sm:p-8 lg:flex-row lg:items-center lg:gap-10",
            flipped ? "lg:flex-row-reverse" : "",
            interactive ? "cursor-pointer" : "",
          ].join(" ")}
        >
          <div
            className={[
              "flex min-w-0 flex-1 flex-col gap-4",
              project.links && project.links.length > 0 ? "pt-14" : "",
            ].join(" ")}
          >
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
            className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl border border-border bg-background lg:w-[52%]"
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
            />
          </div>
        </button>
      </div>
    </article>
  );
}
