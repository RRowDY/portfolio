"use client";
import { useCallback, useState } from "react";
import { site } from "@/content/site";
import { ScrollReveal } from "@/components/scroll-reveal";
import {
  TYPEWRITER_DURATION_MS,
  TypewriterText,
} from "@/components/typewriter-text";

function AboutHighlightCard({
  item,
}: {
  item: (typeof site.about.highlights)[number];
}) {
  return (
    <div
      className={[
        "h-full rounded-2xl border border-border bg-elevated p-5 text-left",
        "transition-colors duration-300 ease-out motion-reduce:transition-none",
        "hover:border-accent/20 hover:bg-[color-mix(in_srgb,var(--accent)_5%,var(--bg-elevated))]",
      ].join(" ")}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-accent-bright">
        {item.label}
      </p>
      <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-foreground">
        {item.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
    </div>
  );
}

export function AboutMeSection() {
  const [leadDone, setLeadDone] = useState(false);
  const [bodyDone, setBodyDone] = useState(false);
  const handleLeadComplete = useCallback((complete: boolean) => {
    setLeadDone(complete);
    if (!complete) setBodyDone(false);
  }, []);
  const handleBodyComplete = useCallback((complete: boolean) => {
    setBodyDone(complete);
  }, []);
  return (
    <section
      className="flex min-h-[calc(100dvh-4rem)] snap-start scroll-mt-16 flex-col items-center justify-center px-6 py-12 text-center sm:px-10 lg:px-16"
      aria-labelledby="about-me-heading"
    >
      <div className="mx-auto w-full max-w-6xl">
        <ScrollReveal>
          <p className="text-sm font-medium text-accent-bright">About</p>
          <h2
            id="about-me-heading"
            className="mt-3 font-display text-5xl font-semibold tracking-tight text-foreground sm:text-6xl"
          >
            About Me
          </h2>
          <TypewriterText
            text={site.about.lead}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl sm:leading-9"
            onComplete={handleLeadComplete}
          />
          <span
            aria-hidden
            className={[
              "mx-auto mt-6 block h-0.5 w-10 origin-center bg-accent-bright",
              "transition-transform duration-[400ms] ease-out motion-reduce:transition-none",
              leadDone ? "scale-x-100" : "scale-x-0 motion-reduce:scale-x-100",
            ].join(" ")}
          />
          <TypewriterText
            key={leadDone ? "body-on" : "body-off"}
            text={site.about.body}
            play={leadDone}
            onComplete={handleBodyComplete}
            durationMs={Math.round(
              TYPEWRITER_DURATION_MS *
                (site.about.body.length / site.about.lead.length),
            )}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl sm:leading-9"
          />
        </ScrollReveal>
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-4 sm:gap-5">
          {site.about.highlights.map((item, index) => (
            <li
              key={item.label}
              className={[
                "motion-safe:transition-[opacity,translate] motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]",
                "motion-reduce:transition-none",
                bodyDone
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-[2.25rem] opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100",
              ].join(" ")}
              style={{ transitionDelay: bodyDone ? `${index * 140}ms` : "0ms" }}
            >
              <AboutHighlightCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
