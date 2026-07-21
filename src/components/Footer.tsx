import Link from "next/link";
import { site } from "@/data/site";
import { SocialLinks } from "@/components/SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-surface">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-px h-px hairline"
      />
      <div className="container-site flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-base font-semibold">{site.name}</p>
          <p className="mt-1 text-sm text-muted">{site.title}</p>
          <p className="mt-3 text-sm leading-relaxed text-faint">
            {site.heroStatement}
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="text-sm font-semibold tracking-wide text-faint uppercase">
            Site
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-x-10 gap-y-2">
            {[...site.nav, { label: "Résumé", href: "/resume" }].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold tracking-wide text-faint uppercase">
            Connect
          </p>
          <div className="mt-3">
            <SocialLinks />
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-site flex flex-col gap-2 py-5 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>
            <Link href="/privacy" className="transition-colors hover:text-ink">
              Privacy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
