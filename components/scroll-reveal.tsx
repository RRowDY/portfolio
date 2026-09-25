"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ScrollRevealProps = {
    children: ReactNode;
    className?: string;
};

const SHIFT_REM = 2.25;

function enterProgress(top: number, viewportHeight: number) {
    const hiddenAt = viewportHeight * 0.98;
    const shownAt = viewportHeight * 0.68;
    const raw = (hiddenAt - top) / (hiddenAt - shownAt);
    return Math.min(1, Math.max(0, raw));
}

function enterOpacity(progress: number) {
    return 1 - (1 - progress) ** 2.2;
}

export function ScrollReveal({ children, className }: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const showFully = () => {
            el.style.opacity = "1";
            el.style.transform = "none";
            el.style.pointerEvents = "auto";
        };

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            showFully();
            return;
        }

        let peak = 0;
        let frame = 0;

        const apply = (progress: number) => {
            if (progress <= 0) {
                peak = 0;
                el.style.opacity = "0";
                el.style.transform = `translate3d(0, ${SHIFT_REM}rem, 0)`;
                el.style.pointerEvents = "none";
                return;
            }

            if (progress >= peak) {
                peak = progress;
                el.style.transform = `translate3d(0, ${(1 - progress) * SHIFT_REM}rem, 0)`;
            }

            el.style.opacity = String(enterOpacity(progress));
            el.style.pointerEvents = progress < 0.15 ? "none" : "auto";
        };

        const update = () => {
            frame = 0;
            const { top } = el.getBoundingClientRect();
            apply(enterProgress(top, window.innerHeight));
        };

        const onScroll = () => {
            if (frame) return;
            frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <div
            ref={ref}
            className={className}
            style={{ opacity: 0, transform: `translate3d(0, ${SHIFT_REM}rem, 0)` }}
        >
            {children}
        </div>
    );
}
