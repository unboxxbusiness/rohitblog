import Link from 'next/link';
import type { ManifestEntry } from '@/lib/types';

export default function PostListItem({ post }: { post: ManifestEntry }) {
  return (
    <Link href={`/blog/${post.slug}`} className="list-item">
      <h3 className="list-item-title">{post.meta_title}</h3>
      <p className="list-item-desc">{post.meta_description}</p>
      <div className="list-item-meta">
        <span className="badge badge-gold">{post.persona}</span>
        <span className="badge badge-gray">{post.content_category}</span>
        <span className="badge badge-gray">{post.skill_level}</span>
      </div>
    </Link>
  );
}
