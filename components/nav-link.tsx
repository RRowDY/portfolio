"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
    href: string;
    children: React.ReactNode;
};

export function NavLink({ href, children }: NavLinkProps) {
    const pathname = usePathname();
    const isActive =
        href === "/" ? pathname === href : pathname.startsWith(href);

    return (
        <Link
            href={href}
            className={[
                "relative py-1 text-sm font-medium transition-colors duration-200",
                isActive ? "text-foreground" : "text-muted hover:text-foreground",
                "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:bg-accent-bright after:transition-transform after:duration-300 after:ease-out",
                isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
            ].join(" ")}
        >
            {children}
        </Link>
    );
}