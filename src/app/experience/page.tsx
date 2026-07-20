import { Award, GraduationCap } from "lucide-react";
import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { Timeline } from "@/components/Timeline";
import { certifications, education, experience } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Experience of Sedjro Tovihouande — founder and software developer of multiple production platforms, active-duty U.S. Army NCO, with education in software development and AWS cloud computing.",
  alternates: { canonical: "/experience" },
  openGraph: {
    title: "Experience | Sedjro Tovihouande",
    description:
      "Founder, software developer, and active-duty U.S. Army NCO — with education in software development and AWS cloud computing.",
    url: "/experience",
  },
};

export default function ExperiencePage() {
  return (
    <>
      <section aria-label="Experience introduction" className="hero-glow">
        <div className="container-site py-16 sm:py-20">
          <SectionHeading
            eyebrow="Experience"
            title="Building, leading, and learning — in parallel"
            description="A professional timeline across product building, client work, military service, and formal education. Full dates and details are on the résumé."
            as="h1"
          />
        </div>
      </section>

      <section
        aria-label="Professional timeline"
        className="border-t border-border"
      >
        <div className="container-site max-w-4xl py-14 sm:py-16">
          <Timeline items={experience} />
        </div>
      </section>

      <section
        aria-labelledby="education-heading"
        className="border-t border-border bg-surface"
      >
        <div className="container-site py-14 sm:py-16">
          <SectionHeading
            eyebrow="Education & certifications"
            title="Continuous, deliberate learning"
          />
          <h2 id="education-heading" className="sr-only">
            Education and certifications
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {education.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-2xl border border-border bg-bg p-6"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <GraduationCap className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold">
                    {item.institution}
                  </h3>
                  <p className="mt-0.5 text-sm font-medium text-muted">
                    {item.program}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="flex items-center gap-2 font-display text-base font-semibold">
              <Award className="size-4.5 text-accent" aria-hidden="true" />
              Certifications
            </h3>
            {certifications.length > 0 ? (
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {certifications.map((cert) => (
                  <li
                    key={cert.id}
                    className="rounded-xl border border-border bg-bg p-4"
                  >
                    <p className="text-sm font-medium">{cert.name}</p>
                    <p className="mt-0.5 text-sm text-muted">
                      {cert.issuer}
                      {cert.year ? ` · ${cert.year}` : ""}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                Certifications will be listed here as they are completed —
                current graduate coursework is focused on AWS cloud computing.
              </p>
            )}
          </div>
        </div>
      </section>

      <CTASection
        title="Want the details?"
        description="The résumé has the complete picture — roles, dates, education, and technical depth."
      />
    </>
  );
}
