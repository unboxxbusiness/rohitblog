import Link from "next/link";
import { getPaginatedPosts } from "@/lib/posts";
import PostListItem from "@/components/PostListItem";

export default async function Home() {
  const { data: latestPosts } = await getPaginatedPosts(1, 6);

  return (
    <div className="max-w-[1200px] mx-auto px-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight font-header my-12 text-text-primary capitalize">
        LearnCode With RK
      </h1>
      
      <p className="text-base lg:text-[17px] leading-relaxed max-w-[800px] mb-16 text-text-secondary font-body">
        20,000 expert guides for Students, Freelancers, and Founders building products faster with AI.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        <Link href="/for/student" className="p-8 border border-border-subtle text-center transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-gold">
          <h2 className="text-xl md:text-2xl font-semibold font-ui uppercase tracking-wider text-text-primary">STUDENT</h2>
          <p className="text-sm text-gray-500 mt-2 font-ui">No more blank editor anxiety.</p>
        </Link>
        <Link href="/for/freelancer" className="p-8 border border-border-subtle text-center transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-gold">
          <h2 className="text-xl md:text-2xl font-semibold font-ui uppercase tracking-wider text-text-primary">FREELANCER</h2>
          <p className="text-sm text-gray-500 mt-2 font-ui">Deliver 10x faster projects.</p>
        </Link>
        <Link href="/for/founder" className="p-8 border border-border-subtle text-center transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-gold">
          <h2 className="text-xl md:text-2xl font-semibold font-ui uppercase tracking-wider text-text-primary">FOUNDER</h2>
          <p className="text-sm text-gray-500 mt-2 font-ui">Build MVPs without limits.</p>
        </Link>
      </div>

      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold font-ui uppercase tracking-[0.1em] mb-8 border-b border-border-subtle pb-4">Latest Additions</h2>
        <div>
          {latestPosts.map((post) => (
            <PostListItem key={post.slug} post={post} />
          ))}
        </div>
      </div>
      
      <div className="text-center py-16">
        <Link href="/blog" className="inline-block px-4 py-2 border border-border-subtle bg-bg-primary font-medium transition-colors duration-300 hover:border-gold hover:text-gold">
          View All 20,000 Posts →
        </Link>
      </div>
    </div>
  );
}
