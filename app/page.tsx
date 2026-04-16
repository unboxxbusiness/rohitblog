import Link from "next/link";
import { getManifest } from "@/lib/posts";
import PostListItem from "@/components/PostListItem";

export default async function Home() {
  const manifest = await getManifest();
  
  // Group posts by persona to ensure variety
  const students = manifest.filter(p => p.persona.toLowerCase() === 'student');
  const freelancers = manifest.filter(p => p.persona.toLowerCase() === 'freelancer');
  const founders = manifest.filter(p => p.persona.toLowerCase() === 'founder');

  const latestPosts = [];
  const seenBaseTopics = new Set<string>();
  const seenCategories = new Set<string>();

  // Extract the base topic from the slug (everything before the skill level)
  const getBaseTopic = (slug: string) => slug.split(/-(beginner|intermediate|advanced)-/)[0];

  const pickDiversePosts = (pool: any[], count: number) => {
    let picked = 0;
    // Iterate backwards to get the "latest" entries in the array
    for (let i = pool.length - 1; i >= 0; i--) {
      const post = pool[i];
      const base = getBaseTopic(post.slug);
      
      if (!seenBaseTopics.has(base) && !seenCategories.has(post.content_category)) {
        seenBaseTopics.add(base);
        seenCategories.add(post.content_category);
        latestPosts.push(post);
        picked++;
        if (picked === count) break;
      }
    }
  };

  // Pick 2 articles from each persona
  pickDiversePosts(students, 2);
  pickDiversePosts(freelancers, 2);
  pickDiversePosts(founders, 2);


  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
      <div className="py-20 md:py-32 flex flex-col justify-center border-b border-border-subtle mb-20">
        <h1 className="text-[clamp(2.5rem,10vw,8rem)] font-black leading-[0.85] tracking-[-0.04em] uppercase text-text-primary font-header mb-8 break-words text-balance">
          POWERING THE <br className="hidden md:block" /> INTERNET'S BEST <br />
          <span className="text-hot-pink">DEVELOPERS</span>
        </h1>
        
        <p className="text-lg md:text-2xl leading-relaxed max-w-[800px] text-text-secondary font-ui font-medium">
          The all-in-one platform that brings together AI guides, project templates, and every tool you need to build and earn.
        </p>
      </div>

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
