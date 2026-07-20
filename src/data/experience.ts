import type {
  Certification,
  EducationItem,
  ExperienceItem,
} from "@/types/portfolio";

/**
 * Experience timeline, education, and certifications.
 *
 * Honesty policy: no dates, ranks, duty titles, units, or award claims are
 * invented. Entries use period placeholders ("Present", "Dates on résumé")
 * until Sedjro confirms them — see CONTENT-CHECKLIST.md. `isVerified: false`
 * marks entries awaiting confirmation; the flag is never rendered.
 */
export const experience: ExperienceItem[] = [
  {
    id: "founder-products",
    category: "founder",
    role: "Founder & Software Developer",
    organization:
      "Independent products (MyVital Harmony, MyFreedomOps, Sedoinsurance)",
    // TODO(Sedjro): confirm start year.
    period: "Present",
    summary:
      "Designing, building, and operating multiple production web platforms end to end — product strategy, full-stack development, payments, security architecture, and cloud deployment.",
    highlights: [
      "Built and launched a multi-tenant healthcare & wellness SaaS with subscription billing",
      "Designed role-based accountability workflows for military team structures",
      "Shipped a mobile-first insurance platform working with licensed partners",
      "Own the full lifecycle: design, code, deployment, and iteration",
    ],
    isVerified: false,
  },
  {
    id: "client-work",
    category: "software",
    role: "Web Developer",
    organization: "Small-business client work (Murielle Hair Braids)",
    // TODO(Sedjro): confirm dates.
    period: "Dates on résumé",
    summary:
      "Delivered a production booking and digital-operations platform for a real business — from brand presentation to online booking, product shop, and local SEO.",
    highlights: [
      "Translated a nontechnical owner's needs into a working digital storefront",
      "Live in production, handling real bookings and product orders",
    ],
    isVerified: false,
  },
  {
    id: "army-nco",
    category: "military",
    role: "Noncommissioned Officer (Active Duty)",
    organization: "United States Army",
    // TODO(Sedjro): confirm service period. No unit, MOS, or location published by design.
    period: "Present",
    summary:
      "Serving as an active-duty NCO, responsible for leading, training, and developing Soldiers. This leadership experience directly shapes how I plan, communicate, and deliver software.",
    highlights: [
      "Leadership and accountability for people, equipment, and mission outcomes",
      "Planning and risk management under real constraints",
      "Clear communication across ranks and with nontechnical audiences",
      "Calm, structured decision-making when conditions change",
    ],
    isVerified: false,
  },
];

export const education: EducationItem[] = [
  {
    id: "purdue-global",
    institution: "Purdue Global",
    // TODO(Sedjro): confirm exact program name and dates.
    program: "Software & Web Development studies",
    period: "Dates on résumé",
    status: "In progress / completed — confirm",
    summary:
      "Formal education in software development and web technologies, applied directly to shipping production platforms.",
    isVerified: false,
  },
  {
    id: "aws-graduate",
    institution: "Graduate studies",
    // TODO(Sedjro): confirm institution, program name, and start date.
    program: "AWS Cloud Computing specialization",
    period: "Planned / in progress — confirm",
    status: "Graduate specialization",
    summary:
      "Graduate-level focus on AWS cloud computing — architecture, services, and operating production workloads in the cloud.",
    isVerified: false,
  },
];

export const certifications: Certification[] = [
  // TODO(Sedjro): add earned certifications only. Do not list planned certs as earned.
  // Example shape:
  // { id: "aws-ccp", name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", status: "earned", year: "2025", isVerified: true },
];
