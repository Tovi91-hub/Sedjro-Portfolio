import { ArrowLeft, Compass } from "lucide-react";
import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <section aria-label="Page not found" className="hero-glow">
      <div className="container-site flex flex-col items-center py-24 text-center sm:py-32">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
          <Compass className="size-7" aria-hidden="true" />
        </span>
        <p className="mt-6 text-sm font-semibold tracking-wide text-accent uppercase">
          404
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          This page doesn&apos;t exist
        </h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
          The page you&apos;re looking for may have moved or never existed. The
          projects and contact pages are good places to regroup.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to home
          </ButtonLink>
          <ButtonLink href="/projects" variant="secondary">
            View projects
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
