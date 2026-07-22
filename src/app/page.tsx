import {
  ArrowRight,
  Award,
  Cloud,
  Code2,
  FileText,
  Layers,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { PortraitFrame } from "@/components/PortraitFrame";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SkillCategoryCard } from "@/components/SkillCategoryCard";
import { SocialLinks } from "@/components/SocialLinks";
import { additionalProjects, featuredProjects } from "@/data/projects";
import { site } from "@/data/site";
import { skillCategories } from "@/data/skills";

const credibility = [
  {
    icon: Rocket,
    title: "Production software",
    description:
      "Multiple live platforms designed, built, and operated end to end.",
  },
  {
    icon: Code2,
    title: "Full-stack development",
    description:
      "From data models and APIs to accessible, responsive interfaces.",
  },
  {
    icon: Cloud,
    title: "Cloud deployment",
    description:
      "Products shipped and operated on modern cloud infrastructure.",
  },
  {
    icon: ShieldCheck,
    title: "Secure application design",
    description:
      "Privacy-first architecture for platforms handling sensitive data.",
  },
  {
    icon: Award,
    title: "Military leadership",
    description:
      "Active-duty U.S. Army NCO — accountability, planning, execution.",
  },
  {
    icon: Layers,
    title: "Technology entrepreneurship",
    description:
      "Founder experience taking products from idea to paying users.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden hero-glow"
      >
        <div aria-hidden="true" className="absolute inset-0 dot-grid" />
        <div className="relative container-site grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
          <Reveal>
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3.5 py-1.5 text-xs font-semibold tracking-wide backdrop-blur">
                <span
                  aria-hidden="true"
                  className="size-2 pulse-dot rounded-full bg-accent"
                />
                Open to software &amp; cloud opportunities
              </p>
              <p className="mt-5 text-sm font-semibold tracking-[0.14em] text-accent uppercase">
                {site.supportingIdentity}
              </p>
              <h1
                id="hero-heading"
                className="mt-4 font-display text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl"
              >
                {site.name}
              </h1>
              <p className="mt-4 font-display text-xl font-medium sm:text-2xl">
                <span className="text-gradient">{site.title}</span>
              </p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-balance">
                {site.heroStatement}
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
                {site.heroSupport}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <ButtonLink href="/projects" size="lg">
                  View my work
                  <ArrowRight className="size-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href="/resume" variant="secondary" size="lg">
                  <FileText className="size-4" aria-hidden="true" />
                  Résumé
                </ButtonLink>
                <SocialLinks className="sm:ml-2" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="mx-auto w-full max-w-xs sm:max-w-sm">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-3 -z-10 rotate-2 rounded-3xl border border-border bg-surface-2/60"
              />
              <div
                aria-hidden="true"
                className="absolute -inset-px -z-10 rounded-2xl bg-[radial-gradient(24rem_18rem_at_70%_-10%,color-mix(in_oklab,var(--accent)_28%,transparent),transparent_70%)] blur-xl"
              />
              <PortraitFrame />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Credibility */}
      <section
        aria-labelledby="credibility-heading"
        className="border-t border-border bg-surface"
      >
        <div className="container-site py-16 sm:py-20">
          <SectionHeading
            eyebrow="What I bring"
            title="Practical engineering, disciplined delivery"
            description="I translate real operational problems into software people actually use — and I ship it."
          />
          <h2 id="credibility-heading" className="sr-only">
            Professional credibility
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {credibility.map((item, i) => (
              <Reveal key={item.title} delay={Math.min(i * 0.05, 0.25)}>
                <div className="flex h-full card-lift gap-4 rounded-2xl border border-border bg-bg p-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <item.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section aria-labelledby="featured-heading">
        <div className="container-site py-16 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Featured work"
              title="Platforms built for real operations"
              description="Each project started with a real problem — a business, a team, or a market that needed working software."
            />
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-strong"
            >
              All projects
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <h2 id="featured-heading" className="sr-only">
            Featured projects
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featuredProjects.map((project, i) => (
              <Reveal key={project.slug} delay={Math.min(i * 0.06, 0.2)}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>

          {/* Additional projects */}
          <div className="mt-14">
            <SectionHeading eyebrow="Also built" title="More projects" />
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {additionalProjects.map((project) => (
                <Reveal key={project.slug}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills overview */}
      <section
        aria-labelledby="skills-heading"
        className="border-t border-border bg-surface"
      >
        <div className="container-site py-16 sm:py-20">
          <SectionHeading
            eyebrow="Capabilities"
            title="Skills, organized the way I work"
            description="Not a logo wall — the actual categories of work involved in taking a platform from idea to production."
          />
          <h2 id="skills-heading" className="sr-only">
            Skills overview
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skillCategories.map((category) => (
              <Reveal key={category.title}>
                <SkillCategoryCard category={category} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About preview */}
      <section aria-labelledby="about-heading">
        <div className="container-site grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2">
          <Reveal>
            <div>
              <SectionHeading
                eyebrow="About"
                title="Discipline from the Army. Craft from shipping."
              />
              <h2 id="about-heading" className="sr-only">
                About preview
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-muted">
                <p>
                  I&apos;m an active-duty U.S. Army Noncommissioned Officer and
                  a software developer. The Army taught me accountability,
                  planning, and how to lead people through hard problems;
                  building software taught me to turn those same operational
                  instincts into products.
                </p>
                <p>
                  I&apos;ve founded and built platforms in healthcare, military
                  personnel accountability, small-business operations, and
                  insurance — with a B.S. in Information Technology earned magna
                  cum laude and graduate-level AWS cloud study ahead.
                </p>
              </div>
              <div className="mt-6">
                <ButtonLink href="/about" variant="secondary">
                  More about me
                  <ArrowRight className="size-4" aria-hidden="true" />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <dl className="grid grid-cols-2 gap-4">
              {[
                {
                  term: "Focus",
                  detail: "Healthcare, operations & cloud platforms",
                },
                {
                  term: "Approach",
                  detail: "Security-conscious, user-centered",
                },
                { term: "Role", detail: "Founder, developer & NCO" },
                { term: "Learning", detail: "Graduate AWS cloud computing" },
              ].map((item) => (
                <div
                  key={item.term}
                  className="card-lift rounded-2xl border border-border bg-surface p-5"
                >
                  <dt className="text-xs font-semibold tracking-wide text-faint uppercase">
                    {item.term}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed font-medium">
                    {item.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
