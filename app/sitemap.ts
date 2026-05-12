import type { MetadataRoute } from "next";

const siteUrl = "https://growth.gurubox.ai";

const routes = [
  { path: "/", priority: 1 },
  { path: "/ai-website-growth-checker", priority: 0.8 },
  { path: "/free-website-growth-audit", priority: 0.8 },
  { path: "/audit", priority: 0.9 },
  { path: "/pricing", priority: 0.7 },
  { path: "/blog", priority: 0.7 },
  { path: "/about", priority: 0.6 },
  { path: "/privacy", priority: 0.4 },
  { path: "/terms", priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route.path === "/" ? "" : route.path}`,
    lastModified,
    changeFrequency: route.path === "/blog" ? "weekly" : "monthly",
    priority: route.priority,
  }));
}
