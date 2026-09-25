import { site } from "@/content/site";
// import { socialIconById, type SocialIconId } from "@/components/icons/social-icons";
import type { IconType } from "react-icons";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";

const socialIconById = {
    github: SiGithub,
    linkedin: FaLinkedinIn,
} as const satisfies Record<string, IconType>;

type SocialIconId = keyof typeof socialIconById;

const ICON_SLOT = "2.25rem";

const linkClass = [
    "group relative inline-flex shrink-0 py-1",
    "text-muted transition-colors duration-200 hover:text-foreground focus-visible:text-foreground",
    "outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
    "after:pointer-events-none after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-[calc(100%-var(--social-icon-slot))] after:origin-left after:bg-accent-bright after:content-['']",
    "after:scale-x-0 after:transition-transform after:duration-200 after:ease-out after:delay-0",
    "hover:after:scale-x-100 hover:after:delay-500",
    "focus-visible:after:scale-x-100 focus-visible:after:delay-500",
].join(" ");

const clipClass = [
    "grid overflow-hidden transition-[grid-template-columns] duration-500 ease-out",
    "grid-cols-[0fr_var(--social-icon-slot)]",
    "group-hover:grid-cols-[1fr_var(--social-icon-slot)]",
    "group-focus-visible:grid-cols-[1fr_var(--social-icon-slot)]",
    "motion-reduce:transition-none",
].join(" ");

export function HeroSocialLinks() {
    const links = site.socialLinks;

    if (!links?.length) return null;

    return (
        <div
            className="mt-6 flex flex-wrap items-center gap-0"
            role="list"
            aria-label="Social profiles"
            style={{ ["--social-icon-slot" as string]: ICON_SLOT }}
        >
            {links.map((link) => {
                const Icon = socialIconById[link.id as SocialIconId];
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
                        <span className={clipClass}>
                            <span className="min-w-0 overflow-hidden">
                                <span
                                    className="block whitespace-nowrap pr-2 text-sm font-medium"
                                    aria-hidden="true"
                                >
                                    {link.label}
                                </span>
                            </span>
                            <span className="flex w-9 shrink-0 items-center justify-center">
                                {Icon ? <Icon className="size-5" /> : null}
                            </span>
                        </span>
                    </a>
                );
            })}
        </div>
    );
}