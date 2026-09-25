import Link from "next/link";
import { site } from "@/content/site";
import { NavLink } from "@/components/nav-link";

export function SiteHeader() {
    return (
        <header
            className="sticky top-0 z-50 px-4 pt-4"    
        // className="sticky top-0 z-50 border-b border-border/60 bg-elevated/40 backdrop-blur-md transition-[background-color,backdrop-filter] duration-300 supports-[backdrop-filter]:bg-elevated/30"
        >
            <div className="mx-auto flex h-12 w-fit max-w-full items-center gap-6 rounded-full border border-border/70 bg-elevated/70 px-5 shadow-lg shadow-black/25 backdrop-blur-md sm:gap-8 sm:px-6">
            {/* <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 sm:px-10 lg:px-16"> */}
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