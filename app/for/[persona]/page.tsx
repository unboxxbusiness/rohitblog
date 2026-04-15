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
    <div className="container" style={{ padding: '6rem 2rem' }}>
      <div style={{ marginBottom: "2rem", fontSize: "0.875rem", fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
        <Link href="/">Home</Link> &gt; <span>For {persona}s</span>
      </div>

      <h1 className="hero-title">{persona}</h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '4rem' }}>
        AI tutorials and resources curated for {persona}s.
      </p>

      <div className="post-list">
        {posts.map((post) => (
          <PostListItem key={post.slug} post={post} />
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} basePath={`/for/${persona}`} />
    </div>
  );
}
