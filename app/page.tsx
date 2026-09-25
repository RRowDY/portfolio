import { site } from "@/content/site";
import { HeroSocialLinks } from "@/components/hero-social-links";
import type { IconType } from "react-icons";
import {
  SiGit,
  SiGithub,
  SiJavascript,
  SiMysql,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
  SiTypescript,
} from "react-icons/si";

type TechItem = {
  name: string;
  Icon: IconType;
};

type TechCategory = {
  title: string;
  items: TechItem[];
};

const techCategories: TechCategory[] = [
  {
    title: "Front-End",
    items: [
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "React", Icon: SiReact },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "JavaScript", Icon: SiJavascript },
    ],
  },
  {
    title: "Back-End & data",
    items: [
      { name: "MySQL", Icon: SiMysql },
      { name: "PostgreSQL", Icon: SiPostgresql },
    ],
  },
  {
    title: "Tools & workflow",
    items: [
      { name: "Git", Icon: SiGit },
      { name: "GitHub", Icon: SiGithub },
    ],
  },
];

function TechStackSection() {
  return (
    <section className="mt-16 border-t border-border/60 pt-12" aria-labelledby="tech-stack-heading">
      <p className="text-sm font-medium text-accent-bright">Stack</p>
      <h2
        id="tech-stack-heading"
        className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"      >
        Tech Stack
      </h2>
      <p className="mt-4 text-lg leading-8 text-muted">
        Languages and tools I reach for when building and shipping software.
      </p>
      <div className="mt-8 flex flex-col gap-10">
        {techCategories.map((category) => (
          <div key={category.title}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
              {category.title}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-3" role="list">
              {category.items.map(({ name, Icon }) => (
                <li key={name} role="listitem">
                  <div
                    className="group relative flex flex-col items-center"
                    aria-label={name}
                  >
                    <div
                      className={[
                        "flex size-12 items-center justify-center rounded-xl border border-transparent",
                        "text-muted transition-[transform,color,border-color,box-shadow] duration-200 ease-in-out",
                        "group-hover:scale-105 group-hover:border-accent group-hover:text-accent",
                        "group-focus-within:scale-105 group-focus-within:border-accent group-focus-within:text-accent",
                        "motion-reduce:transition-none motion-reduce:group-hover:scale-100",
                      ].join(" ")}
                    >
                      <Icon className="size-6 shrink-0" aria-hidden />
                    </div>
                    <span
                      className={[
                        "pointer-events-none absolute top-full z-10 mt-2 whitespace-nowrap rounded-md",
                        "border border-border bg-elevated px-2.5 py-1 text-sm font-medium text-foreground",
                        "opacity-0 transition-[opacity,transform] duration-200 ease-in-out",
                        "translate-y-1 group-hover:opacity-100 group-hover:translate-y-0",
                        "group-focus-within:opacity-100 group-focus-within:translate-y-0",
                        "motion-reduce:transition-none",
                      ].join(" ")}
                      aria-hidden
                    >
                      {name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="flex flex-1 flex-col px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-sm font-medium text-accent-bright">Portfolio</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Hi, I'm <span className="text-accent-bright">{site.name}</span></h1>
        <HeroSocialLinks />
        <p className="mt-4 text-lg leading-8 text-muted">
          {site.description}
        </p>
        <div className="mt-10 flex items-center gap-x-6">
          <a
            href="/projects"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-bright"
          >
            View projects
          </a>
          <a
            href="/contact"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-bright"
          >
            Contact
          </a>
        </div>
        <TechStackSection />
      </div>
    </main>
  );
}