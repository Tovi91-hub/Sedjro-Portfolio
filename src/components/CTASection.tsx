import { ArrowRight, Mail } from "lucide-react";
import { ButtonLink } from "@/components/Button";

/**
 * Closing call-to-action used on most pages.
 */
export function CTASection({
  title = "Let's build something that works.",
  description = "I'm open to conversations about software development, cloud technology, technical collaboration, and employment opportunities.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section aria-labelledby="cta-heading" className="border-t border-border">
      <div className="container-site py-16 sm:py-20">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface px-6 py-14 text-center hero-glow sm:px-12">
          <div
            aria-hidden="true"
            className="absolute inset-x-10 top-0 h-px hairline"
          />
          <div aria-hidden="true" className="absolute inset-0 dot-grid" />
          <h2
            id="cta-heading"
            className="relative font-display text-2xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            {title}
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted">
            {description}
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/contact" size="lg">
              <Mail className="size-4" aria-hidden="true" />
              Get in touch
            </ButtonLink>
            <ButtonLink href="/projects" variant="secondary" size="lg">
              View my work
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
