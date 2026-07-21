"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronRight, FileText, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

const emptySubscribe = () => () => {};

/** True after hydration on the client; false during SSR. */
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function Header() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const mounted = useMounted();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
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

  // Lock page scroll while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
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
                "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "text-accent after:absolute after:inset-x-3 after:-bottom-[13px] after:h-0.5 after:rounded-full after:bg-accent"
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

      {/* Mobile navigation drawer — portaled to <body> so fixed positioning
          escapes the header's backdrop-filter containing block. */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                <motion.button
                  key="backdrop"
                  type="button"
                  aria-label="Close menu"
                  tabIndex={-1}
                  onClick={() => setOpen(false)}
                  className="fixed inset-x-0 top-16 bottom-0 z-40 cursor-default bg-black/45 backdrop-blur-[2px] md:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                />
                <motion.div
                  key="panel"
                  id="mobile-menu"
                  className="fixed inset-x-0 top-16 z-50 overflow-hidden rounded-b-2xl border-b border-border bg-bg shadow-2xl md:hidden"
                  initial={
                    reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
                  transition={{ duration: 0.22, ease: [0.21, 0.65, 0.35, 1] }}
                >
                  <nav
                    aria-label="Primary mobile"
                    className="container-site py-4"
                  >
                    <ul className="divide-y divide-border">
                      {site.nav.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            aria-current={
                              isActive(item.href) ? "page" : undefined
                            }
                            className={cn(
                              "flex items-center justify-between gap-3 rounded-lg px-2 py-4 text-base font-medium transition-colors",
                              isActive(item.href)
                                ? "text-accent"
                                : "text-ink active:bg-surface-2",
                            )}
                          >
                            {item.label}
                            <ChevronRight
                              className={cn(
                                "size-4",
                                isActive(item.href)
                                  ? "text-accent"
                                  : "text-faint",
                              )}
                              aria-hidden="true"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/resume"
                      className="mt-3 flex h-12 items-center justify-center gap-2 rounded-xl bg-accent text-base font-medium text-white shadow-md shadow-accent/25 dark:font-semibold dark:text-[#0a1120]"
                    >
                      <FileText className="size-4" aria-hidden="true" />
                      Résumé
                    </Link>
                  </nav>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </header>
  );
}
