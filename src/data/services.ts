import type { ServiceOffering } from "@/types/portfolio";

/**
 * Service offerings — the single source of truth for the /services page and
 * the request-a-quote form's service selector.
 *
 * Each offering mirrors a product in the Sedjro Digital Stripe catalog
 * (stripeProductId is a bookkeeping reference, never rendered). Prices here
 * are display copy; the authoritative price is always the Stripe invoice or
 * checkout session the client receives.
 */
export const services: ServiceOffering[] = [
  {
    slug: "website-design-development",
    name: "Website Design & Development",
    icon: "globe",
    tagline: "A fast, secure website that earns trust and wins business.",
    description:
      "Custom design and development from discovery to launch — built on modern foundations (Next.js, accessibility, SEO, performance budgets) and handed off with everything you need to own it.",
    deliverables: [
      "Discovery call and written proposal",
      "Custom UX/UI design (mobile-first, light & dark)",
      "Development, content load, and launch",
      "SEO, analytics, and performance baseline",
      "Handoff documentation and 30 days of post-launch fixes",
    ],
    pricing: { model: "from", amount: 1500 },
    stripeProductId: "prod_V1eG9VWtn7eBQ1",
  },
  {
    slug: "website-maintenance",
    name: "Website Maintenance",
    icon: "wrench",
    tagline: "Your site stays fast, secure, and up to date — every month.",
    description:
      "Ongoing care for an existing website: dependency and security updates, backups, uptime monitoring, small content changes, and priority support when something needs attention.",
    deliverables: [
      "Software and security updates",
      "Backups and uptime monitoring",
      "Monthly content edits (reasonable use)",
      "Priority email support",
      "Monthly summary of work performed",
    ],
    pricing: { model: "monthly", amount: 100 },
    stripeProductId: "prod_V1eHvBhfmc8Qqd",
  },
  {
    slug: "ai-software-consulting",
    name: "AI & Software Consulting",
    icon: "bot",
    tagline: "Practical AI and software guidance from someone who ships.",
    description:
      "Hands-on consulting for teams and founders: AI feature design and integration, automation of manual workflows, architecture reviews, and build-vs-buy decisions grounded in real production experience.",
    deliverables: [
      "AI strategy and integration roadmap",
      "Custom AI feature prototypes",
      "Workflow automation",
      "Architecture and code reviews",
      "Written recommendations you can act on",
    ],
    pricing: { model: "hourly", amount: 125 },
    stripeProductId: "prod_V1eHIVapDVV8ic",
  },
  {
    slug: "aws-cloud-consulting",
    name: "AWS Cloud Consulting",
    icon: "cloud",
    tagline: "Cloud architecture that is secure, scalable, and cost-aware.",
    description:
      "AWS help for real workloads: well-architected reviews, migrations, serverless builds, infrastructure as code, security hardening, and cost optimization that pays for itself.",
    deliverables: [
      "Well-Architected review with findings",
      "Migration planning and execution",
      "Infrastructure as code (CDK/Terraform)",
      "Security and cost optimization",
      "DevOps and CI/CD guidance",
    ],
    pricing: { model: "hourly", amount: 150 },
    stripeProductId: "prod_V1eIHBqlGvqcbq",
  },
  {
    slug: "saas-platforms",
    name: "SaaS Platform Subscription",
    icon: "layers",
    tagline: "Run your business on a platform built and operated for you.",
    description:
      "Subscription access to Sedjro Digital's operated platforms — booking, commerce, and operations tools for small businesses — with hosting, updates, support, and new features included.",
    deliverables: [
      "Your own branded storefront and dashboard",
      "Hosting, security, and backups included",
      "Continuous updates and new features",
      "Email support",
      "Cancel anytime",
    ],
    pricing: { model: "monthly", amount: 20 },
    stripeProductId: "prod_V1eJhYRkampLfu",
  },
];

export const priceLabel = (s: ServiceOffering): string => {
  const usd = s.pricing.amount.toLocaleString("en-US");
  switch (s.pricing.model) {
    case "from":
      return `from $${usd}`;
    case "hourly":
      return `$${usd}/hour`;
    case "monthly":
      return `$${usd}/month`;
  }
};
