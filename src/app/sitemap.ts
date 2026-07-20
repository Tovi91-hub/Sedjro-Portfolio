import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "", priority: 1.0 },
    { path: "/projects", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    { path: "/experience", priority: 0.8 },
    { path: "/resume", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    { path: "/privacy", priority: 0.3 },
  ].map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${site.url}/projects/${project.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
