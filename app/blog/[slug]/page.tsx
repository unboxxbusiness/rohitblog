import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import DropCap from "@/components/DropCap";
import StepGuide from "@/components/StepGuide";
import ProTips from "@/components/ProTips";
import SchemaOrg from "@/components/SchemaOrg";
import AuthorBox from "@/components/AuthorBox";
import SocialShare from "@/components/SocialShare";
import Link from "next/link";

export const revalidate = 86400; // ISR cache for 24 hours

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  // Pre-render the top 500 pages at build time. The rest will be built on-demand.
  return slugs.slice(0, 500).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.meta_title,
    description: post.meta_description,
    alternates: {
      canonical: post.canonical_url,
    },
    openGraph: {
      title: post.meta_title,
      description: post.meta_description,
      url: post.canonical_url,
      siteName: 'LearnCode With RK',
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta_title,
      description: post.meta_description,
    }
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Preprocess the intro to capture the first letter for drop cap.
  const introText = post.content.intro || "";
  const firstLetter = introText.charAt(0);
  const remainingIntro = introText.slice(1);

  return (
    <>
      <div className="editorial-wrapper">
        <div className="container-narrow">
          
          <div style={{ marginBottom: "2rem", fontSize: "0.875rem", fontFamily: "var(--font-mono)", color: "var(--gold)" }}>
            <Link href="/">Home</Link> &gt; <Link href={`/for/${post.persona.toLowerCase()}`}>{post.persona}</Link> &gt; <span>{post.content_category}</span>
          </div>

          <div className="article-kicker">{post.content_category} — For {post.persona}s</div>
          <h1 className="article-title">{post.meta_title}</h1>
          
          <div className="article-meta-row">
            <span className="badge badge-gold">{post.skill_level}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: "var(--text-secondary)" }}>
              <div style={{ width: 32, height: 32, borderRadius: 16, background: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.75rem', fontWeight: 700 }}>RK</div>
              <span>Rohit Sharma</span>
            </div>
          </div>

          <div className="article-content">
            <DropCap dropText={firstLetter}>{remainingIntro}</DropCap>

            {post.content.answer_block && (
              <div className="answer-block">
                {post.content.answer_block}
              </div>
            )}

            <StepGuide steps={post.content.steps} />
            <ProTips tips={post.content.pro_tips} />

            {/* Next Steps & Conversion */}
            {post.content.next_steps && (
              <div style={{ marginTop: '3rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Next Steps</h2>
                <p>{post.content.next_steps}</p>
              </div>
            )}

            {post.content.conversion_block && (
              <div style={{ marginTop: '4rem', padding: '3rem', background: 'var(--gold)', color: '#000', textAlign: 'center' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                  {post.content.conversion_block}
                </div>
                <a 
                  href="https://www.youtube.com/@learncodewithrk?sub_confirmation=1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ display: 'inline-block', padding: '1rem 2rem', background: '#000', color: '#fff', border: 'none', fontWeight: 900, fontSize: '1rem', textTransform: 'uppercase', cursor: 'pointer', textDecoration: 'none' }}
                >
                  Join AI Builder Community →
                </a>
              </div>
            )}

            {/* Social Share Buttons */}
            <SocialShare url={post.canonical_url} title={post.meta_title} />

            {/* Author Biography Box */}
            <AuthorBox />

            <hr style={{ margin: '4rem 0', borderColor: 'var(--gold-border)' }} />

            {/* Related Posts via Typography List */}
            {post.related_posts && post.related_posts.length > 0 && (
              <div style={{ marginTop: '4rem' }}>
                <h2 style={{ fontSize: '1.5rem', textTransform: 'uppercase', marginBottom: '2rem' }}>Keep Reading</h2>
                {post.related_posts.map((rp) => (
                  <Link key={rp.slug} href={`/blog/${rp.slug}`} style={{ display: 'block', padding: '1.5rem 0', borderTop: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{rp.category}</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{rp.title}</div>
                  </Link>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
      <SchemaOrg schema_org={post.schema_org} />
    </>
  );
}
