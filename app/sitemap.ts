import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/posts";
import { BASE_URL } from "@/lib/constants";

const BATCH_SIZE = 200;
const DAYS_PER_BATCH = 3;

async function getDripLimitedSlugs() {
  const allSlugs = await getAllSlugs();
  
  if (!allSlugs || allSlugs.length === 0) return [];

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
  // Ensure we always return at least the first batch if today is the start date
  const allowedCount = (intervalsPassed + 1) * BATCH_SIZE;
  
  return allSlugs.slice(0, allowedCount);
}
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getDripLimitedSlugs();

  const staticRoutes = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/for/student`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/for/freelancer`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/for/founder`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
  ];

  const blogRoutes = slugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes];
}
