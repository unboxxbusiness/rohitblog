import { getPostsByPersona, getPersonas } from "@/lib/posts";
import type { Metadata } from "next";
import PostListItem from "@/components/PostListItem";
import Pagination from "@/components/Pagination";
import Link from "next/link";

export async function generateStaticParams() {
  const personas = await getPersonas();
  const paths = [];
  
  for (const persona of personas) {
    const { totalPages } = await getPostsByPersona(persona, 1, 24);
    for (let i = 1; i <= Math.min(totalPages, 5); i++) {
      paths.push({ 
        persona: persona.toLowerCase(),
        page: i.toString() 
      });
    }
  }
  return paths;
}

export async function generateMetadata(
  { params }: { params: Promise<{ persona: string; page: string }> }
): Promise<Metadata> {
  const { persona, page: pageStr } = await params;
  const page = parseInt(pageStr, 10);
  const capitalizedPersona = persona.charAt(0).toUpperCase() + persona.slice(1);
  const canonicalUrl = page === 1 ? `/for/${persona.toLowerCase()}` : `/for/${persona.toLowerCase()}/p/${page}`;

  return {
    title: `For ${capitalizedPersona}s | Page ${page} | AI Tutorials`,
    description: `Browse page ${page} of AI-generated tutorials curated for ${persona}s.`,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function PersonaPaginationPage({
  params,
}: {
  params: Promise<{ persona: string; page: string }>;
}) {
  const { persona, page: pageStr } = await params;
  const page = parseInt(pageStr, 10);
  const limit = 24;

  const { data: posts, totalPages } = await getPostsByPersona(persona, page, limit);

  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-8 py-16 md:py-24">
      <div className="mb-8 text-sm font-mono text-text-secondary">
        <Link href="/" className="hover:text-gold transition-colors duration-300">Home</Link>
        {" > "}
        <Link href={`/for/${persona}`} className="capitalize hover:text-gold transition-colors duration-300">{persona}s</Link>
        {" > "}
        <span>Page {page}</span>
      </div>
      <div className="py-8 md:py-16 border-b border-border-subtle mb-16">
        <h1 className="text-[clamp(2.5rem,10vw,8rem)] font-black leading-[0.85] tracking-[-0.04em] uppercase text-text-primary font-header break-words text-balance">
          FOR <span className="text-hot-pink">{persona}S</span> — PAGE {page}
        </h1>
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
