"use client";

import { FileText, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu on navigation (derived-state-on-change pattern).
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Escape closes the menu and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-border [background-color:var(--header)] backdrop-blur-md">
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-base font-semibold tracking-tight"
          aria-label={`${site.name} — home`}
        >
          <span
            aria-hidden="true"
            className="flex size-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white dark:text-[#0a1120]"
          >
            {site.initials}
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "text-accent"
                  : "text-muted hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/resume"
            className="hidden h-9 items-center gap-2 rounded-lg bg-accent px-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-strong md:inline-flex dark:font-semibold dark:text-[#0a1120]"
          >
            <FileText className="size-4" aria-hidden="true" />
            Résumé
          </Link>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:text-ink md:hidden"
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="border-t border-border md:hidden"
      >
        <nav aria-label="Primary mobile" className="container-site py-3">
          <ul className="flex flex-col gap-1">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "block rounded-lg px-3 py-3 text-base font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-accent-soft text-accent"
                      : "text-muted hover:bg-surface-2 hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/resume"
                className="mt-1 flex items-center gap-2 rounded-lg bg-accent px-3 py-3 text-base font-medium text-white dark:font-semibold dark:text-[#0a1120]"
              >
                <FileText className="size-4" aria-hidden="true" />
                Résumé
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
