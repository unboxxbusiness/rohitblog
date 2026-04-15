'use client';

export default function SocialShare({ url, title }: { url: string, title: string }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
      <span style={{ fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
        Share Article:
      </span>
      
      <a 
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ padding: '0.5rem 1rem', border: '1px solid var(--border-subtle)', borderRadius: '4px', fontSize: '0.875rem', textDecoration: 'none', color: 'var(--text-primary)' }}
      >
        Twitter
      </a>

      <a 
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ padding: '0.5rem 1rem', border: '1px solid var(--border-subtle)', borderRadius: '4px', fontSize: '0.875rem', textDecoration: 'none', color: 'var(--text-primary)' }}
      >
        LinkedIn
      </a>

      <a 
        href={`https://api.whatsapp.com/send?text=${encodedTitle} %0A%0A ${encodedUrl}`} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ padding: '0.5rem 1rem', border: '1px solid var(--border-subtle)', borderRadius: '4px', fontSize: '0.875rem', textDecoration: 'none', color: 'var(--text-primary)' }}
      >
        WhatsApp
      </a>
    </div>
  );
}
