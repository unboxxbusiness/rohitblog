import Link from "next/link";
import { getPaginatedPosts } from "@/lib/posts";
import PostListItem from "@/components/PostListItem";

export default async function Home() {
  const { data: latestPosts } = await getPaginatedPosts(1, 6);

  return (
    <div className="container">
      <h1 className="hero-title">
        LEARNCODE<br/>WITH RK
      </h1>
      
      <p style={{ fontSize: '1.5rem', maxWidth: '600px', marginBottom: '4rem', color: 'var(--text-secondary)' }}>
        20,000 expert guides for Students, Freelancers, and Founders building products faster with AI.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '6rem' }}>
        <Link href="/for/student" style={{ padding: '2rem', border: '1px solid var(--border-subtle)', textAlign: 'center', transition: 'border-color var(--duration)' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase' }}>STUDENT</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>No more blank editor anxiety.</p>
        </Link>
        <Link href="/for/freelancer" style={{ padding: '2rem', border: '1px solid var(--border-subtle)', textAlign: 'center', transition: 'border-color var(--duration)' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase' }}>FREELANCER</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Deliver 10x faster projects.</p>
        </Link>
        <Link href="/for/founder" style={{ padding: '2rem', border: '1px solid var(--border-subtle)', textAlign: 'center', transition: 'border-color var(--duration)' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase' }}>FOUNDER</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Build MVPs without limits.</p>
        </Link>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2rem' }}>Latest Additions</h2>
        <div>
          {latestPosts.map((post) => (
            <PostListItem key={post.slug} post={post} />
          ))}
        </div>
      </div>
      
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <Link href="/blog" className="page-btn">
          View All 20,000 Posts →
        </Link>
      </div>
    </div>
  );
}
