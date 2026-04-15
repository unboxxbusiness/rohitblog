import authorData from '@/data/author.json';
import Link from 'next/link';

export default function AuthorBox() {
  return (
    <div className="mt-16 p-10 bg-bg-surface border-t-4 border-gold flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-text-muted flex items-center justify-center text-white font-black text-2xl flex-shrink-0">
          RK
        </div>
        <div>
          <h3 className="text-2xl m-0 text-text-primary font-bold">{authorData.name}</h3>
          <div className="text-gold font-medium text-sm mt-1">{authorData.role}</div>
        </div>
      </div>
      
      <p className="text-text-secondary leading-relaxed m-0">
        {authorData.bio}
      </p>
      
      <div>
        <Link href="/about" className="inline-block mt-4 text-sm font-bold uppercase tracking-[0.05em] text-text-primary border-b border-gold pb-1 transition-colors hover:text-gold">
          Read Full Profile →
        </Link>
      </div>
    </div>
  );
}
