import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { PortraitFrame } from "@/components/PortraitFrame";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { jsonLdScript, profilePageJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Sedjro Tovihouande — software developer, cloud computing professional, technology founder, and active-duty U.S. Army NCO.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Sedjro Tovihouande",
    description:
      "Software developer, technology founder, and active-duty U.S. Army NCO building platforms that solve real operational problems.",
    url: "/about",
  },
};

const transferableStrengths = [
  "Leadership",
  "Accountability",
  "Planning",
  "Risk management",
  "Communication",
  "Team coordination",
  "Decision-making",
  "Adaptability",
  "Mission execution",
];

export default function AboutPage() {
  return (
    <>
      <section aria-label="About introduction" className="hero-glow">
        <div className="container-site grid items-start gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_340px]">
          <div className="max-w-2xl">
            <SectionHeading
              eyebrow="About"
              title="I build software the way the Army taught me to lead: deliberately."
              as="h1"
            />

            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
              <p>
                My path into software didn&apos;t start with a bootcamp
                curiosity — it started with problems I couldn&apos;t ignore.
                Watching small healthcare businesses drown in disconnected
                tools. Watching leaders spend their mornings chasing personnel
                statuses through group texts. Watching people in the market I
                come from stay uninsured because the process was built for
                paperwork, not phones. Each of those became a product I
                designed, built, and shipped.
              </p>
              <p>
                I&apos;m an active-duty Noncommissioned Officer in the U.S.
                Army. Being an NCO means being the person responsible when
                things have to work: for people, for equipment, for the plan and
                the fallback plan. That responsibility translates directly into
                how I build software — I plan before I code, I design for the
                person who will actually use the system, and I treat security
                and reliability as part of the mission, not afterthoughts.
              </p>
              <p>
                On the technical side, I work across the full stack — from data
                modeling and role-based access control to accessible, responsive
                interfaces — holding a B.S. in Information Technology (Software
                Development) earned magna cum laude, built on an earlier
                engineering degree in electrical engineering and industrial data
                processing, with graduate study in AWS cloud computing ahead. As
                a founder, I&apos;ve carried products through the whole
                unglamorous middle: payments, onboarding, deployments, and the
                iteration that follows real users.
              </p>
              <p>
                What pulls it all together is a simple conviction: the best
                software comes from people who understand the operation it
                serves. Healthcare workflows, unit accountability,
                small-business bookings, insurance in emerging markets — I build
                for problems I&apos;ve seen up close, and I keep learning so the
                next platform is better than the last.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/experience">
                My experience
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/projects" variant="secondary">
                See the work
              </ButtonLink>
            </div>
          </div>

          <Reveal className="mx-auto w-full max-w-xs lg:max-w-none">
            <PortraitFrame />
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="strengths-heading"
        className="border-t border-border bg-surface"
      >
        <div className="container-site py-16 sm:py-20">
          <SectionHeading
            eyebrow="Leadership, transferred"
            title="What military service brings to an engineering team"
            description="I don't publish unit details or operational information. What I do bring to every project is the discipline the NCO corps is built on."
          />
          <h2 id="strengths-heading" className="sr-only">
            Transferable strengths
          </h2>
          <ul className="mt-8 flex max-w-3xl flex-wrap gap-2">
            {transferableStrengths.map((strength) => (
              <li
                key={strength}
                className="rounded-full border border-border bg-bg px-4 py-2 text-sm font-medium text-muted"
              >
                {strength}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Mission first",
                description:
                  "Every project gets a clear objective, a plan, and honest reporting on progress — including when something isn't working.",
              },
              {
                title: "People always",
                description:
                  "Soldiers and software users have this in common: systems fail when they're designed without respect for the people using them.",
              },
              {
                title: "Standards maintained",
                description:
                  "Security, accessibility, and code quality are standards, not stretch goals. You hold the line on standards even when nobody is checking.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-bg p-6"
              >
                <h3 className="font-display text-base font-semibold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />

      <script
        type="application/ld+json"
        // Serialized with escaping in jsonLdScript — safe by construction.
        dangerouslySetInnerHTML={{ __html: jsonLdScript(profilePageJsonLd()) }}
      />
    </>
  );
}
