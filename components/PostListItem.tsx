import Link from 'next/link';
import type { ManifestEntry } from '@/lib/types';

export default function PostListItem({ post }: { post: ManifestEntry }) {
  return (
    <Link 
      href={`/blog/${post.slug}`} 
      className="block border-t border-border-subtle py-6 sm:py-8 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:pl-0 sm:hover:pl-4 hover:border-t-gold"
    >
      <h3 className="text-xl sm:text-2xl font-bold mb-2 leading-snug">{post.meta_title}</h3>
      <p className="text-sm sm:text-base text-text-secondary max-w-[800px] leading-relaxed">{post.meta_description}</p>
      
      <div className="flex flex-wrap gap-2 sm:gap-4 mt-4">
        <span className="text-[0.65rem] sm:text-xs font-bold uppercase tracking-[0.05em] px-2 py-1 border border-gold-border bg-gold-faded text-gold">
          {post.persona}
        </span>
        <span className="text-[0.65rem] sm:text-xs font-bold uppercase tracking-[0.05em] px-2 py-1 border border-border-subtle bg-bg-surface text-text-secondary">
          {post.content_category}
        </span>
        <span className="text-[0.65rem] sm:text-xs font-bold uppercase tracking-[0.05em] px-2 py-1 border border-border-subtle bg-bg-surface text-text-secondary">
          {post.skill_level}
        </span>
      </div>
    </Link>
  );
}
