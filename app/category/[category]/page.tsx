import Link from "next/link";
import type { Metadata } from "next";
import { getPostsByCategory, getCategories } from "@/lib/posts";
import PostListItem from "@/components/PostListItem";
import Pagination from "@/components/Pagination";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat) => ({
    category: cat.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata(
  { params, searchParams }: { params: Promise<{ category: string }>, searchParams: Promise<{ page?: string }> }
): Promise<Metadata> {
  const { category: categoryParam } = await params;
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  
  const allCats = await getCategories();
  const originalCatName = allCats.find(c => c.toLowerCase().replace(/\s+/g, '-') === categoryParam) || categoryParam;
  
  const canonicalUrl = currentPage > 1 ? `/category/${categoryParam}?page=${currentPage}` : `/category/${categoryParam}`;

  return {
    title: `${originalCatName} Guides | LearnCode With RK`,
    description: `Explore our collection of ${originalCatName} tutorials and expert guides.`,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function CategoryHubPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { category: categoryParam } = await params;
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  const limit = 24;

  const allCats = await getCategories();
  const originalCatName = allCats.find(c => c.toLowerCase().replace(/\s+/g, '-') === categoryParam) || categoryParam;

  const { data: posts, totalPages } = await getPostsByCategory(originalCatName, currentPage, limit);

  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-8 py-16 md:py-24">
      <div className="mb-8 text-sm font-mono text-text-secondary">
        <Link href="/" className="hover:text-gold transition-colors duration-300">Home</Link>
        {" > "}
        <span>{originalCatName}</span>
      </div>
      <div className="py-8 md:py-16 border-b border-border-subtle mb-16">
        <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.85] tracking-[-0.04em] uppercase text-text-primary font-header break-words text-balance text-hot-pink">
          {originalCatName}
        </h1>
      </div>

      <div>
        {posts.map((post) => (
          <PostListItem key={post.slug} post={post} />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} basePath={`/category/${categoryParam}`} />
    </div>
  );
}
