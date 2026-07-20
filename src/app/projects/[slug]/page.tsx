import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Layers,
  Lightbulb,
  ShieldCheck,
  Target,
  Users,
  Wrench,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GitHubIcon } from "@/components/BrandIcons";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { ProjectFrame } from "@/components/ProjectFrame";
import { Reveal } from "@/components/Reveal";
import { TechBadge } from "@/components/TechBadge";
import { getProject, projects } from "@/data/projects";
import { breadcrumbJsonLd, jsonLdScript, projectJsonLd } from "@/lib/jsonld";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.seo.title,
    description: project.seo.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.seo.title} | Sedjro Tovihouande`,
      description: project.seo.description,
      url: `/projects/${project.slug}`,
    },
  };
}

function CaseSection({
  id,
  icon: Icon,
  title,
  children,
}: {
  id: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className="border-t border-border py-10 first:border-t-0"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
          <Icon className="size-4.5" aria-hidden />
        </span>
        <h2
          id={id}
          className="font-display text-xl font-semibold tracking-tight"
        >
          {title}
        </h2>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-2.5 text-base leading-relaxed text-muted"
        >
          <span
            aria-hidden="true"
            className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const cs = project.caseStudy;
  const ordered = [...projects].sort((a, b) => a.order - b.order);
  const index = ordered.findIndex((p) => p.slug === project.slug);
  const next = ordered[(index + 1) % ordered.length];

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: project.name, path: `/projects/${project.slug}` },
  ];

  return (
    <>
      {/* Case-study hero */}
      <section aria-label={`${project.name} overview`} className="hero-glow">
        <div className="container-site py-10 sm:py-14">
          <Breadcrumbs items={crumbs} />
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold tracking-wide text-accent uppercase">
                {project.portfolioRole}
              </p>
              <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                {project.name}
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
                {project.tagline}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
                  {project.statusLabel}
                </span>
                {project.domainLabel && (
                  <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-faint">
                    {project.domainLabel}
                  </span>
                )}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                {project.liveUrl && project.liveUrlVerified && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent-strong dark:font-semibold dark:text-[#0a1120]"
                  >
                    Visit live site
                    <ExternalLink className="size-4" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-lg border border-border-strong px-5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                  >
                    <GitHubIcon className="size-4" aria-hidden="true" />
                    Repository
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>
            </div>
            <Reveal>
              <ProjectFrame project={project} priority />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="border-t border-border">
        <div className="container-site grid gap-12 py-12 lg:grid-cols-[1fr_280px]">
          <article className="max-w-3xl min-w-0">
            <CaseSection id="cs-overview" icon={Lightbulb} title="Overview">
              <p className="text-base leading-relaxed text-muted">
                {cs.overview}
              </p>
            </CaseSection>

            <CaseSection id="cs-problem" icon={Target} title="Problem">
              <p className="text-base leading-relaxed text-muted">
                {cs.problem}
              </p>
            </CaseSection>

            <CaseSection id="cs-users" icon={Users} title="Users">
              <BulletList items={cs.users} />
            </CaseSection>

            <CaseSection id="cs-goals" icon={CheckCircle2} title="Goals">
              <BulletList items={cs.goals} />
            </CaseSection>

            <CaseSection id="cs-role" icon={Wrench} title="My role">
              <p className="text-base leading-relaxed text-muted">
                {cs.myRole}
              </p>
            </CaseSection>

            <CaseSection
              id="cs-strategy"
              icon={Lightbulb}
              title="Product strategy"
            >
              <p className="text-base leading-relaxed text-muted">
                {cs.productStrategy}
              </p>
            </CaseSection>

            <CaseSection id="cs-features" icon={Layers} title="Key features">
              <dl className="grid gap-4 sm:grid-cols-2">
                {cs.keyFeatures.map((feature) => (
                  <div
                    key={feature.title}
                    className="rounded-xl border border-border bg-surface p-4"
                  >
                    <dt className="font-display text-sm font-semibold">
                      {feature.title}
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-muted">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </CaseSection>

            <CaseSection
              id="cs-architecture"
              icon={Layers}
              title="Technical architecture"
            >
              <BulletList items={cs.architecture} />
            </CaseSection>

            <CaseSection
              id="cs-security"
              icon={ShieldCheck}
              title="Security & privacy"
            >
              <BulletList items={cs.security} />
            </CaseSection>

            <CaseSection
              id="cs-challenges"
              icon={Wrench}
              title="Engineering challenges & decisions"
            >
              <div className="space-y-5">
                {cs.challenges.map((item) => (
                  <div
                    key={item.challenge}
                    className="rounded-xl border border-border bg-surface p-5"
                  >
                    <p className="text-sm leading-relaxed font-medium">
                      {item.challenge}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.approach}
                    </p>
                  </div>
                ))}
              </div>
            </CaseSection>

            <CaseSection
              id="cs-lessons"
              icon={Lightbulb}
              title="Lessons learned"
            >
              <BulletList items={cs.lessonsLearned} />
            </CaseSection>

            <CaseSection
              id="cs-future"
              icon={ArrowRight}
              title="Future improvements"
            >
              <BulletList items={cs.futureImprovements} />
            </CaseSection>
          </article>

          {/* Sidebar */}
          <aside aria-label="Project details" className="lg:pt-10">
            <div className="space-y-6 lg:sticky lg:top-24">
              <div className="rounded-2xl border border-border bg-surface p-5">
                <h2 className="text-sm font-semibold tracking-wide text-faint uppercase">
                  Technology
                </h2>
                {cs.stack.map((group) => (
                  <div key={group.category} className="mt-3">
                    <ul className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <li key={item}>
                          <TechBadge>{item}</TechBadge>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-border bg-surface p-5">
                <h2 className="text-sm font-semibold tracking-wide text-faint uppercase">
                  Deployment
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {cs.deployment}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-5">
                <h2 className="text-sm font-semibold tracking-wide text-faint uppercase">
                  Current status
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {cs.currentStatus}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Prev/next navigation */}
      <nav aria-label="Project navigation" className="border-t border-border">
        <div className="container-site flex flex-wrap items-center justify-between gap-4 py-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All projects
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-strong"
          >
            Next: {next.name}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </nav>

      <CTASection
        title="Curious how this applies to your team?"
        description="I'm glad to walk through the architecture and decisions behind this project in more depth."
      />

      <script
        type="application/ld+json"
        // Serialized with escaping in jsonLdScript — safe by construction.
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            projectJsonLd(project),
            breadcrumbJsonLd(crumbs),
          ]),
        }}
      />
    </>
  );
}
