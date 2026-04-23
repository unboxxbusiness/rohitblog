import Link from "next/link";
import type { Metadata } from "next";
import { getPaginatedPosts } from "@/lib/posts";
import PostListItem from "@/components/PostListItem";
import Pagination from "@/components/Pagination";

export async function generateMetadata(
  { searchParams }: { searchParams: Promise<{ page?: string }> }
): Promise<Metadata> {
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  const canonicalUrl = currentPage > 1 ? `/blog?page=${currentPage}` : "/blog";

  return {
    title: "All Expert Guides | LearnCode With RK",
    description: "Browse our complete library of 20,000+ AI-generated tutorials, case studies, and guides.",
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function BlogListingPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  const limit = 24;
  const { data: posts, totalPages } = await getPaginatedPosts(currentPage, limit);

  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-8 py-16 md:py-24">
      <div className="py-8 md:py-16 border-b border-border-subtle mb-16">
        <h1 className="text-[clamp(2.5rem,10vw,8rem)] font-black leading-[0.85] tracking-[-0.04em] uppercase text-text-primary font-header break-words text-balance">
          ALL <span className="text-hot-pink">POSTS</span>
        </h1>
      </div>
      <div className="flex flex-wrap items-center gap-6 mb-12">
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

      <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/blog" />
    </div>
  );
}
