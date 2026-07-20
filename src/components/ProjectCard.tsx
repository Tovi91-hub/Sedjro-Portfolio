import { ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/types/portfolio";
import { ProjectFrame } from "@/components/ProjectFrame";
import { TechBadge } from "@/components/TechBadge";

/**
 * Standard project card used in grids. Shows problem → solution, stack
 * summary, status, and links to the case study (plus the live site when a
 * verified URL exists).
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-border-strong">
      <ProjectFrame
        project={project}
        className="rounded-none border-0 border-b"
      />

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display text-lg font-semibold">
            <Link
              href={`/projects/${project.slug}`}
              className="transition-colors hover:text-accent"
            >
              {project.name}
            </Link>
          </h3>
          <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-faint">
            {project.statusLabel}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-muted">
          <span className="font-medium text-ink">Problem — </span>
          {project.problem}
        </p>
        <p className="text-sm leading-relaxed text-muted">
          <span className="font-medium text-ink">Solution — </span>
          {project.solution}
        </p>

        <ul
          className="mt-1 flex flex-wrap gap-1.5"
          aria-label="Technology summary"
        >
          {project.stackSummary.map((tech) => (
            <li key={tech}>
              <TechBadge>{tech}</TechBadge>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-3">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-accent px-4 text-sm font-medium text-white transition-colors hover:bg-accent-strong dark:font-semibold dark:text-[#0a1120]"
          >
            Case study
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
          {project.liveUrl && project.liveUrlVerified && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border-strong px-4 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Live site
              <ExternalLink className="size-4" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
