"use client";

import Image from "next/image";
import {
  useSyncExternalStore,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { getProjectTag, type Project } from "@/content/projects";
import { TagPill } from "@/components/projects/tag-pill";

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
};

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
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

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (!onSelect) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect();
    }
  }

  const interactive = Boolean(onSelect);

  return (
    <article
      className={[
        "flex flex-col overflow-hidden rounded-xl border border-border bg-elevated/50",
        interactive ? "cursor-pointer" : "",
      ].join(" ")}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      <div
        ref={frameRef}
        className="relative aspect-video overflow-hidden"
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
          alt={project.thumbnail.alt}
          fill
          quality={90}
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
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

        <h2 className="font-display text-lg font-semibold text-foreground">
          {project.title}
        </h2>

        <p className="text-sm leading-relaxed text-muted">
          {project.shortDescription}
        </p>
      </div>
    </article>
  );
}
