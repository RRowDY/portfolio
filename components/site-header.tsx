import Link from "next/link";
import { site } from "@/content/site";
import { NavLink } from "@/components/nav-link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <div className="mx-auto flex h-12 w-fit max-w-full items-center gap-6 rounded-full border border-border/70 bg-elevated/90 px-5 shadow-lg shadow-black/30 backdrop-blur-xl sm:gap-8 sm:px-6">
        <Link
          href="/"
          className="font-display text-sm font-semibold tracking-tight text-foreground transition-colors duration-200 hover:text-accent-bright"
        >
          {site.name}
        </Link>

        <nav className="flex items-center gap-6 sm:gap-8" aria-label="Main">
          {site.nav.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
