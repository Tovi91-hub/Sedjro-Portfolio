import type { Project } from "@/types/portfolio";

/**
 * Project and case-study content — the single source of truth for the
 * Projects page, featured cards, and every case-study route.
 *
 * Verification notes (July 2026):
 * - myvitalharmony.com, muriellehairbraids.com, and sedoinsurance.com were
 *   confirmed live and their public marketing claims informed the copy below.
 * - myfreedomops.com is live as an AI financial platform for the military
 *   community; Sedjro confirmed (July 2026) that the accountability module
 *   was added to it, and the case study covers both.
 * - Sedjro confirmed sedoinsurance.com is his product (July 2026).
 * - tovihouandegenealogy.com currently shows a "Launching Soon" page, so it is
 *   presented as in development and intentionally not linked.
 * - Stack lists marked `isVerified: false` are representative of each
 *   platform's design and must be replaced with the exact stack by Sedjro.
 *
 * Fields marked isVerified: false are provisional. Nothing in the UI exposes
 * that flag to visitors.
 */
export const projects: Project[] = [
  /* ------------------------------------------------------------------ */
  /* 1. MyVital Harmony — flagship                                       */
  /* ------------------------------------------------------------------ */
  {
    slug: "myvital-harmony",
    name: "MyVital Harmony",
    portfolioRole: "Flagship health technology & SaaS platform",
    tagline:
      "The operating system for independent healthcare & wellness businesses.",
    problem:
      "Independent practitioners and small wellness teams juggle scheduling, payments, client communication, and compliance across disconnected tools that were never designed for regulated healthcare work.",
    solution:
      "A multi-tenant SaaS platform that gives each business its own branded, isolated workspace — scheduling, Stripe payments, secure messaging, digital programs, and reporting in one system designed around healthcare privacy.",
    stackSummary: [
      "Multi-tenant SaaS",
      "Stripe & Stripe Connect",
      "Role-based access",
      "Cloud deployment",
    ],
    status: "live",
    statusLabel: "Live · in active development",
    featured: true,
    order: 1,
    liveUrl: "https://myvitalharmony.com",
    liveUrlVerified: true,
    repoUrl: null,
    monogram: "VH",
    accent: "#2f9e8f",
    domainLabel: "myvitalharmony.com",
    screenshot: null,
    screenshotAlt:
      "MyVital Harmony provider dashboard showing scheduling and client management",
    screenshotsNeeded: [
      "Public landing page (desktop, 16:10)",
      "Provider dashboard with demo data only (desktop, 16:10)",
      "Client booking flow on mobile (9:19.5)",
    ],
    caseStudy: {
      overview:
        "MyVital Harmony is a multi-tenant healthcare and wellness platform that connects patients, providers, clinics, and wellness businesses through secure digital workflows. Each business runs under its own brand with isolated data, giving solo practitioners the kind of infrastructure that is usually reserved for large healthcare organizations.",
      problem:
        "Independent healthcare and wellness professionals lose hours every week to fragmented tooling: one product for booking, another for payments, spreadsheets for client records, and email threads for everything else. None of those tools treat health information with the care regulated work demands, and none of them let a small business present a professional, branded experience to its clients.",
      users: [
        "Solo healthcare and wellness practitioners",
        "Small clinics and multi-provider teams",
        "Front-desk and support staff",
        "Patients and wellness clients booking and paying online",
      ],
      goals: [
        "Give every tenant a branded workspace with strictly isolated data",
        "Consolidate scheduling, payments, messaging, and programs into one system",
        "Design for healthcare-grade privacy from the first schema onward",
        "Keep pricing and onboarding simple enough for a one-person business",
      ],
      myRole:
        "Founder and sole developer — product strategy, UX design, full-stack implementation, payments integration, security architecture, and cloud deployment.",
      productStrategy:
        "Rather than building another point solution, MyVital Harmony is positioned as an operating system: the platform earns its place by replacing four or five subscriptions at once. Subscription tiers scale from a single provider to enterprise teams, and a free trial lowers the barrier for practitioners who are skeptical of new software.",
      keyFeatures: [
        {
          title: "Multi-tenant workspaces",
          description:
            "Every business operates under its own brand with database-level tenant isolation, so one tenant's data can never leak into another's queries.",
        },
        {
          title: "Scheduling & service management",
          description:
            "Online appointment booking, provider availability, and service catalogs built around real clinic workflows.",
        },
        {
          title: "Payments with Stripe & Stripe Connect",
          description:
            "Platform subscriptions and per-business payment processing, including connected accounts so each tenant is paid directly.",
        },
        {
          title: "Secure client messaging",
          description:
            "Provider–client communication kept inside the platform instead of scattered across personal email and SMS.",
        },
        {
          title: "Digital programs & products",
          description:
            "Practitioners can package courses and programs as digital products, adding recurring revenue beyond appointments.",
        },
        {
          title: "Role-based access control",
          description:
            "Owners, providers, staff, and clients each see exactly the workflows and records their role requires — nothing more.",
        },
      ],
      architecture: [
        "Multi-tenant SaaS architecture with database-level tenant isolation",
        "Role-based access control spanning owners, providers, staff, and clients",
        "Append-only audit trails for sensitive operations",
        "Encrypted health-data storage separated from the primary application data",
        "Transactional email for onboarding, booking, and billing events",
        "Cloud deployment designed for low-maintenance operation",
      ],
      security: [
        "Designed around healthcare privacy, access control, and data-separation principles from the start",
        "Tenant isolation enforced at the database layer, not just in application code",
        "Sensitive health data encrypted and stored apart from operational data",
        "Append-only audit logging for accountability over sensitive records",
        "No compliance certification is claimed; the platform is engineered with regulated-healthcare security considerations in mind",
      ],
      challenges: [
        {
          challenge:
            "Making true multi-tenancy safe: a single missed tenant filter in a query is a data breach in a healthcare context.",
          approach:
            "Tenant isolation was pushed down to the database layer and treated as an architectural invariant rather than a per-query discipline, with audit trails to verify access patterns.",
        },
        {
          challenge:
            "Supporting platform billing and per-business payouts at the same time.",
          approach:
            "Stripe subscriptions handle platform tiers while Stripe Connect routes client payments to each business's own account, keeping the platform out of the money-handling path.",
        },
        {
          challenge:
            "Serving both a solo practitioner and a multi-provider clinic without two codebases.",
          approach:
            "Role-based access control and per-tenant configuration let the same workflows scale from one provider to a team, with tiered plans mapping onto the same underlying model.",
        },
      ],
      stack: [
        // TODO(Sedjro): replace with the exact stack (framework, database, hosting).
        {
          category: "Platform",
          items: [
            "TypeScript/React-based web application",
            "Relational database with tenant isolation",
            "Stripe & Stripe Connect",
            "Transactional email service",
            "Cloud hosting with HTTPS",
          ],
          isVerified: false,
        },
      ],
      deployment:
        "Deployed to cloud infrastructure with HTTPS, environment-based configuration, and separated staging and production concerns.",
      currentStatus:
        "Live at myvitalharmony.com with public subscription tiers and a free trial, and in active development.",
      lessonsLearned: [
        "Security architecture is cheapest at the schema stage — retrofitting isolation is far harder than designing for it.",
        "Small businesses buy outcomes, not features: pricing and onboarding copy mattered as much as the code.",
        "Payments edge cases (trials, upgrades, connected accounts) deserve as much design time as the happy path.",
      ],
      futureImprovements: [
        "Deeper reporting and analytics for practice owners",
        "Expanded program/course authoring tools",
        "Planned pharmacy and medication-network integrations",
      ],
    },
    seo: {
      title: "MyVital Harmony — Case Study",
      description:
        "How Sedjro Tovihouande designed and built MyVital Harmony, a multi-tenant SaaS platform for independent healthcare and wellness businesses with Stripe payments and healthcare-grade privacy design.",
    },
    isVerified: false,
  },

  /* ------------------------------------------------------------------ */
  /* 2. MyFreedomOps                                                     */
  /* ------------------------------------------------------------------ */
  {
    slug: "myfreedomops",
    name: "MyFreedomOps",
    portfolioRole:
      "Financial readiness & personnel accountability platform for the military community",
    tagline:
      "Command your financial future — with first-formation accountability built in.",
    problem:
      "Military members and families fight debt, thin savings, and credit issues with generic tools — while their leaders burn every morning chasing first-formation statuses through group texts and spreadsheets.",
    solution:
      "An AI-powered financial platform built for military, government, and families — debt elimination, emergency savings, credit — plus an accountability module where Soldiers submit their own status and Platoon Sergeants get first-formation accountability in one view.",
    stackSummary: [
      "AI financial guidance",
      "Accountability module",
      "Role-based workflows",
      "Cloud deployment",
    ],
    status: "live",
    statusLabel: "Live · in active development",
    featured: true,
    order: 2,
    liveUrl: "https://myfreedomops.com",
    liveUrlVerified: true,
    repoUrl: null,
    monogram: "FO",
    accent: "#5b8def",
    domainLabel: "myfreedomops.com",
    screenshot: null,
    screenshotAlt:
      "MyFreedomOps dashboard showing financial goals and the accountability roll-up with demo data",
    screenshotsNeeded: [
      "Financial dashboard with demo data only (desktop, 16:10)",
      "Accountability status submission with demo data only (mobile, 9:19.5)",
      "PSG first-formation roll-up with demo data only (desktop, 16:10)",
    ],
    caseStudy: {
      overview:
        "MyFreedomOps is an independently developed platform serving the military community on two fronts that usually never share a product: financial readiness and personnel accountability. An AI-driven advisor helps military members, government employees, and families eliminate debt, build emergency savings, and improve credit — while the accountability module lets Soldiers submit their own status so Platoon Sergeants get first-formation accountability without the morning scramble. It is a personal product built from first-hand experience — it is not endorsed by, affiliated with, or officially deployed by the U.S. Army or the Department of Defense.",
      problem:
        "Financial stress is one of the most persistent readiness problems in the force, and generic budgeting apps don't understand military pay, benefits, or life rhythms. Meanwhile, the daily accountability that consumes every leader's morning still runs on group texts, calls, and re-typed spreadsheets. Both problems drain the same population — so the platform addresses both.",
      users: [
        "Military members and families working toward financial freedom",
        "Government employees managing debt, savings, and credit",
        "Soldiers submitting their own daily status",
        "Team Leaders, Squad Leaders, and Platoon Sergeants running first-formation accountability",
      ],
      goals: [
        "Give the military community an AI advisor that says exactly what to do next financially",
        "Make debt elimination, emergency savings, and credit improvement trackable goals",
        "Let Soldiers report status in seconds from a phone",
        "Hand PSGs a complete first-formation picture without chasing anyone",
      ],
      myRole:
        "Founder and sole developer — problem definition from lived experience as an NCO, product design, AI-assisted guidance flows, full-stack development, and cloud deployment.",
      productStrategy:
        "Both halves of the platform serve the same person at different hours of the day: the Soldier stressed about money at night is the same Soldier texting a status at 0600. Financial readiness is the commercial core — subscriptions with a free trial — and the accountability module deepens daily engagement while solving a problem every NCO recognizes instantly.",
      keyFeatures: [
        {
          title: "AI financial advisor",
          description:
            "Personalized, step-by-step guidance that tells users exactly what to do next to eliminate debt, build savings, and raise their credit score.",
        },
        {
          title: "Debt, savings & credit goals",
          description:
            "The three core financial-readiness goals tracked as concrete, measurable plans rather than generic budgets.",
        },
        {
          title: "Self-service status submission",
          description:
            "Soldiers submit their own daily status from any device using clear, predefined status categories.",
        },
        {
          title: "First-formation accountability for PSGs",
          description:
            "Statuses roll up by team and squad into one live view, so Platoon Sergeants have first-formation accountability before formation starts.",
        },
        {
          title: "Role-based visibility",
          description:
            "Team, squad, and platoon views mirror the real chain of responsibility — each leader sees their element and nothing else.",
        },
        {
          title: "Roster management",
          description:
            "Leaders manage rosters directly, keeping the reporting structure current as personnel change.",
        },
      ],
      architecture: [
        "AI-assisted guidance flows over user financial goals and progress",
        "Role-based access model mapped to team, squad, and platoon echelons",
        "Date-based reporting engine compiling individual submissions into roll-ups",
        "Secure account and access controls",
        "Email integration for account and reporting workflows",
        "Cloud deployment",
      ],
      security: [
        "Independently developed product — deliberately holds no official unit rosters, operational data, or unit-sensitive information",
        "Demo and portfolio materials use fictional personnel and financial data only",
        "Secure authentication and role-scoped authorization on every view",
        "Financial information treated as sensitive data with access limited to the account owner",
      ],
      challenges: [
        {
          challenge:
            "Serving two very different jobs — personal finance and unit accountability — without building two confusing products.",
          approach:
            "The platform is organized around the person, not the feature: one account, one clear home for each job, and shared design language so switching contexts feels natural.",
        },
        {
          challenge:
            "Modeling military reporting hierarchies without hard-coding one unit's structure.",
          approach:
            "The roster model treats echelons as composable relationships, so teams, squads, and platoons are configuration rather than code.",
        },
        {
          challenge:
            "Making AI guidance trustworthy enough for high-stakes money decisions.",
          approach:
            "Guidance is framed as concrete next steps grounded in the user's own numbers and goals, not open-ended chat — specific, checkable, and reversible.",
        },
      ],
      stack: [
        // TODO(Sedjro): replace with the exact stack (framework, database, AI provider, hosting).
        {
          category: "Platform",
          items: [
            "Modern web application stack",
            "AI-assisted guidance",
            "Relational data model for goals, rosters, and statuses",
            "Email integration",
            "Cloud hosting with HTTPS",
          ],
          isVerified: false,
        },
      ],
      deployment:
        "Live at myfreedomops.com on cloud infrastructure with HTTPS, subscriptions, and a free trial.",
      currentStatus:
        "Live and in active development — the financial platform is public with a free trial, and the accountability module is a recent addition to the product.",
      lessonsLearned: [
        "Products for nontechnical users are won or lost in the first thirty seconds of use.",
        "Building for a community you belong to collapses the distance between developer and user — the accountability module exists because I lived the problem.",
        "AI features earn trust by being specific and actionable, not conversational.",
      ],
      futureImprovements: [
        "Deeper accountability reporting and export formats",
        "Configurable status categories per organization",
        "Expanded financial-readiness tooling for military life events",
      ],
    },
    seo: {
      title: "MyFreedomOps — Case Study",
      description:
        "How Sedjro Tovihouande built MyFreedomOps, an AI-powered financial readiness platform for the military community with a built-in first-formation accountability module for unit leaders.",
    },
    isVerified: false,
  },

  /* ------------------------------------------------------------------ */
  /* 3. Murielle Hair Braids                                             */
  /* ------------------------------------------------------------------ */
  {
    slug: "murielle-hair-braids",
    name: "Murielle Hair Braids",
    portfolioRole: "Production small-business booking & operations platform",
    tagline:
      "A complete digital storefront for a professional braiding business.",
    problem:
      "A skilled braiding business was invisible online: no way for new clients to discover services, see work, check prices, or book without a phone call.",
    solution:
      "A production website and business platform with a full service catalog, online booking, a product shop, and the social proof that turns visitors into appointments.",
    stackSummary: [
      "Online booking",
      "Service catalog & shop",
      "Mobile-first design",
      "SEO",
    ],
    status: "live",
    statusLabel: "Live · in production",
    featured: true,
    order: 3,
    liveUrl: "https://muriellehairbraids.com",
    liveUrlVerified: true,
    repoUrl: null,
    monogram: "MH",
    accent: "#c98a2f",
    domainLabel: "muriellehairbraids.com",
    screenshot: null,
    screenshotAlt:
      "Murielle Hair Braids homepage showing services and online booking",
    screenshotsNeeded: [
      "Homepage hero with services (desktop, 16:10)",
      "Booking flow on mobile (9:19.5)",
      "Gallery/portfolio section (desktop, 16:10)",
    ],
    caseStudy: {
      overview:
        "Murielle Hair Braids is a live production website and digital operations platform for a professional braiding business in Colorado. It presents the full service catalog — knotless braids, box braids, cornrows, twists, and kids' styles — supports online appointment booking, and runs a small product shop for braiding hair and accessories.",
      problem:
        "The business had loyal clients but no digital presence. Discovery happened only by word of mouth, every booking required back-and-forth messages, and pricing questions consumed the owner's time. Prospective clients had no way to see the quality of the work before committing.",
      users: [
        "Prospective clients researching styles and prices",
        "Returning clients booking appointments",
        "The business owner managing services, bookings, and products",
      ],
      goals: [
        "Make the business discoverable in local search",
        "Let clients browse styles with transparent pricing",
        "Move booking online for weekend and evening slots",
        "Add a product shop as a second revenue stream",
      ],
      myRole:
        "Designer and developer — brand presentation, information architecture, full site build, booking and shop functionality, SEO, and deployment.",
      productStrategy:
        "For a service business, the website's one job is converting a visitor into a booked appointment. Every page pushes toward booking: transparent pricing removes the biggest hesitation, the gallery and testimonials build trust, and the mobile-first layout meets clients where they actually browse.",
      keyFeatures: [
        {
          title: "Service catalog with transparent pricing",
          description:
            "Every style is listed with clear pricing and duration expectations, eliminating the pricing back-and-forth.",
        },
        {
          title: "Online appointment booking",
          description:
            "Clients reserve weekend and weekday-evening slots online instead of negotiating times over the phone.",
        },
        {
          title: "Product shop",
          description:
            "Pre-stretched braiding hair, beads, and edge control sold online, with pickup coordinated around appointments.",
        },
        {
          title: "Portfolio gallery & testimonials",
          description:
            "Completed work and client reviews provide the social proof that converts first-time visitors.",
        },
        {
          title: "Social integration",
          description:
            "Facebook, Instagram, TikTok, and WhatsApp links connect the site to where the audience already lives.",
        },
      ],
      architecture: [
        "Mobile-first responsive front end",
        "Service and product catalog structured for easy owner updates",
        "Online booking workflow with email notifications",
        "Local-business SEO: structured metadata and service-focused pages",
        "Cloud deployment with HTTPS",
      ],
      security: [
        "Client contact details handled only through the booking flow — no unnecessary data collection",
        "Payment handling kept inside established processors rather than custom code",
        "HTTPS everywhere and safe external-link handling",
      ],
      challenges: [
        {
          challenge:
            "Presenting a premium brand for a small business without a design budget.",
          approach:
            "A restrained visual identity built around the work itself — photography-forward layout, consistent typography, and disciplined color use.",
        },
        {
          challenge:
            "Designing booking around real availability — evenings and weekends — rather than a generic calendar.",
          approach:
            "The booking flow reflects the owner's actual schedule, which keeps expectations accurate and no-shows down.",
        },
      ],
      stack: [
        // TODO(Sedjro): replace with the exact stack (framework, booking/payments providers).
        {
          category: "Platform",
          items: [
            "Responsive web front end",
            "Online booking workflow",
            "Stripe-based payments",
            "Email notifications",
            "Cloud hosting with HTTPS",
          ],
          isVerified: false,
        },
      ],
      deployment:
        "Live in production at muriellehairbraids.com, serving real clients.",
      currentStatus:
        "Live and serving a real business — bookings, product orders, and client discovery run through the site today.",
      lessonsLearned: [
        "For small businesses, the metric that matters is booked appointments, not page views.",
        "Transparent pricing is a feature: it filters inquiries and builds trust before the first message.",
        "The owner's ability to update content without a developer is part of the product.",
      ],
      futureImprovements: [
        "Deeper booking automation (reminders, deposits)",
        "Expanded product catalog and inventory handling",
        "Ongoing local-SEO refinement",
      ],
    },
    seo: {
      title: "Murielle Hair Braids — Case Study",
      description:
        "How Sedjro Tovihouande built a production booking and operations platform for a professional braiding business — service catalog, online booking, shop, and local SEO.",
    },
    isVerified: false,
  },

  /* ------------------------------------------------------------------ */
  /* 4. Sedoinsurance                                                    */
  /* ------------------------------------------------------------------ */
  {
    slug: "sedoinsurance",
    name: "Sedoinsurance",
    portfolioRole: "Mobile-first insurance platform for an emerging market",
    tagline: "Insurance, rethought for Benin.",
    problem:
      "In Benin, getting insured traditionally means branch visits, paperwork, and opaque pricing — friction that keeps coverage out of reach for many.",
    solution:
      "A mobile-first insurance platform where customers quote online in minutes, pay with mobile money, and manage claims from their phone, working with licensed local partners.",
    stackSummary: [
      "Mobile-first web app",
      "Quote workflows",
      "Mobile-money payments",
      "Authentication",
    ],
    status: "live",
    statusLabel: "Live",
    featured: false,
    order: 4,
    liveUrl: "https://sedoinsurance.com",
    liveUrlVerified: true,
    repoUrl: null,
    monogram: "SI",
    accent: "#7c6ff0",
    domainLabel: "sedoinsurance.com",
    screenshot: null,
    screenshotAlt: "Sedoinsurance quote flow on a mobile device",
    screenshotsNeeded: [
      "Landing page (desktop, 16:10)",
      "Quote flow on mobile (9:19.5)",
    ],
    caseStudy: {
      overview:
        "Sedoinsurance is an insurance-focused web platform built for the realities of an emerging market: mobile-native, mobile-money-friendly, and designed to compress the distance between wanting coverage and having it. It presents vehicle, health, life, and property products, with contracts issued through licensed partner insurers.",
      problem:
        "Traditional insurance in the region is built around branch offices and paper: slow quotes, cash payments, and claims processes that require showing up in person. For a mobile-first population, every one of those steps is a reason to stay uninsured.",
      users: [
        "Individuals seeking vehicle, health, life, or property coverage",
        "Customers paying premiums through mobile money",
        "Policyholders filing and tracking claims from a phone",
      ],
      goals: [
        "Deliver quotes online in minutes rather than days",
        "Meet customers on the payment rails they already use — mobile money",
        "Keep the platform compliant by partnering with licensed local insurers",
        "Design every flow mobile-first",
      ],
      myRole:
        "Founder and developer — product concept, user workflows, authentication, database integration, and service-management functionality.",
      productStrategy:
        "Rather than becoming an insurer, the platform positions itself as the digital layer over licensed partners: it owns the customer experience — quoting, payment, claims — while regulated partners carry the risk. That keeps the product asset-light and locally compliant.",
      keyFeatures: [
        {
          title: "Online quoting",
          description:
            "Guided flows produce a quote in minutes for vehicle, health, life, and property products.",
        },
        {
          title: "Mobile-money payments",
          description:
            "Premiums are payable through the mobile-money systems customers already trust.",
        },
        {
          title: "Phone-first claims",
          description:
            "Claims can be filed and followed from a phone, replacing branch visits.",
        },
        {
          title: "Account & policy management",
          description:
            "Authenticated user accounts for managing quotes, policies, and service requests.",
        },
      ],
      architecture: [
        "Mobile-first web application with authenticated user accounts",
        "Database-backed policy, quote, and service-request management",
        "Integration-ready payment workflows for mobile-money providers",
        "Cloud deployment with HTTPS",
      ],
      security: [
        "Authentication and access control around customer accounts",
        "Customer data collected only where the quoting and claims workflows require it",
        "Regulated risk carried by licensed partner insurers rather than custom infrastructure",
      ],
      challenges: [
        {
          challenge:
            "Designing trust into a digital product in a market where insurance is bought face-to-face.",
          approach:
            "Transparent products, plain-language flows, and visible licensed-partner backing stand in for the reassurance of a branch office.",
        },
        {
          challenge:
            "Building payment flows around mobile money rather than card networks.",
          approach:
            "Payment workflows were designed around regional mobile-money patterns from the start instead of retrofitting card-centric assumptions.",
        },
      ],
      stack: [
        // TODO(Sedjro): replace with the exact stack (framework, database, payment integrations).
        {
          category: "Platform",
          items: [
            "Modern web application stack",
            "Authentication and user accounts",
            "Database-backed service management",
            "Mobile-money payment workflows",
            "Cloud hosting with HTTPS",
          ],
          isVerified: false,
        },
      ],
      deployment: "Live at sedoinsurance.com on cloud infrastructure.",
      currentStatus:
        "Live platform presenting vehicle, health, life, and property products with licensed partner insurers.",
      lessonsLearned: [
        "Emerging-market products succeed by respecting local rails — mobile money first, not as an afterthought.",
        "Partnering with licensed institutions is a product decision as much as a legal one.",
      ],
      futureImprovements: [
        "Deeper claims-tracking automation",
        "Expanded partner and product coverage",
      ],
    },
    seo: {
      title: "Sedoinsurance — Case Study",
      description:
        "How Sedjro Tovihouande built Sedoinsurance, a mobile-first insurance platform for Benin with online quoting, mobile-money payments, and phone-first claims.",
    },
    isVerified: false,
  },

  /* ------------------------------------------------------------------ */
  /* 5. Tovihouande Genealogy                                            */
  /* ------------------------------------------------------------------ */
  {
    slug: "tovihouande-genealogy",
    name: "Tovihouande Genealogy",
    portfolioRole: "Secure family-history & genealogy platform",
    tagline: "A private digital home for a family's history.",
    problem:
      "Family history lives in scattered photos, memories, and unrecorded relationships — and is lost a generation at a time.",
    solution:
      "A secure, membership-based genealogy application for managing family relationships, profiles, photographs, new-arrival registration, and historical records in one private place.",
    stackSummary: [
      "Relationship modeling",
      "Member accounts",
      "Photo & records management",
      "Privacy-first design",
    ],
    status: "in-development",
    statusLabel: "In development",
    featured: false,
    order: 5,
    liveUrl: null,
    liveUrlVerified: false,
    repoUrl: null,
    monogram: "TG",
    accent: "#3f8f5f",
    domainLabel: "tovihouandegenealogy.com",
    screenshot: null,
    screenshotAlt: "Tovihouande Genealogy family-tree view with demo data",
    screenshotsNeeded: [
      "Family-tree or relationships view with demo data only (desktop, 16:10)",
    ],
    caseStudy: {
      overview:
        "Tovihouande Genealogy is a family-history application designed to preserve what usually disappears: relationships, photographs, profiles, and records across generations of one family. Membership is controlled, and the entire product is designed around the privacy of the people in it. The public site is not yet launched.",
      problem:
        "Most families have no durable record of themselves. Photos sit on individual phones, relationships live only in elders' memories, and each generation knows a little less than the one before. Commercial genealogy platforms are built for research into the past, not for a living family maintaining its own present.",
      users: [
        "Family members maintaining their own profiles",
        "Family administrators managing membership and records",
        "Relatives registering births and life events",
      ],
      goals: [
        "Model real family relationships, not just a static tree",
        "Give every member a profile and a place for photographs",
        "Support registration of new family members and key events",
        "Keep the entire archive private and membership-controlled",
      ],
      myRole:
        "Founder and developer — data modeling for family relationships, membership and access design, and application development.",
      productStrategy:
        "The product optimizes for longevity over features: a family archive is only valuable if it is still maintained in twenty years, so simplicity of contribution — adding a photo, registering a birth — takes priority over genealogical power tools.",
      keyFeatures: [
        {
          title: "Relationship & family-tree modeling",
          description:
            "Family members, generations, and relationships modeled as structured data rather than free text.",
        },
        {
          title: "Member profiles & photographs",
          description:
            "Every member has a profile with photos and biographical details maintained by the family itself.",
        },
        {
          title: "New-arrival registration",
          description:
            "Births and new members are registered into the family record as they happen.",
        },
        {
          title: "Controlled membership",
          description:
            "Access is limited to verified family members, with administrative control over who joins.",
        },
      ],
      architecture: [
        "Graph-like relational modeling of people and relationships",
        "Membership, authentication, and role-based administration",
        "Photo and record storage designed for private access only",
        "Cloud deployment planned behind the family domain",
      ],
      security: [
        "Private by default — no public profiles or discoverable member data",
        "Membership verification before any access is granted",
        "Personal family information never used in demos or portfolio materials",
      ],
      challenges: [
        {
          challenge:
            "Modeling real-world family structures that don't fit a simple tree.",
          approach:
            "Relationships are first-class records between people, which accommodates the complexity real families have.",
        },
      ],
      stack: [
        // TODO(Sedjro): replace with the exact stack when finalized.
        {
          category: "Platform",
          items: [
            "Modern web application stack",
            "Relational data model for people and relationships",
            "Private media storage",
            "Cloud hosting",
          ],
          isVerified: false,
        },
      ],
      deployment:
        "In development; the public domain currently shows a pre-launch page.",
      currentStatus:
        "In active development — the domain is reserved and the application is being built toward a private family launch.",
      lessonsLearned: [
        "Privacy-first products invert normal growth thinking: the goal is the right hundred users, not the next million.",
        "Data models for people and relationships deserve more design time than any screen.",
      ],
      futureImprovements: [
        "Timeline views of family history",
        "Document and record digitization workflows",
      ],
    },
    seo: {
      title: "Tovihouande Genealogy — Case Study",
      description:
        "A secure, membership-controlled family-history platform by Sedjro Tovihouande for managing relationships, profiles, photographs, and family records across generations.",
    },
    isVerified: false,
  },

  /* ------------------------------------------------------------------ */
  /* 6. VitalConnect — academic capstone                                 */
  /* ------------------------------------------------------------------ */
  {
    slug: "vitalconnect",
    name: "VitalConnect",
    portfolioRole: "Academic capstone project",
    tagline:
      "A healthcare software capstone — from requirements to deployment.",
    problem:
      "Academic capstones ask for the full engineering lifecycle: real requirements, real constraints, and a working, documented system at the end.",
    solution:
      "A healthcare-oriented application delivered through the complete cycle — requirements analysis, interface design, implementation, testing, documentation, and deployment — within academic constraints.",
    stackSummary: [
      "Requirements analysis",
      "Interface design",
      "Testing & documentation",
      "Deployment",
    ],
    status: "academic",
    statusLabel: "Academic capstone",
    featured: false,
    order: 6,
    liveUrl: null,
    liveUrlVerified: false,
    repoUrl: null,
    monogram: "VC",
    accent: "#8a63d2",
    domainLabel: null,
    screenshot: null,
    screenshotAlt: "VitalConnect capstone application interface",
    screenshotsNeeded: [
      "Application interface screenshot approved for sharing (desktop, 16:10)",
    ],
    caseStudy: {
      overview:
        "VitalConnect is an academic capstone project: a healthcare-oriented software application carried through the full development lifecycle under academic supervision. Unlike the production platforms in this portfolio, it is presented here as coursework — its value is the disciplined process, not commercial deployment.",
      problem:
        "The capstone brief required demonstrating professional software practice end to end: eliciting and documenting requirements, designing an interface for real users, implementing and testing the system, and delivering documentation a future maintainer could pick up.",
      users: [
        "Healthcare-context end users defined in the capstone requirements",
        "Academic evaluators assessing process and deliverables",
      ],
      goals: [
        "Practice complete requirements analysis and documentation",
        "Design and test a usable healthcare-context interface",
        "Deliver a working, documented, deployed application",
        "Meet academic standards for process evidence",
      ],
      myRole:
        "Sole developer — requirements analysis, design, implementation, testing, documentation, and deployment within the academic timeline.",
      productStrategy:
        "Treat the capstone like a client project: fixed scope, explicit requirements traceability, and deliverables that would survive a handoff.",
      keyFeatures: [
        {
          title: "Documented requirements",
          description:
            "Formal requirements analysis translated into a traceable feature set.",
        },
        {
          title: "User-centered interface",
          description:
            "Interface design driven by the defined healthcare-context users.",
        },
        {
          title: "Testing & documentation",
          description:
            "Structured testing and maintainer-grade documentation as first-class deliverables.",
        },
      ],
      architecture: [
        "Application architecture scoped to the capstone requirements",
        "Deployment demonstrating the full delivery cycle",
      ],
      security: [
        "Healthcare-context privacy considerations reflected in the design",
        "Academic project — no real patient data involved at any stage",
      ],
      challenges: [
        {
          challenge:
            "Delivering the entire lifecycle within a fixed academic timeline.",
          approach:
            "Scope was controlled through documented requirements, and process artifacts were produced alongside the code rather than after it.",
        },
      ],
      stack: [
        // TODO(Sedjro): add the actual capstone stack and course details.
        {
          category: "Project",
          items: [
            "Web application development",
            "Requirements & design documentation",
            "Structured testing",
            "Deployment",
          ],
          isVerified: false,
        },
      ],
      deployment: "Deployed as part of the capstone's delivery requirements.",
      currentStatus:
        "Completed academic capstone, presented as coursework distinct from the production products in this portfolio.",
      lessonsLearned: [
        "Process discipline — requirements, testing, documentation — is what separates a project that works from one that lasts.",
        "Academic constraints are a useful forcing function for scope control.",
      ],
      futureImprovements: [
        "Concepts from this capstone inform ongoing healthcare-platform work, including MyVital Harmony.",
      ],
    },
    seo: {
      title: "VitalConnect — Academic Capstone",
      description:
        "VitalConnect, Sedjro Tovihouande's healthcare-oriented academic capstone: requirements analysis, interface design, testing, documentation, and deployment.",
    },
    isVerified: false,
  },
];

export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order);

export const additionalProjects = projects
  .filter((p) => !p.featured)
  .sort((a, b) => a.order - b.order);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
