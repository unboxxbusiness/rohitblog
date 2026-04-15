'use client';

export default function SocialShare({ url, title }: { url: string, title: string }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-wrap gap-4 items-center mt-8 mb-8">
      <span className="font-bold text-sm uppercase tracking-[0.05em] text-text-secondary">
        Share Article:
      </span>
      
      <a 
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="px-4 py-2 border border-border-subtle rounded text-sm no-underline text-text-primary transition-colors hover:text-gold hover:border-gold"
      >
        Twitter
      </a>

      <a 
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="px-4 py-2 border border-border-subtle rounded text-sm no-underline text-text-primary transition-colors hover:text-gold hover:border-gold"
      >
        LinkedIn
      </a>

      <a 
        href={`https://api.whatsapp.com/send?text=${encodedTitle} %0A%0A ${encodedUrl}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="px-4 py-2 border border-border-subtle rounded text-sm no-underline text-text-primary transition-colors hover:text-gold hover:border-gold"
      >
        WhatsApp
      </a>
    </div>
  );
}
