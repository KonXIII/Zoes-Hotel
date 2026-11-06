// Reference only — sticky nav that gains a soft backdrop as the page scrolls.
// Keyboard-first: focus rings, aria-current, skip link, 44px touch targets.
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/work", label: "Work" },
  { href: "/studio", label: "Studio" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export function NavSticky({ currentPath = "/" }: { currentPath?: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-[color:var(--color-fg)] focus:text-[color:var(--color-bg)] focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-[background-color,backdrop-filter,border-color] duration-[var(--duration-sm)] ease-[var(--ease-out-quart)]",
          scrolled
            ? "border-b border-[color:var(--color-border)] bg-[color-mix(in_oklch,var(--color-bg)_85%,transparent)] backdrop-blur-md"
            : "border-b border-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-[88rem] items-center justify-between px-6 md:px-12"
        >
          <a
            href="/"
            aria-label="Home"
            className="font-[family-name:var(--font-display)] text-lg tracking-[-0.02em]"
          >
            Studio
          </a>

          <ul className="hidden md:flex items-center gap-[var(--space-6)]">
            {links.map((l) => {
              const active = currentPath === l.href;
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "inline-flex min-h-11 items-center text-sm transition-colors",
                      active
                        ? "text-[color:var(--color-fg)]"
                        : "text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-fg)]",
                    )}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href="/contact"
            className="inline-flex min-h-11 items-center rounded-full bg-[color:var(--color-fg)] text-[color:var(--color-bg)] px-4 text-sm font-medium transition-transform duration-[var(--duration-micro)] ease-[var(--ease-out-quart)] hover:scale-[0.98]"
          >
            Start a project
          </a>
        </nav>
      </header>
    </>
  );
}
