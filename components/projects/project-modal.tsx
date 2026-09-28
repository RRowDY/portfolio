"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import type { Project } from "@/content/projects";
import { ProjectDetail } from "@/components/projects/project-detail";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!project || !dialog) return;

    dialog.showModal();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onCancel(event: Event) {
      event.preventDefault();
      onCloseRef.current();
    }
    dialog.addEventListener("cancel", onCancel);
    return () => {
      dialog.removeEventListener("cancel", onCancel);
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [project]);

  if (!project) return null;

  const titleId = `project-title-${project.slug}`;

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target == event.currentTarget) onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="project-dialog fixed inset-0 z-[60] m-0 flex h-full max-h-none w-full max-w-none items-center justify-center bg-transparent p-4 sm:p-6"
      onClick={handleBackdropClick}
    >
      <div className="relative z-10 w-full max-w-4xl">
        <ProjectDetail project={project} variant="modal" onClose={onClose} />
      </div>
    </dialog>
  );
}
