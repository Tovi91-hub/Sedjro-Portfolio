/**
 * Central type definitions for all portfolio content.
 *
 * Every piece of editable content on the site flows through these types.
 * The `isVerified` flags exist so Sedjro can distinguish confirmed facts
 * from provisional copy without that distinction ever being rendered to
 * visitors. See CONTENT-CHECKLIST.md for the list of items awaiting
 * verification.
 */

/** A link that may not be known yet. `href: null` renders a graceful fallback. */
export interface MaybeLink {
  label: string;
  href: string | null;
  /** false = placeholder awaiting Sedjro's confirmation (see CONTENT-CHECKLIST.md) */
  isVerified: boolean;
}

export interface SocialLink {
  platform: "github" | "linkedin" | "email";
  label: string;
  href: string | null;
  isVerified: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export type ProjectStatus =
  "live" | "in-development" | "private-beta" | "academic";

export interface StackGroup {
  category: string;
  items: string[];
  /** false = stack is representative of the platform's design, pending confirmation */
  isVerified: boolean;
}

export interface CaseStudy {
  overview: string;
  problem: string;
  users: string[];
  goals: string[];
  myRole: string;
  productStrategy: string;
  keyFeatures: { title: string; description: string }[];
  architecture: string[];
  security: string[];
  challenges: { challenge: string; approach: string }[];
  stack: StackGroup[];
  deployment: string;
  currentStatus: string;
  lessonsLearned: string[];
  futureImprovements: string[];
}

export interface Project {
  slug: string;
  name: string;
  /** Short positioning line, e.g. "Flagship health technology platform" */
  portfolioRole: string;
  tagline: string;
  problem: string;
  solution: string;
  /** Short stack summary for cards */
  stackSummary: string[];
  status: ProjectStatus;
  statusLabel: string;
  featured: boolean;
  /** Ordering on the projects page */
  order: number;
  liveUrl: string | null;
  liveUrlVerified: boolean;
  repoUrl: string | null;
  /** Monogram + accent used by the placeholder screenshot frame */
  monogram: string;
  accent: string;
  domainLabel: string | null;
  /** Path under /public if a real screenshot exists; null renders the placeholder frame */
  screenshot: string | null;
  screenshotAlt: string;
  /** Exact screenshots still needed from Sedjro (documented, never rendered) */
  screenshotsNeeded: string[];
  caseStudy: CaseStudy;
  seo: { title: string; description: string };
  isVerified: boolean;
}

export interface SkillCategory {
  title: string;
  icon: string;
  summary: string;
  skills: { name: string; isVerified: boolean }[];
}

export interface ExperienceItem {
  id: string;
  category: "software" | "founder" | "military" | "education";
  role: string;
  organization: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
  isVerified: boolean;
}

export interface EducationItem {
  id: string;
  institution: string;
  program: string;
  period: string;
  status: string;
  summary: string;
  isVerified: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  status: "earned" | "in-progress" | "planned";
  year: string | null;
  isVerified: boolean;
}

export interface SiteConfig {
  name: string;
  initials: string;
  title: string;
  supportingIdentity: string;
  heroStatement: string;
  heroSupport: string;
  url: string;
  domain: string;
  locale: string;
  email: MaybeLink;
  social: SocialLink[];
  nav: NavItem[];
  resume: {
    /** Path under /public to the PDF, or null while no résumé has been provided */
    pdfPath: string | null;
    isVerified: boolean;
    updatedLabel: string | null;
  };
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    ogImage: string;
  };
}
