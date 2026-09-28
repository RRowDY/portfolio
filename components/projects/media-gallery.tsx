"use client";

import Image from "next/image";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

type GalleryImage = {
  src: string;
  alt: string;
};

type MediaGalleryProps = {
  images: GalleryImage[];
  onClose?: () => void;
  flush?: boolean;
  priority?: boolean;
};

export function MediaGallery({
  images,
  onClose,
  flush = false,
  priority = false,
}: MediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const safeIndex = Math.min(activeIndex, Math.max(images.length - 1, 0));
  const active = images[safeIndex];
  if (!active) return null;

  function showPrevious() {
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  }

  function showNext() {
    setActiveIndex((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  }

  const controlClass =
    "flex size-10 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/70";

  return (
    <div
      className={
        flush
          ? "relative aspect-video overflow-hidden bg-background"
          : "relative aspect-video overflow-hidden rounded-xl border border-border bg-background"
      }
    >
      <Image
        src={active.src}
        alt={active.alt}
        fill
        quality={90}
        className="object-cover"
        sizes="(max-width: 896px) 100vw, 896px"
        priority={priority}
      />
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={`absolute top-4 right-4 z-10 ${controlClass}`}
        >
          ×
        </button>
      )}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Previous image"
            className={`absolute top-1/2 left-4 z-10 -translate-y-1/2 ${controlClass}`}
          >
            <FaChevronLeft className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label="Next image"
            className={`absolute top-1/2 right-4 z-10 -translate-y-1/2 ${controlClass}`}
          >
            <FaChevronRight className="size-4" aria-hidden />
          </button>
          <div className="absolute right-4 bottom-4 z-10 flex items-center gap-2 rounded-xl bg-black/45 p-2 backdrop-blur-sm">
            {" "}
            {images.map((image, index) => (
              <button
                key={`${image.src}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={[
                  "relative h-10 w-14 shrink-0 overflow-hidden rounded-md border",
                  index === safeIndex
                    ? "border-white"
                    : "border-transparent opacity-80 hover:opacity-100",
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
            <span className="px-1 text-sm text-white">
              {safeIndex + 1} / {images.length}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
