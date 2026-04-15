import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/posts";

const SITEMAP_SIZE = 5000;
const BASE_URL = "https://example.com"; // User hasn't provided domain, using default. Needs change later.

// This generates multiple sitemaps under /sitemap-[id].xml which are linked from /sitemap.xml
export async function generateSitemaps() {
  const slugs = await getAllSlugs();
  const numberOfSitemaps = Math.ceil(slugs.length / SITEMAP_SIZE);
  return Array.from({ length: numberOfSitemaps }, (_, i) => ({ id: i }));
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllSlugs();

  const start = id * SITEMAP_SIZE;
  const end = start + SITEMAP_SIZE;
  const currentSlugs = slugs.slice(start, end);

  return currentSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));
}
