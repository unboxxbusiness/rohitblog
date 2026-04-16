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

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.slice(0, 500).map((slug) => ({ slug }));
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
    alternates: { canonical: post.canonical_url },
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
  if (!post) notFound();

  const introText = post.content.intro || "";
  const firstLetter = introText.charAt(0);
  const remainingIntro = introText.slice(1);

  return (
    <>
      <div className="bg-[linear-gradient(145deg,#1A1408_0%,#0D0A04_100%)] py-16 min-h-screen">
        <div className="max-w-[800px] mx-auto px-6">
          
          <div className="mb-8 text-sm font-mono text-gold">
            <Link href="/" className="hover:text-gold-hover transition-colors">Home</Link>
            {" > "}
            <Link href={`/for/${post.persona.toLowerCase()}`} className="hover:text-gold-hover transition-colors">{post.persona}</Link>
            {" > "}
            <span>{post.content_category}</span>
          </div>

          <div className="font-ui text-sm md:text-base font-semibold text-gold mb-2 tracking-wider uppercase">
            {post.content_category} — For {post.persona}s
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight font-header mb-6 text-text-primary">
            {post.meta_title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 mb-12 border-b border-border-subtle pb-8">
            <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 border border-border-subtle bg-bg-surface text-text-secondary font-ui rounded-sm">
              {post.skill_level}
            </span>
            <div className="flex items-center gap-3 text-sm text-gray-500 font-ui">
              <div className="w-8 h-8 rounded-full bg-text-muted flex flex-shrink-0 items-center justify-center text-white text-xs font-bold">RK</div>
              <span>Rohit Sharma</span>
            </div>
          </div>

          <div className="article-content font-body text-base lg:text-[17px] leading-relaxed text-[#dddddd]">
            <DropCap dropText={firstLetter}>{remainingIntro}</DropCap>

            {post.content.answer_block && (
              <div className="border-l-4 border-gold bg-[rgba(196,162,101,0.05)] px-8 py-6 my-12 text-lg md:text-xl italic leading-relaxed font-body text-text-primary">
                "{post.content.answer_block}"
              </div>
            )}

            <StepGuide steps={post.content.steps} />
            <ProTips tips={post.content.pro_tips} />

            {/* Next Steps & Conversion */}
            {post.content.next_steps && (
              <div className="mt-12">
                <h2 className="text-xl md:text-2xl font-semibold font-header mb-4 text-text-primary">Next Steps</h2>
                <p className="text-base lg:text-[17px] leading-relaxed font-body">{post.content.next_steps}</p>
              </div>
            )}

            {post.content.conversion_block && (
              <div className="mt-16 p-12 bg-gold text-black text-center">
                <div className="text-xl font-bold mb-6">
                  {post.content.conversion_block}
                </div>
                <a 
                  href="https://www.youtube.com/@learncodewithrk?sub_confirmation=1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-black text-white border-0 font-black text-base uppercase cursor-pointer no-underline hover:bg-bg-surface transition-colors"
                >
                  Join AI Builder Community →
                </a>
              </div>
            )}

            {/* Social Share Buttons */}
            <SocialShare url={post.canonical_url} title={post.meta_title} />

            {/* Author Biography Box */}
            <AuthorBox />

            <hr className="my-16 border-t border-gold-border" />

            {/* Related Posts via Typography List */}
            {post.related_posts && post.related_posts.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl uppercase mb-8 font-bold">Keep Reading</h2>
                {post.related_posts.map((rp) => (
                  <Link key={rp.slug} href={`/blog/${rp.slug}`} className="block py-6 border-t border-border-subtle hover:border-gold transition-colors ease-[cubic-bezier(0.4,0,0.2,1)]">
                    <div className="text-sm text-text-secondary mb-2">{rp.category}</div>
                    <div className="text-xl font-bold">{rp.title}</div>
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
