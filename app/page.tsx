import { site } from "@/content/site";
import { SocialLinks } from "@/components/social-links";
import { HeroScrollCue } from "@/components/hero-scroll-cue";
import { FeaturedProjectPeek } from "@/components/featured-project-peek";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
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
      className="scroll-mt-24 px-6 py-20 sm:px-10 sm:py-24 lg:px-16"
      aria-labelledby="tech-stack-heading"
    >
      <div className="mx-auto w-full max-w-5xl">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Stack"
            id="tech-stack-heading"
            title="Tech Stack"
            intro="Languages and tools I reach for when building and shipping software."
          />
        </ScrollReveal>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-5">
          {techCategories.map((category) => (
            <ScrollReveal key={category.title} className="h-full">
              <div className="h-full rounded-2xl border border-border bg-elevated p-6 text-center">
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-subtle">
                  {category.title}
                </h3>
                <ul
                  className="mt-5 flex flex-wrap items-start justify-center gap-3"
                  role="list"
                >
                  {category.items.map(({ name, Icon }) => (
                    <li key={name} role="listitem">
                      <TechIconTile name={name} Icon={Icon} />
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <section
        className="flex min-h-[calc(100svh-14rem)] flex-col items-center justify-center gap-8 px-6 pt-10 pb-10 text-center sm:gap-10 sm:px-10 sm:pt-12 lg:px-16"
        aria-label="Introduction"
      >
        <div className="flex w-full max-w-3xl flex-col items-center">
          <p className="text-sm font-medium text-accent-bright">Portfolio</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Hi, I&apos;m <span className="text-accent-bright">{site.name}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted sm:text-xl sm:leading-9">
            {site.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <ArrowChip href="/projects">View projects</ArrowChip>
            <ArrowChip href="/contact">Contact</ArrowChip>
          </div>
          <SocialLinks className="mt-7 justify-center" />
        </div>

        <FeaturedProjectPeek />
        <HeroScrollCue />
      </section>

      <AboutMeSection />
      <TechStackSection />
    </main>
  );
}
