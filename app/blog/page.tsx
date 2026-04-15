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
    <div className="max-w-[1200px] mx-auto px-8 py-24">
      <h1 className="text-[clamp(3rem,12vw,10rem)] font-black leading-[0.85] tracking-[-0.04em] uppercase break-words mb-8">
        BLOG
      </h1>
      <div className="flex flex-wrap gap-6 mb-16 border-b border-border-subtle pb-4">
        <Link href="/blog" className="text-sm font-medium tracking-[0.05em] uppercase text-text-primary transition-colors duration-300">All</Link>
        <Link href="/category/tutorial" className="text-sm font-medium tracking-[0.05em] uppercase text-text-secondary hover:text-text-primary transition-colors duration-300">Tutorials</Link>
        <Link href="/category/checklist" className="text-sm font-medium tracking-[0.05em] uppercase text-text-secondary hover:text-text-primary transition-colors duration-300">Checklists</Link>
        <Link href="/category/idea-list" className="text-sm font-medium tracking-[0.05em] uppercase text-text-secondary hover:text-text-primary transition-colors duration-300">Idea Lists</Link>
        <Link href="/category/case-study" className="text-sm font-medium tracking-[0.05em] uppercase text-text-secondary hover:text-text-primary transition-colors duration-300">Case Studies</Link>
      </div>

      <div>
        {posts.map((post) => (
          <PostListItem key={post.slug} post={post} />
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} basePath="/blog" />
    </div>
  );
}
