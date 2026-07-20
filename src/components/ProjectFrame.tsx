import Image from "next/image";
import type { Project } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface ProjectFrameProps {
  project: Project;
  /** Use priority loading for above-the-fold frames. */
  priority?: boolean;
  className?: string;
}

/**
 * Project media frame with a consistent 16:10 aspect ratio.
 *
 * When a real screenshot exists (project.screenshot), it renders via
 * next/image. Until then it renders a polished branded placeholder that
 * identifies the project without faking product UI — no invented
 * dashboards, no misrepresented functionality.
 */
export function ProjectFrame({
  project,
  priority,
  className,
}: ProjectFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-surface-2 shadow-sm",
        className,
      )}
    >
      {/* Browser chrome */}
      <div
        aria-hidden="true"
        className="flex h-8 items-center gap-1.5 border-b border-border bg-surface px-3"
      >
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        {project.domainLabel && (
          <span className="mx-auto hidden max-w-[60%] truncate rounded-md bg-surface-2 px-3 py-0.5 text-[11px] text-faint sm:block">
            {project.domainLabel}
          </span>
        )}
      </div>

      {/* Media area — fixed aspect ratio so real screenshots drop in without layout changes */}
      <div className="relative aspect-[16/10]">
        {project.screenshot ? (
          <Image
            src={project.screenshot}
            alt={project.screenshotAlt}
            fill
            sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top"
            priority={priority}
          />
        ) : (
          <div
            role="img"
            aria-label={`${project.name} — preview image coming soon`}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6"
            style={{
              background: `radial-gradient(28rem 16rem at 30% 0%, ${project.accent}1f, transparent 70%)`,
            }}
          >
            <span
              aria-hidden="true"
              className="flex size-14 items-center justify-center rounded-2xl font-display text-lg font-bold text-white shadow-sm"
              style={{ backgroundColor: project.accent }}
            >
              {project.monogram}
            </span>
            <span className="font-display text-lg font-semibold text-ink">
              {project.name}
            </span>
            <span className="max-w-xs text-center text-xs leading-relaxed text-faint">
              {project.portfolioRole}
            </span>
            <span className="rounded-full border border-border px-3 py-1 text-[11px] font-medium tracking-wide text-faint uppercase">
              Preview coming soon
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
