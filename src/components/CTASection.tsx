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
        <div className="rounded-2xl border border-border bg-surface px-6 py-12 text-center hero-glow sm:px-12">
          <h2
            id="cta-heading"
            className="font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
          >
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted">
            {description}
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
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
