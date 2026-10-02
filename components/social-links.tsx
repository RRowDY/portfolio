import { site } from "@/content/site";
import type { IconType } from "react-icons";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";

const socialIconById = {
  github: SiGithub,
  linkedin: FaLinkedinIn,
} as const satisfies Record<string, IconType>;

type SocialIconId = keyof typeof socialIconById;

const linkClass = [
  "group relative inline-flex size-9 shrink-0 items-center justify-center",
  "text-muted transition-colors duration-200 hover:text-foreground focus-visible:text-foreground",
  "rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
].join(" ");

function labelClass(expandLeft: boolean) {
  return [
    "absolute top-1/2 flex h-full -translate-y-1/2 items-center overflow-hidden",
    "max-w-0 transition-[max-width] duration-500 ease-out motion-reduce:transition-none",
    "group-hover:max-w-32 group-focus-visible:max-w-32",
    expandLeft ? "right-full justify-end" : "left-full justify-start",
  ].join(" ");
}

type SocialLinksProps = {
  className?: string;
};

export function SocialLinks({ className }: SocialLinksProps) {
  const links = site.socialLinks;

  if (!links?.length) return null;

  return (
    <div
      className={["flex flex-wrap items-center", className]
        .filter(Boolean)
        .join(" ")}
      role="list"
      aria-label="Social profiles"
    >
      {links.map((link) => {
        const Icon = socialIconById[link.id as SocialIconId];
        // The first link expands its label leftwards so the pair stays centered.
        const expandLeft = link.id === links[0].id;
        return (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            role="listitem"
            aria-label={link.label}
            className={linkClass}
          >
            <span className={labelClass(expandLeft)} aria-hidden="true">
              <span
                className={[
                  "relative w-max whitespace-nowrap text-sm font-medium",
                  expandLeft ? "pr-2" : "pl-2",
                ].join(" ")}
              >
                {link.label}
                <span
                  className={[
                    "absolute -bottom-1 left-0 h-px w-full scale-x-0 bg-accent-bright",
                    "transition-transform duration-200 ease-out motion-reduce:transition-none",
                    "group-hover:scale-x-100 group-hover:delay-500",
                    "group-focus-visible:scale-x-100 group-focus-visible:delay-500",
                    expandLeft ? "origin-right" : "origin-left",
                  ].join(" ")}
                />
              </span>
            </span>
            <span className="flex size-9 items-center justify-center">
              {Icon ? <Icon className="size-5" aria-hidden="true" /> : null}
            </span>
          </a>
        );
      })}
    </div>
  );
}
