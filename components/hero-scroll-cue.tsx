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
        <div
          className={[
            "pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-1.5",
            "transition-opacity duration-500 ease-out motion-reduce:transition-none",
            atTop ? "opacity-100" : "opacity-0",
          ].join(" ")}
          aria-hidden="true"
        >
          <p className="text-xs font-medium tracking-wide text-muted">
            Scroll to see more
          </p>
          <FaChevronDown
            className="size-4 text-muted motion-safe:animate-scroll-hint-bounce motion-reduce:animate-none"
            aria-hidden
          />
        </div>
      );
}