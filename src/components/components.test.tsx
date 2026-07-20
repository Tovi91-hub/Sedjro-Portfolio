import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { TechBadge } from "@/components/TechBadge";
import { projects } from "@/data/projects";

describe("ProjectCard", () => {
  const live = projects.find((p) => p.liveUrl && p.liveUrlVerified)!;
  const unlinked = projects.find((p) => !p.liveUrl)!;

  it("renders name, problem, solution, and a case-study link", () => {
    render(<ProjectCard project={live} />);
    expect(
      screen.getByRole("heading", { name: live.name }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Problem —/)).toBeInTheDocument();
    expect(screen.getByText(/Solution —/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /case study/i })).toHaveAttribute(
      "href",
      `/projects/${live.slug}`,
    );
  });

  it("shows a live-site link only for verified live URLs", () => {
    render(<ProjectCard project={live} />);
    const liveLink = screen.getByRole("link", { name: /live site/i });
    expect(liveLink).toHaveAttribute("href", live.liveUrl!);
    expect(liveLink).toHaveAttribute(
      "rel",
      expect.stringContaining("noopener"),
    );
  });

  it("renders no live-site link when there is no verified URL", () => {
    render(<ProjectCard project={unlinked} />);
    expect(
      screen.queryByRole("link", { name: /live site/i }),
    ).not.toBeInTheDocument();
  });
});

describe("SectionHeading", () => {
  it("renders the requested heading level", () => {
    render(<SectionHeading title="Test heading" as="h1" eyebrow="Eyebrow" />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Test heading" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Eyebrow")).toBeInTheDocument();
  });
});

describe("TechBadge", () => {
  it("renders its children", () => {
    render(<TechBadge>Next.js</TechBadge>);
    expect(screen.getByText("Next.js")).toBeInTheDocument();
  });
});
