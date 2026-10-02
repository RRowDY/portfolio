import Link from "next/link";
import { site } from "@/content/site";
import { ArrowChip } from "@/components/arrow-chip";
import { SocialLinks } from "@/components/social-links";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/60 px-6 pt-14 pb-10 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col items-center gap-12 text-center sm:flex-row sm:items-start sm:justify-between sm:gap-10 sm:text-left">
          <div className="max-w-xs">
            <p className="font-display text-lg font-semibold tracking-tight text-foreground">
              {site.name}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              {site.footerTagline}
            </p>
            <SocialLinks className="mt-4 justify-center sm:justify-start" />
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-col items-center gap-3 sm:items-start"
          >
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-subtle">
              Pages
            </p>
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted transition-colors duration-200 hover:text-accent-bright"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-center gap-3 sm:items-start">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-subtle">
              Available for work
            </p>
            <p className="max-w-xs text-sm leading-6 text-muted">
              Have something you want built? I read every message.
            </p>
            <ArrowChip href="/contact">Start a project</ArrowChip>
          </div>
        </div>

        <p className="mt-12 border-t border-border/60 pt-6 text-center text-xs text-subtle sm:text-left">
          {site.tab} &middot; Built with Next.js and Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
