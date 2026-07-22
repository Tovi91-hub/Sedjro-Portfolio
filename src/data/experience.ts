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
    role: "Sergeant — Noncommissioned Officer (Active Duty)",
    organization: "United States Army",
    // Unit details intentionally not published on the website.
    period: "2020 – Present",
    summary:
      "Serving as an active-duty NCO, responsible for leading, training, and developing Soldiers. This leadership experience directly shapes how I plan, communicate, and deliver software.",
    highlights: [
      "Leadership and accountability for people, equipment, and mission outcomes",
      "Planning and risk management under real constraints",
      "Clear communication across ranks and with nontechnical audiences",
      "Calm, structured decision-making when conditions change",
    ],
    isVerified: true,
  },
];

export const education: EducationItem[] = [
  {
    id: "purdue-global",
    institution: "Purdue University Global",
    program:
      "B.S. in Information Technology — Software Development Using Web Languages",
    period: "Completed April 2026",
    status: "Magna Cum Laude",
    summary:
      "Bachelor of Science earned magna cum laude with a concentration in software development using web languages — applied directly to shipping production platforms.",
    isVerified: true,
  },
  {
    id: "iut-lokossa",
    institution: "IUT Lokossa — University of Abomey-Calavi (Benin)",
    program:
      "Vocational Bachelor's — Electrical Engineering & Industrial Data Processing",
    period: "2010 – 2013",
    status: "Upper Second-Class Honours",
    summary:
      "Engineering foundation spanning computer architecture, object-oriented programming, databases, and Linux/Windows network administration. NACES-evaluated U.S. equivalency with a 3.73/4.00 GPA.",
    isVerified: true,
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
  {
    id: "airborne",
    name: "Airborne School",
    issuer: "United States Army",
    status: "earned",
    year: null,
    isVerified: true,
  },
  {
    id: "hazmat",
    name: "Hazmat Certifier",
    issuer: "United States Army",
    status: "earned",
    year: null,
    isVerified: true,
  },
  {
    id: "upl",
    name: "Unit Prevention Leader",
    issuer: "United States Army",
    status: "earned",
    year: null,
    isVerified: true,
  },
  {
    id: "security-mgmt",
    name: "Security Management (S2)",
    issuer: "United States Army",
    status: "earned",
    year: null,
    isVerified: true,
  },
  {
    id: "security-plus",
    name: "CompTIA Security+",
    issuer: "CompTIA · in progress",
    status: "in-progress",
    year: null,
    isVerified: true,
  },
];
