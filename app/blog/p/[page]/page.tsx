import { getPaginatedPosts } from "@/lib/posts";
import type { Metadata } from "next";
import PostListItem from "@/components/PostListItem";
import Pagination from "@/components/Pagination";

export async function generateStaticParams() {
  const { totalPages } = await getPaginatedPosts(1, 24);
  const paths = [];
  for (let i = 1; i <= Math.min(totalPages, 10); i++) {
    paths.push({ page: i.toString() });
  }
  return paths;
}

export async function generateMetadata(
  { params }: { params: Promise<{ page: string }> }
): Promise<Metadata> {
  const { page: pageStr } = await params;
  const page = parseInt(pageStr, 10);
  const canonicalUrl = page === 1 ? "/blog" : `/blog/p/${page}`;

  return {
    title: `All Expert Guides | Page ${page} | LearnCode With RK`,
    description: `Browse page ${page} of our complete library of 20,000+ AI-generated tutorials.`,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function BlogPaginationPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page: pageStr } = await params;
  const page = parseInt(pageStr, 10);
  const limit = 24;
  const { data: posts, totalPages } = await getPaginatedPosts(page, limit);

  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-8 py-16 md:py-24">
      <div className="py-8 md:py-16 border-b border-border-subtle mb-16">
        <h1 className="text-[clamp(2.5rem,10vw,8rem)] font-black leading-[0.85] tracking-[-0.04em] uppercase text-text-primary font-header break-words text-balance">
          ALL <span className="text-hot-pink">POSTS</span> — PAGE {page}
        </h1>
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
