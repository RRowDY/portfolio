"use client";

import { useEffect, useState } from "react";
// import { FaChevronDown } from "react-icons/fa6";

const TOP_THRESHOLD_PX = 32;

export function HeroScrollCue() {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY <= TOP_THRESHOLD_PX);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={[
        "pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-4",
        "transition-opacity duration-500 ease-out motion-reduce:transition-none",
        atTop ? "opacity-100" : "opacity-0",
      ].join(" ")}
      aria-hidden="true"
    >
      <p className="text-xs font-medium uppercase tracking-[0.25rem] text-foreground/80">
        Scroll
      </p>
      <div className="relative h-8 w-0.5 overflow-hidden">
        <span className="absolute inset-x-0 top-0 block h-full bg-gradient-to-b from-accent-bright to-transparent drop-shadow-[0_0_4px_rgba(96,165,250,0.75)] motion-safe:animate-scroll-hint-line motion-reduce:animate-none" />
      </div>
    </div>
  );
}
