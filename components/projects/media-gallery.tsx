"use client";

import Image from "next/image";
import { useState } from "react";

type GalleryImage = {
    src: string;
    alt: string;
};

type MediaGalleryProps = {
    images: GalleryImage[];
};

export function MediaGallery({ images }: MediaGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const safeIndex = Math.min(activeIndex, Math.max(images.length - 1, 0));
    const active = images[safeIndex];
    if (!active) return null;
    return (
        <div className="space-y-3">
            <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-background">
                <Image
                    src={active.src}
                    alt={active.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 896px) 100vw, 896px"
                    priority
                />
            </div>
            {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                    {images.map((image, index) => (
                        <button
                            key={`${image.src}-${index}`}
                            type="button"
                            onClick={() => setActiveIndex(index)}
                            className={[
                                "relative h-16 w-28 shrink-0 overflow-hidden rounded-md border",
                                index === safeIndex
                                    ? "border-accent ring-2 ring-accent/40"
                                    : "border-border opacity-80 hover:opacity-100",
                            ].join(" ")}
                            aria-label={`Show image ${index + 1}`}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover"
                                sizes="112px"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}