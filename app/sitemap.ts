import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/posts";

const SITEMAP_SIZE = 5000;
const BATCH_SIZE = 200;
const DAYS_PER_BATCH = 3;
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://learncodewithrk.shop"; 

async function getDripLimitedSlugs() {
  const allSlugs = await getAllSlugs();
  
  // Calculate how many articles are allowed based on the start date
  const startDateStr = process.env.INDEXING_START_DATE || "2026-04-20";
  const startDate = new Date(startDateStr);
  const today = new Date();
  
  // Difference in days
  const diffInMs = today.getTime() - startDate.getTime();
  const diffInDays = Math.max(0, Math.floor(diffInMs / (1000 * 60 * 60 * 24)));
  
  // Number of 3-day intervals passed
  const intervalsPassed = Math.floor(diffInDays / DAYS_PER_BATCH);
  
  // Total allowed count: starts with 200, adds 200 every 3 days
  const allowedCount = (intervalsPassed + 1) * BATCH_SIZE;
  
  return allSlugs.slice(0, allowedCount);
}

// This generates multiple sitemaps under /sitemap-[id].xml which are linked from /sitemap.xml
export async function generateSitemaps() {
  const slugs = await getDripLimitedSlugs();
  const numberOfSitemaps = Math.ceil(slugs.length / SITEMAP_SIZE);
  return Array.from({ length: numberOfSitemaps }, (_, i) => ({ id: i }));
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const slugs = await getDripLimitedSlugs();

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
