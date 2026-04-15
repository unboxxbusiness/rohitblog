import Link from "next/link";
import { getPostsByPersona, getPersonas } from "@/lib/posts";
import PostListItem from "@/components/PostListItem";
import Pagination from "@/components/Pagination";

export async function generateStaticParams() {
  const personas = await getPersonas();
  return personas.map((persona) => ({
    persona: persona.toLowerCase(),
  }));
}

export default async function PersonaHubPage({
  params,
  searchParams,
}: {
  params: Promise<{ persona: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { persona } = await params;
  const { page: pageStr } = await searchParams;
  const page = pageStr ? parseInt(pageStr, 10) : 1;
  const limit = 24;

  const { data: posts, totalPages } = await getPostsByPersona(persona, page, limit);

  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-8 py-16 md:py-24">
      <div className="mb-8 text-sm font-mono text-text-secondary">
        <Link href="/" className="hover:text-gold transition-colors duration-300">Home</Link>
        {" > "}
        <span className="capitalize">{persona}s</span>
      </div>
      <div className="py-8 md:py-16 border-b border-border-subtle mb-16">
        <h1 className="text-[clamp(2.5rem,10vw,8rem)] font-black leading-[0.85] tracking-[-0.04em] uppercase text-text-primary font-header break-words text-balance">
          FOR <span className="text-hot-pink">{persona}S</span>
        </h1>
        <p className="text-lg md:text-2xl leading-relaxed max-w-[800px] text-text-secondary font-ui font-medium mt-8">
          AI tutorials and resources curated for {persona}s.
        </p>
      </div>

      <div>
        {posts.map((post) => (
          <PostListItem key={post.slug} post={post} />
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} basePath={`/for/${persona}`} />
    </div>
  );
}
