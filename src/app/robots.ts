import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  // Preview/staging deployments should not be indexed.
  if (process.env.NEXT_PUBLIC_NOINDEX === "true") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
