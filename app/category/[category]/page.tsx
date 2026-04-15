import Link from "next/link";
import { getPostsByCategory, getCategories } from "@/lib/posts";
import PostListItem from "@/components/PostListItem";
import Pagination from "@/components/Pagination";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat) => ({
    category: cat.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export default async function CategoryHubPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { category: categoryParam } = await params;
  const { page: pageStr } = await searchParams;
  const page = pageStr ? parseInt(pageStr, 10) : 1;
  const limit = 24;

  const allCats = await getCategories();
  const originalCatName = allCats.find(c => c.toLowerCase().replace(/\s+/g, '-') === categoryParam) || categoryParam;

  const { data: posts, totalPages } = await getPostsByCategory(originalCatName, page, limit);

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-24">
      <div className="mb-8 text-sm font-mono text-text-secondary">
        <Link href="/" className="hover:text-gold transition-colors duration-300">Home</Link>
        {" > "}
        <span>{originalCatName}</span>
      </div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight font-header my-12 text-text-primary capitalize">
        {originalCatName}
      </h1>

      <div>
        {posts.map((post) => (
          <PostListItem key={post.slug} post={post} />
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} basePath={`/category/${categoryParam}`} />
    </div>
  );
}
