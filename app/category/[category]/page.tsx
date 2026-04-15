import Link from "next/link";
import { getPostsByCategory, getCategories } from "@/lib/posts";
import PostListItem from "@/components/PostListItem";
import Pagination from "@/components/Pagination";

export async function generateStaticParams() {
  const categories = await getCategories();
  // Ensure the slugs match next url structure e.g., 'Idea List' -> 'idea-list'
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

  // We need to map `categoryParam` (e.g. 'idea-list') back to its original name to query
  // Wait, let's just fetch original title from getCategories based on match
  const allCats = await getCategories();
  const originalCatName = allCats.find(c => c.toLowerCase().replace(/\s+/g, '-') === categoryParam) || categoryParam;

  const { data: posts, totalPages } = await getPostsByCategory(originalCatName, page, limit);

  return (
    <div className="container" style={{ padding: '6rem 2rem' }}>
      <div style={{ marginBottom: "2rem", fontSize: "0.875rem", fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
        <Link href="/">Home</Link> &gt; <span>{originalCatName}s</span>
      </div>

      <h1 className="hero-title">{originalCatName}</h1>

      <div className="post-list">
        {posts.map((post) => (
          <PostListItem key={post.slug} post={post} />
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} basePath={`/category/${categoryParam}`} />
    </div>
  );
}
