import fs from 'fs';
import path from 'path';
import type { BlogPost, ManifestEntry, PaginatedResult } from './types';

// The data directory is located at the root of the project.
// We use a helper to ensure process.cwd() is correctly resolved in various environments.
const getDataDir = () => path.join(process.cwd(), 'data');
const getManifestPath = () => path.join(getDataDir(), '_manifest.json');

// Cache manifest in memory to avoid parsing 20k rows on every request
let cachedManifest: ManifestEntry[] | null = null;

export async function getManifest(): Promise<ManifestEntry[]> {
  if (cachedManifest) return cachedManifest;
  try {
    const fileContents = fs.readFileSync(getManifestPath(), 'utf8');
    cachedManifest = JSON.parse(fileContents);
    return cachedManifest as ManifestEntry[];
  } catch (e) {
    console.error("Failed to load manifest.json", e);
    return [];
  }
}

export async function getAllSlugs(): Promise<string[]> {
  const manifest = await getManifest();
  return manifest.map((entry) => entry.slug);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(getDataDir(), `${slug}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as BlogPost;
  } catch (e) {
    console.error(`Post not found: ${slug}`);
    return null;
  }
}

function paginate<T>(items: T[], page: number, limit: number): PaginatedResult<T> {
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    data: items.slice(start, end),
    total: items.length,
    totalPages: Math.ceil(items.length / limit),
    currentPage: page,
  };
}

export async function getPaginatedPosts(page: number = 1, limit: number = 24): Promise<PaginatedResult<ManifestEntry>> {
  const manifest = await getManifest();
  // Reverse the manifest so let's say "newest" or last generated are first, 
  // or just use it as is. We'll use the manifest as is.
  return paginate(manifest, page, limit);
}

export async function getPostsByPersona(persona: string, page: number = 1, limit: number = 24): Promise<PaginatedResult<ManifestEntry>> {
  const manifest = await getManifest();
  const filtered = manifest.filter(p => p.persona.toLowerCase() === persona.toLowerCase());
  return paginate(filtered, page, limit);
}

export async function getPostsByCategory(category: string, page: number = 1, limit: number = 24): Promise<PaginatedResult<ManifestEntry>> {
  const manifest = await getManifest();
  const filtered = manifest.filter(p => p.content_category.toLowerCase() === category.toLowerCase());
  return paginate(filtered, page, limit);
}

export async function getPersonas(): Promise<string[]> {
  const manifest = await getManifest();
  const personas = new Set(manifest.map(p => p.persona));
  return Array.from(personas);
}

export async function getCategories(): Promise<string[]> {
  const manifest = await getManifest();
  const categories = new Set(manifest.map(p => p.content_category));
  return Array.from(categories);
}
