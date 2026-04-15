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
    <div className="max-w-[1200px] mx-auto px-8 py-24">
      <div className="mb-8 text-sm font-mono text-text-secondary">
        <Link href="/" className="hover:text-gold transition-colors duration-300">Home</Link>
        {" > "}
        <span className="capitalize">{persona}s</span>
      </div>
      <h1 className="text-[clamp(3rem,12vw,10rem)] font-black leading-[0.85] tracking-[-0.04em] uppercase break-words my-12 capitalize">
        {persona}
      </h1>
      <p className="text-[1.5rem] mb-16 text-text-secondary">
        AI tutorials and resources curated for {persona}s.
      </p>

      <div>
        {posts.map((post) => (
          <PostListItem key={post.slug} post={post} />
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} basePath={`/for/${persona}`} />
    </div>
  );
}
