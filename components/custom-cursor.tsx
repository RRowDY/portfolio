"use client";

import { useEffect, useRef } from "react";

const TEXT_FIELD = "input, textarea, select, [contenteditable='true']";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!cursor || !ring || !dot) return;

    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const canUseCustomCursor = () =>
      finePointer.matches && !reducedMotion.matches;

    const syncMode = () => {
      const enabled = canUseCustomCursor();
      document.documentElement.classList.toggle("custom-cursor", enabled);
      if (!enabled) cursor.classList.add("opacity-0");
    };

    const onMove = (event: MouseEvent) => {
      if (!canUseCustomCursor()) return;

      const target = event.target;
      const overTextField =
        target instanceof Element && target.closest(TEXT_FIELD) !== null;

      const overInteractive =
        target instanceof Element &&
        target.closest("a[href], button:not(:disabled)") !== null;

      cursor.classList.toggle("opacity-0", overTextField);

      cursor.classList.toggle("is-hover", overInteractive && !overTextField);
      const position = `translate(${event.clientX}px, ${event.clientY}px)`;
      dot.style.transform = position;
      ring.style.transform = position;
    };

    const onLeave = () => {
      cursor.classList.add("opacity-0");
    };

    syncMode();
    finePointer.addEventListener("change", syncMode);
    reducedMotion.addEventListener("change", syncMode);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      finePointer.removeEventListener("change", syncMode);
      reducedMotion.removeEventListener("change", syncMode);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return (
    <div
      ref={cursorRef}
      className="custom-cursor-root pointer-events-none fixed top-0 left-0 z-[70] opacity-0"
      aria-hidden="true"
    >
      <span ref={ringRef} className="custom-cursor-ring">
        <span className="custom-cursor-ring-shape" />
      </span>
      <span ref={dotRef} className="custom-cursor-dot">
        <span className="custom-cursor-dot-shape" />
      </span>{" "}
    </div>
  );
}
