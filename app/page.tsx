import { site } from "@/content/site";
import { HeroSocialLinks } from "@/components/hero-social-links";
import { HeroScrollCue } from "@/components/hero-scroll-cue";
import { ScrollReveal } from "@/components/scroll-reveal";
import { AboutMeSection } from "@/components/about-me-section";
import { TechIconTile } from "@/components/tech-icon-tile";
import {
  techCatalog,
  techCategoryOrder,
  techCategoryTitles,
} from "@/content/tech";
import { ArrowChip } from "@/components/arrow-chip";

const techCategories = techCategoryOrder.map((categoryId) => ({
  title: techCategoryTitles[categoryId],
  items: techCatalog.filter((item) => item.category === categoryId),
}));

function TechStackSection() {
  return (
    <section
      className="flex min-h-[calc(100dvh-4rem)] snap-start scroll-mt-16 flex-col items-center justify-center px-6 py-12 text-center sm:px-10 lg:px-16"
      aria-labelledby="tech-stack-heading"
    >
      <div className="mx-auto w-full max-w-4xl">
        <ScrollReveal>
          <p className="text-sm font-medium text-accent-bright">Stack</p>
          <h2
            id="tech-stack-heading"
            className="mt-3 font-display text-5xl font-semibold tracking-tight text-foreground sm:text-6xl"
          >
            Tech Stack
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">
            Languages and tools I reach for when building and shipping software.
          </p>
        </ScrollReveal>
        <div className="mt-12 flex flex-col items-center gap-10 sm:mt-14 sm:flex-row sm:items-start sm:justify-center sm:gap-16">
          {techCategories.map((category) => (
            <ScrollReveal key={category.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                {category.title}
              </h3>
              <ul
                className="mt-4 flex flex-wrap justify-center gap-3"
                role="list"
              >
                {category.items.map(({ name, Icon }) => (
                  <li key={name} role="listitem">
                    <TechIconTile name={name} Icon={Icon} />
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    // <main className="flex flex-1 flex-col px-6 py-24 sm:px-10 lg:px-16">
    //   <div className="mx-auto w-full max-w-3xl">
    //     <p className="text-sm font-medium text-accent-bright">Portfolio</p>
    //     <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Hi, I'm <span className="text-accent-bright">{site.name}</span></h1>
    //     <HeroSocialLinks />
    //     <p className="mt-4 text-lg leading-8 text-muted">
    //       {site.description}
    //     </p>
    //     <div className="mt-10 flex items-center gap-x-6">
    //       <a
    //         href="/projects"
    //         className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-bright"
    //       >
    //         View projects
    //       </a>
    //       <a
    //         href="/contact"
    //         className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-bright"
    //       >
    //         Contact
    //       </a>
    //     </div>
    <main className="flex flex-1 flex-col">
      <section
        className="relative flex min-h-[calc(100dvh-4rem)] snap-start scroll-mt-16 flex-col items-center justify-center px-6 py-12 text-center sm:px-10 lg:px-16"
        aria-label="Introduction"
      >
        <div className="mx-auto w-full max-w-4xl">
          <p className="text-sm font-medium text-accent-bright">Portfolio</p>
          <h1 className="mt-3 font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Hi, I&apos;m <span className="text-accent-bright">{site.name}</span>
          </h1>
          <div className="mt-8 flex justify-center">
            <HeroSocialLinks />
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">
            {site.description}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <ArrowChip href="/projects">View projects</ArrowChip>
            <ArrowChip href="/contact">Contact</ArrowChip>
          </div>
        </div>
        <HeroScrollCue />
      </section>
      <AboutMeSection />
      <TechStackSection />
    </main>
  );
}
