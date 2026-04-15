import authorData from '@/data/author.json';
import Link from 'next/link';

export default function AuthorBox() {
  return (
    <div style={{
      marginTop: '4rem',
      padding: '2.5rem',
      background: 'var(--bg-surface)',
      borderTop: '4px solid var(--gold)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          background: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 900,
          fontSize: '1.5rem'
        }}>
          RK
        </div>
        <div>
          <h3 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--text-primary)' }}>{authorData.name}</h3>
          <div style={{ color: 'var(--gold)', fontWeight: 500, fontSize: '0.875rem' }}>{authorData.role}</div>
        </div>
      </div>
      
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
        {authorData.bio}
      </p>
      
      <div>
        <Link href="/about" style={{
          display: 'inline-block',
          marginTop: '1rem',
          fontSize: '0.875rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'var(--text-primary)',
          borderBottom: '1px solid var(--gold)',
          paddingBottom: '0.25rem'
        }}>
          Read Full Profile →
        </Link>
      </div>
    </div>
  );
}
