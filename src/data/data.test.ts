import { describe, expect, it } from "vitest";
import { site } from "@/data/site";
import {
  additionalProjects,
  featuredProjects,
  projects,
} from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { education, experience } from "@/data/experience";

/**
 * Content-integrity tests. These guard the honesty and consistency rules the
 * portfolio is built on: no broken slugs, no misspelled domains, no
 * accidental placeholder text reaching production, and no unverified links
 * presented as live.
 */

describe("site config", () => {
  it("uses the canonical apex domain", () => {
    expect(site.url).toBe("https://sedjrotovihouande.com");
    expect(site.url.endsWith("/")).toBe(false);
  });

  it("has complete SEO defaults", () => {
    expect(site.seo.defaultTitle.length).toBeGreaterThan(10);
    expect(site.seo.defaultDescription.length).toBeGreaterThan(50);
    expect(site.seo.titleTemplate).toContain("%s");
  });

  it("never exposes unverified social links as hrefs claiming to be real", () => {
    for (const social of site.social) {
      if (social.href !== null) {
        expect(social.href).toMatch(/^(https:\/\/|mailto:)/);
      }
    }
  });
});

describe("projects", () => {
  it("has exactly six projects with unique slugs", () => {
    expect(projects).toHaveLength(6);
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("features exactly the three flagship projects", () => {
    expect(featuredProjects.map((p) => p.slug)).toEqual([
      "myvital-harmony",
      "myfreedomops",
      "murielle-hair-braids",
    ]);
    expect(additionalProjects).toHaveLength(3);
  });

  it("never uses the incorrect muriellehairbraidss.com domain", () => {
    const serialized = JSON.stringify(projects);
    expect(serialized).not.toContain("muriellehairbraidss");
  });

  it("only marks https URLs as live", () => {
    for (const project of projects) {
      if (project.liveUrl) {
        expect(project.liveUrl).toMatch(/^https:\/\//);
      }
      if (project.liveUrlVerified) {
        expect(project.liveUrl).not.toBeNull();
      }
    }
  });

  it("has complete case-study content for every project", () => {
    for (const project of projects) {
      const cs = project.caseStudy;
      expect(cs.overview.length, project.slug).toBeGreaterThan(80);
      expect(cs.problem.length, project.slug).toBeGreaterThan(80);
      expect(cs.users.length, project.slug).toBeGreaterThan(0);
      expect(cs.goals.length, project.slug).toBeGreaterThan(0);
      expect(cs.myRole.length, project.slug).toBeGreaterThan(20);
      expect(cs.keyFeatures.length, project.slug).toBeGreaterThan(0);
      expect(cs.architecture.length, project.slug).toBeGreaterThan(0);
      expect(cs.security.length, project.slug).toBeGreaterThan(0);
      expect(cs.stack.length, project.slug).toBeGreaterThan(0);
      expect(cs.lessonsLearned.length, project.slug).toBeGreaterThan(0);
    }
  });

  it("contains no lorem ipsum or internal TODO text in rendered content", () => {
    const serialized = JSON.stringify(projects).toLowerCase();
    expect(serialized).not.toContain("lorem ipsum");
    expect(serialized).not.toContain("todo:");
    expect(serialized).not.toContain("fixme");
  });

  it("does not claim HIPAA compliance or certification", () => {
    const serialized = JSON.stringify(projects);
    expect(serialized).not.toMatch(/HIPAA[- ](compliant|certified)/i);
  });

  it("frames MyFreedomOps as independent, not officially endorsed", () => {
    const mfo = projects.find((p) => p.slug === "myfreedomops");
    expect(mfo).toBeDefined();
    expect(mfo!.caseStudy.overview.toLowerCase()).toContain("not endorsed");
  });
});

describe("skills", () => {
  it("organizes skills into the required categories", () => {
    const titles = skillCategories.map((c) => c.title);
    expect(titles).toContain("Frontend");
    expect(titles).toContain("Backend");
    expect(titles).toContain("Cloud & deployment");
    expect(titles).toContain("Security & architecture");
  });

  it("has no empty categories", () => {
    for (const category of skillCategories) {
      expect(category.skills.length, category.title).toBeGreaterThan(0);
    }
  });
});

describe("experience & education", () => {
  it("has timeline entries with highlights", () => {
    expect(experience.length).toBeGreaterThan(0);
    for (const item of experience) {
      expect(item.highlights.length, item.id).toBeGreaterThan(0);
    }
  });

  it("does not publish sensitive military details", () => {
    const serialized = JSON.stringify(experience).toLowerCase();
    // No unit designations, deployment history, or home address fields exist.
    expect(serialized).not.toMatch(
      /\b(battalion|brigade|division|fort [a-z]+)\b/,
    );
  });

  it("has education entries", () => {
    expect(education.length).toBeGreaterThan(0);
  });
});
