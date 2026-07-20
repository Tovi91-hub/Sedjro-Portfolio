import { Briefcase, Code2, GraduationCap, Shield } from "lucide-react";
import type { ExperienceItem } from "@/types/portfolio";

const categoryIcon = {
  software: Code2,
  founder: Briefcase,
  military: Shield,
  education: GraduationCap,
} as const;

const categoryLabel = {
  software: "Software development",
  founder: "Founder & product",
  military: "U.S. Army",
  education: "Education",
} as const;

/**
 * Vertical experience timeline. Ordered as provided in data.
 */
export function Timeline({ items }: { items: ExperienceItem[] }) {
  return (
    <ol className="relative space-y-10 border-l border-border pl-8 sm:pl-10">
      {items.map((item) => {
        const Icon = categoryIcon[item.category];
        return (
          <li key={item.id} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-0.5 -left-[calc(2rem+1px)] flex size-8 items-center justify-center rounded-full border border-border bg-surface text-accent sm:-left-[calc(2.5rem+1px)]"
            >
              <Icon className="size-4" />
            </span>
            <p className="text-xs font-semibold tracking-wide text-accent uppercase">
              {categoryLabel[item.category]}
            </p>
            <h3 className="mt-1.5 font-display text-lg font-semibold">
              {item.role}
            </h3>
            <p className="mt-0.5 text-sm text-muted">
              {item.organization} · {item.period}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {item.summary}
            </p>
            <ul className="mt-3 space-y-1.5">
              {item.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-2.5 text-sm leading-relaxed text-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ol>
  );
}
