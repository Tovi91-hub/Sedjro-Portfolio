import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Software projects by Sedjro Tovihouande — healthcare SaaS, military personnel accountability, small-business platforms, insurance technology, and more.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects | Sedjro Tovihouande",
    description:
      "Production platforms across healthcare, military workflows, small-business operations, and insurance.",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  const ordered = [...projects].sort((a, b) => a.order - b.order);

  return (
    <>
      <section aria-label="Projects introduction" className="hero-glow">
        <div className="container-site py-16 sm:py-20">
          <SectionHeading
            eyebrow="Projects"
            title="Real platforms, real users, real constraints"
            description="Every project here exists because someone needed working software — a healthcare business, a military team, a small business, or an underserved market. Case studies cover the problem, the architecture, and the decisions."
            as="h1"
          />
        </div>
      </section>

      <section aria-label="All projects" className="border-t border-border">
        <div className="container-site py-14 sm:py-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ordered.map((project, i) => (
              <Reveal key={project.slug} delay={Math.min(i * 0.05, 0.2)}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want the full story behind a project?"
        description="Each case study covers the problem, users, architecture, security considerations, and the engineering decisions that shaped the product."
      />
    </>
  );
}
