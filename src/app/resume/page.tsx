import { Download, ExternalLink, FileText, Mail } from "lucide-react";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "View or download the résumé of Sedjro Tovihouande — software developer, cloud computing professional, and U.S. Army NCO.",
  alternates: { canonical: "/resume" },
  openGraph: {
    title: "Résumé | Sedjro Tovihouande",
    description:
      "View or download the résumé of Sedjro Tovihouande — software developer and cloud computing professional.",
    url: "/resume",
  },
};

/**
 * Résumé page.
 *
 * When site.resume.pdfPath is set (PDF placed under /public), this page
 * offers in-browser viewing and download. Until then it shows an elegant
 * placeholder state with a contact fallback — never a broken link.
 */
export default function ResumePage() {
  const { pdfPath, updatedLabel } = site.resume;

  return (
    <section aria-label="Résumé" className="hero-glow">
      <div className="container-site max-w-3xl py-16 sm:py-24">
        <SectionHeading
          eyebrow="Résumé"
          title={`${site.name} — Résumé`}
          description="Software Developer & Cloud Computing Professional · Technology Founder · U.S. Army NCO"
          as="h1"
        />

        {pdfPath ? (
          <div className="mt-10 rounded-2xl border border-border bg-surface p-8">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <FileText className="size-6" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-display text-lg font-semibold">
                  Current résumé (PDF)
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {updatedLabel
                    ? `Last updated ${updatedLabel}.`
                    : "The latest version, viewable in your browser or downloadable as a PDF."}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <ButtonLink href={pdfPath} target="_blank">
                    <ExternalLink className="size-4" aria-hidden="true" />
                    View in browser
                  </ButtonLink>
                  <a
                    href={pdfPath}
                    download
                    className="inline-flex h-10 items-center gap-2 rounded-lg border border-border-strong px-4 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                  >
                    <Download className="size-4" aria-hidden="true" />
                    Download PDF
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-border bg-surface p-8 sm:p-10">
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                <FileText className="size-7" aria-hidden="true" />
              </span>
              <h2 className="font-display text-xl font-semibold">
                Résumé available on request
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-muted">
                The downloadable résumé is being finalized. In the meantime, the{" "}
                <a
                  href="/experience"
                  className="font-medium text-accent underline-offset-2 hover:underline"
                >
                  experience page
                </a>{" "}
                covers my background, and I&apos;m happy to send the current
                résumé directly.
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-3">
                <ButtonLink href="/contact">
                  <Mail className="size-4" aria-hidden="true" />
                  Request résumé
                </ButtonLink>
                <ButtonLink href="/experience" variant="secondary">
                  View experience
                </ButtonLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
