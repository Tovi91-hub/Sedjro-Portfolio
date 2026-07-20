import type { SkillCategory } from "@/types/portfolio";

/**
 * Skills, organized by meaningful category.
 *
 * Verification policy: entries marked `isVerified: true` are demonstrated by
 * this repository itself or confirmed against Sedjro's live products.
 * Entries marked `isVerified: false` come from Sedjro's project brief and
 * must be confirmed (see CONTENT-CHECKLIST.md). The flag is never rendered
 * to visitors — it exists for content maintenance only.
 */
export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "layout",
    summary:
      "Accessible, responsive interfaces that nontechnical users understand at a glance.",
    skills: [
      { name: "React", isVerified: true },
      { name: "Next.js", isVerified: true },
      { name: "TypeScript", isVerified: true },
      { name: "Tailwind CSS", isVerified: true },
      { name: "Responsive & mobile-first design", isVerified: true },
      { name: "Web accessibility (WCAG)", isVerified: true },
    ],
  },
  {
    title: "Backend",
    icon: "server",
    summary:
      "Server-side application logic, APIs, and role-based workflow engines.",
    skills: [
      { name: "Node.js", isVerified: true },
      { name: "REST APIs", isVerified: false },
      { name: "Authentication & sessions", isVerified: false },
      { name: "Role-based access control", isVerified: false },
      { name: "Multi-tenant architecture", isVerified: false },
    ],
  },
  {
    title: "Databases",
    icon: "database",
    summary:
      "Relational modeling with an emphasis on tenant isolation and data separation.",
    skills: [
      { name: "Relational data modeling", isVerified: false },
      { name: "SQL", isVerified: false },
      { name: "Tenant-isolated schemas", isVerified: false },
      { name: "Audit-trail design", isVerified: false },
    ],
  },
  {
    title: "Cloud & deployment",
    icon: "cloud",
    summary:
      "Shipping and operating production platforms on modern cloud infrastructure.",
    skills: [
      { name: "Vercel", isVerified: true },
      { name: "AWS (graduate coursework)", isVerified: false },
      { name: "CI-friendly builds", isVerified: true },
      { name: "DNS & custom domains", isVerified: true },
      { name: "Environment-based configuration", isVerified: true },
    ],
  },
  {
    title: "Payments & integrations",
    icon: "credit-card",
    summary: "Commerce and communication flows that real businesses depend on.",
    skills: [
      { name: "Stripe", isVerified: false },
      { name: "Stripe Connect", isVerified: false },
      { name: "Subscription billing", isVerified: false },
      { name: "Transactional email", isVerified: false },
      { name: "Mobile-money payment flows", isVerified: false },
    ],
  },
  {
    title: "Security & architecture",
    icon: "shield",
    summary:
      "Privacy-first design for platforms that handle sensitive information.",
    skills: [
      { name: "Secure application design", isVerified: true },
      { name: "Healthcare-privacy-minded architecture", isVerified: false },
      { name: "Data separation & encryption at rest", isVerified: false },
      { name: "Input validation & sanitization", isVerified: true },
      { name: "Security headers & CSP", isVerified: true },
    ],
  },
  {
    title: "Developer tools",
    icon: "wrench",
    summary: "A disciplined, repeatable development workflow.",
    skills: [
      { name: "Git & GitHub", isVerified: true },
      { name: "ESLint & Prettier", isVerified: true },
      { name: "Vitest & Testing Library", isVerified: true },
      { name: "npm", isVerified: true },
    ],
  },
  {
    title: "Leadership & product",
    icon: "users",
    summary:
      "NCO leadership applied to product decisions, planning, and delivery.",
    skills: [
      { name: "Team leadership & accountability", isVerified: true },
      { name: "Product strategy", isVerified: true },
      { name: "Requirements analysis", isVerified: true },
      { name: "Planning & risk management", isVerified: true },
      { name: "Communication with nontechnical users", isVerified: true },
    ],
  },
];
