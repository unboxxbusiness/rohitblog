import { getPostsByCategory, getCategories } from "@/lib/posts";
import type { Metadata } from "next";
import PostListItem from "@/components/PostListItem";
import Pagination from "@/components/Pagination";
import Link from "next/link";

export async function generateStaticParams() {
  const categories = await getCategories();
  const paths = [];
  
  for (const cat of categories) {
    const catSlug = cat.toLowerCase().replace(/\s+/g, '-');
    const { totalPages } = await getPostsByCategory(cat, 1, 24);
    for (let i = 1; i <= Math.min(totalPages, 5); i++) {
      paths.push({ 
        category: catSlug,
        page: i.toString() 
      });
    }
  }
  return paths;
}

export async function generateMetadata(
  { params }: { params: Promise<{ category: string; page: string }> }
): Promise<Metadata> {
  const { category: categoryParam, page: pageStr } = await params;
  const page = parseInt(pageStr, 10);
  
  const allCats = await getCategories();
  const originalCatName = allCats.find(c => c.toLowerCase().replace(/\s+/g, '-') === categoryParam) || categoryParam;
  
  const canonicalUrl = page === 1 ? `/category/${categoryParam}` : `/category/${categoryParam}/p/${page}`;

  return {
    title: `${originalCatName} Guides | Page ${page} | LearnCode With RK`,
    description: `Browse page ${page} of our ${originalCatName} tutorials and expert guides.`,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function CategoryPaginationPage({
  params,
}: {
  params: Promise<{ category: string; page: string }>;
}) {
  const { category: categoryParam, page: pageStr } = await params;
  const page = parseInt(pageStr, 10);
  const limit = 24;

  const allCats = await getCategories();
  const originalCatName = allCats.find(c => c.toLowerCase().replace(/\s+/g, '-') === categoryParam) || categoryParam;

  const { data: posts, totalPages } = await getPostsByCategory(originalCatName, page, limit);

  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-8 py-16 md:py-24">
      <div className="mb-8 text-sm font-mono text-text-secondary">
        <Link href="/" className="hover:text-gold transition-colors duration-300">Home</Link>
        {" > "}
        <Link href={`/category/${categoryParam}`} className="hover:text-gold transition-colors duration-300">{originalCatName}</Link>
        {" > "}
        <span>Page {page}</span>
      </div>
      <div className="py-8 md:py-16 border-b border-border-subtle mb-16">
        <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.85] tracking-[-0.04em] uppercase text-text-primary font-header break-words text-balance text-hot-pink">
          {originalCatName} — PAGE {page}
        </h1>
      </div>

      <div>
        {posts.map((post) => (
          <PostListItem key={post.slug} post={post} />
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} basePath={`/category/${categoryParam}`} />
    </div>
  );
}
