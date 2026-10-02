"use client";

import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

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
    <a
      href="#about"
      className={[
        "flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-elevated/70 text-muted outline-none backdrop-blur-sm",
        "transition-[opacity,color,border-color] duration-300 ease-out motion-reduce:transition-none",
        "hover:border-accent/50 hover:text-accent-bright",
        "focus-visible:border-accent/50 focus-visible:text-accent-bright focus-visible:ring-2 focus-visible:ring-accent/50",
        atTop ? "opacity-100" : "pointer-events-none opacity-0",
      ].join(" ")}
    >
      <span className="sr-only">Skip to the about section</span>
      <FaChevronDown
        aria-hidden="true"
        className="size-3.5 motion-safe:animate-scroll-cue-bob"
      />
    </a>
  );
}
