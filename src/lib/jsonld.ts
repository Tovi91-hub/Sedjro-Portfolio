import { site } from "@/data/site";
import type { Project } from "@/types/portfolio";

/**
 * JSON-LD structured-data builders (schema.org).
 * Only verified links are included in `sameAs`.
 */

type JsonLd = Record<string, unknown>;

export function personJsonLd(): JsonLd {
  const sameAs = site.social
    .filter((s) => s.isVerified && s.href && !s.href.startsWith("mailto:"))
    .map((s) => s.href as string);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: "Software Developer & Cloud Computing Professional",
    description: site.seo.defaultDescription,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function webSiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.seo.defaultDescription,
  };
}

export function profilePageJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: site.url,
    mainEntity: personJsonLd(),
  };
}

export function projectJsonLd(project: Project): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.tagline,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    ...(project.liveUrl && project.liveUrlVerified
      ? { url: project.liveUrl }
      : {}),
    author: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: new URL(item.path, site.url).toString(),
    })),
  };
}

/** Serialize for a <script type="application/ld+json"> tag. */
export function jsonLdScript(data: JsonLd | JsonLd[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
