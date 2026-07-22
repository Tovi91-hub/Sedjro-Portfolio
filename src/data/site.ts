import type { SiteConfig } from "@/types/portfolio";

/**
 * Central site configuration.
 *
 * This is the single source of truth for personal information, navigation,
 * social links, résumé location, and default SEO. Nothing in the components
 * hard-codes these values.
 *
 * Items marked `isVerified: false` are placeholders awaiting Sedjro's
 * confirmation — see CONTENT-CHECKLIST.md. `href: null` links render a
 * graceful fallback instead of a broken link.
 */
export const site: SiteConfig = {
  name: "Sedjro Tovihouande",
  initials: "ST",
  title: "Software Developer & Cloud Computing Professional",
  supportingIdentity: "Technology Founder · U.S. Army NCO · Product Builder",
  heroStatement:
    "I build secure, practical digital platforms that solve real operational problems.",
  heroSupport:
    "Software developer, technology founder, and U.S. Army Noncommissioned Officer building user-centered platforms across healthcare, military personnel accountability, small-business operations, insurance, and family technology.",
  url: "https://sedjrotovihouande.com",
  domain: "sedjrotovihouande.com",
  locale: "en_US",

  // TODO(Sedjro): confirm this mailbox exists before launch (see CONTENT-CHECKLIST.md).
  email: {
    label: "contact@sedjrotovihouande.com",
    href: "mailto:contact@sedjrotovihouande.com",
    isVerified: false,
  },

  social: [
    {
      platform: "github",
      label: "GitHub",
      href: "https://github.com/Tovi91-hub",
      isVerified: true,
    },
    // TODO(Sedjro): add the real LinkedIn profile URL. Set href and isVerified: true.
    { platform: "linkedin", label: "LinkedIn", href: null, isVerified: false },
    {
      platform: "email",
      label: "Email",
      href: "mailto:contact@sedjrotovihouande.com",
      isVerified: false,
    },
  ],

  nav: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Experience", href: "/experience" },
    { label: "Contact", href: "/contact" },
  ],

  resume: {
    pdfPath: "/resume/sedjro-tovihouande-resume.pdf",
    isVerified: true,
    updatedLabel: "July 2026",
  },

  seo: {
    defaultTitle:
      "Sedjro Tovihouande | Software Developer & Cloud Professional",
    titleTemplate: "%s | Sedjro Tovihouande",
    defaultDescription:
      "Portfolio of Sedjro Tovihouande — software developer, cloud computing professional, U.S. Army NCO, and builder of healthcare, military workflow, and business platforms.",
    ogImage: "/og/og-default.png",
  },
};
