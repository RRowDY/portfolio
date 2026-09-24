"use client";

import Image from "next/image";
import {
    useEffect,
    useRef,
    useState,
    type MouseEvent,
} from "react";
import { getProjectTag, type Project } from "@/content/projects";
import { TagPill } from "./tag-pill";

type ProjectCardProps = {
    project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
    const frameRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({rotateX: 0, rotateY: 0});
    const [reduceMotion, setReduceMotion] = useState(true);

    useEffect(() => {
        setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }, []);

    function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
        if (reduceMotion || !frameRef.current) return;

        const rect = frameRef.current.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        setTilt({rotateX: -y * 10, rotateY: x * 10});
    }

    function handleMouseLeave() {
        setTilt({rotateX: 0, rotateY: 0});
    }

    return (
        <article
            className="flex flex-col overflow-hidden rounded-xl border border-border bg-elevated/50"
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

// import Image from "next/image";
// import { getProjectTag, type Project } from "@/content/projects";
// import { TagPill } from "./tag-pill";

// type ProjectCardProps = {
//     project: Project;
// };

// export function ProjectCard({ project }: ProjectCardProps) {
//     return (
//         <article
//             className="flex flex-col overflow-hidden rounded-xl border border-border bg-elevated/50"
//         >
//             <div className="relative aspect-video overflow-hidden">
//                 <Image
//                     src={project.thumbnail.src}
//                     alt={project.thumbnail.alt}
//                     fill
//                     className="object-cover"
//                     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                     priority
//                     placeholder="blur"
//                     blurDataURL={project.thumbnail.src}
//                 />
//             </div>

//             <div className="flex flex-1 flex-col gap-3 p-4">
//                 <div className="flex flex-wrap gap-2">
//                     {project.tags.map((tagId) => {
//                         const tag = getProjectTag(tagId);
//                         if (!tag) return null;
//                         return (
//                             <TagPill
//                                 key={tag.id}
//                                 label={tag.label}
//                                 className={tag.className}
//                             />
//                         );
//                     })}
//                 </div>

//                 <h2 className="font-display text-lg font-semibold text-foreground">
//                     {project.title}
//                 </h2>

//                 <p className="text-sm leading-relaxed text-muted">
//                     {project.shortDescription}
//                 </p>
//             </div>
//         </article>
//     );
// }