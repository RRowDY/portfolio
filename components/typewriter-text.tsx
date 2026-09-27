"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

// Duration for the typewriter animation in milliseconds (1.2 seconds)
export const TYPEWRITER_DURATION_MS = 1200;
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
  return false;
}

type TypewriterTextProps = {
  text: string;
  className?: string;
  onComplete?: (complete: boolean) => void;
  play?: boolean;
  durationMs?: number;
};

export function TypewriterText({
  text,
  className,
  onComplete,
  play = true,
  durationMs = TYPEWRITER_DURATION_MS,
}: TypewriterTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [shown, setShown] = useState(0);
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  useEffect(() => {
    if (!reduceMotion) return;
    onComplete?.(true);
  }, [reduceMotion, onComplete]);

  useEffect(() => {
    const el = ref.current;

    if (!el || reduceMotion || !play) return;

    let frame = 0;
    let running = false;
    let finished = false;

    const stopFrame = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      running = false;
    };

    const start = () => {
      if (running || finished) return;
      running = true;
      const startTime = performance.now();

      const tick = (now: number) => {
        const progress = Math.min(1, (now - startTime) / durationMs);
        if (progress >= 1) {
          setShown(text.length);
          running = false;
          finished = true;
          frame = 0;
          onComplete?.(true);
          return;
        }
        setShown(Math.floor(progress * text.length));
        frame = requestAnimationFrame(tick);
      };

      frame = requestAnimationFrame(tick);
    };

    const reset = () => {
      if (!finished && !running) return;
      stopFrame();
      finished = false;
      setShown(0);
      onComplete?.(false);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.intersectionRatio >= 0.5) start();
      },
      {
        threshold: [0, 0.5],
      },
    );

    // Replay only after a return to the top of the page. Leaving the
    // section downward keeps the finished text in place.
    const onScroll = () => {
      if (window.scrollY > 8) return;
      const rect = el.getBoundingClientRect();
      const inView = rect.bottom > 0 && rect.top < window.innerHeight;
      if (inView) return;
      reset();
    };

    observer.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      stopFrame();
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [text, reduceMotion, onComplete, play, durationMs]);

  const visibleCount = reduceMotion ? text.length : play ? shown : 0;
  const done = !play || visibleCount >= text.length;
  const caretIndex = visibleCount === 0 ? 0 : visibleCount - 1;

  return (
    <p ref={ref} className={className}>
      {Array.from(text).map((char, index) => {
        const showCaret = !done && index === caretIndex;
        return (
          <span key={index} className={showCaret ? "relative" : undefined}>
            <span style={{ opacity: index < visibleCount ? 1 : 0 }}>
              {char}
            </span>
            {showCaret ? (
              <span
                aria-hidden
                className={[
                  "absolute top-[0.1em] h-[0.9em] w-0.5 bg-accent-bright motion-safe:animate-pulse",
                  visibleCount === 0 ? "left-0" : "left-full",
                ].join(" ")}
              />
            ) : null}
          </span>
        );
      })}
    </p>
  );
}
