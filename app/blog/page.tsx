import Link from "next/link";
import { getPaginatedPosts } from "@/lib/posts";
import PostListItem from "@/components/PostListItem";
import Pagination from "@/components/Pagination";

export default async function BlogListingPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageStr } = await searchParams;
  const page = pageStr ? parseInt(pageStr, 10) : 1;
  const limit = 24;
  const { data: posts, totalPages } = await getPaginatedPosts(page, limit);

  return (
    <div className="container" style={{ padding: '6rem 2rem' }}>
      <h1 className="hero-title">BLOG</h1>
      <div className="filter-tabs">
        <Link href="/blog" className="filter-tab active">All</Link>
        <Link href="/category/tutorial" className="filter-tab">Tutorials</Link>
        <Link href="/category/checklist" className="filter-tab">Checklists</Link>
        <Link href="/category/idea-list" className="filter-tab">Idea Lists</Link>
        <Link href="/category/case-study" className="filter-tab">Case Studies</Link>
      </div>

      <div className="post-list">
        {posts.map((post) => (
          <PostListItem key={post.slug} post={post} />
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} basePath="/blog" />
    </div>
  );
}
