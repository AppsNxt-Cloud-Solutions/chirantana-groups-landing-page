import type { MetadataRoute } from "next";
import { verticals } from "@/content/verticals";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();

  // Typed before the map, otherwise the literal changeFrequency values widen
  // to `string` and no longer satisfy MetadataRoute.Sitemap.
  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
      { url: `${base}/verticals`, changeFrequency: "monthly", priority: 0.9 },
      { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.8 },
      { url: `${base}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
      { url: `${base}/terms-of-use`, changeFrequency: "yearly", priority: 0.2 },
    ] satisfies MetadataRoute.Sitemap
  ).map((entry) => ({ ...entry, lastModified: now }));

  const verticalRoutes: MetadataRoute.Sitemap = verticals.map((v) => ({
    url: `${base}/verticals/${v.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...verticalRoutes];
}
