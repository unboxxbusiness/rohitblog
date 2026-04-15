import authorData from '@/data/author.json';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container-narrow" style={{ padding: '6rem 1.5rem' }}>
      <div style={{ marginBottom: "2rem", fontSize: "0.875rem", fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
        <Link href="/">Home</Link> &gt; <span>About Founder</span>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', marginBottom: '1rem' }}>{authorData.name}</h1>
        <p style={{ color: 'var(--gold)', fontSize: '1.25rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
          {authorData.role}
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.5rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          {authorData.profession}
        </p>
      </div>

      <div className="article-content">
        <p style={{ fontSize: '1.5rem', lineHeight: 1.5, color: 'var(--text-primary)', marginBottom: '3rem', fontWeight: 500 }}>
          "{authorData.motto}"
        </p>

        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Background</h2>
        <p style={{ marginBottom: '3rem' }}>{authorData.background}</p>

        <div style={{ padding: '2rem', background: 'var(--bg-surface)', borderLeft: '4px solid var(--gold)', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--gold)' }}>Core Mission</h2>
          <p style={{ margin: 0, fontStyle: 'italic' }}>{authorData.mission}</p>
        </div>

        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Skills & Expertise</h2>
        <ul style={{ marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {authorData.skills.map((skill, index) => (
            <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: 'var(--gold)' }}>✓</span>
              <span>{skill}</span>
            </li>
          ))}
        </ul>

        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Teaching Style</h2>
        <p style={{ marginBottom: '3rem' }}>{authorData.teaching_style}</p>

        <div style={{ marginTop: '4rem', padding: '3rem', background: 'var(--gold)', color: '#000', textAlign: 'center' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '1.5rem', textTransform: 'uppercase' }}>
            {authorData.tagline}
          </div>
          <p style={{ marginBottom: '2rem', fontWeight: 500 }}>{authorData.cta}</p>
          <Link href="/blog" style={{ padding: '1rem 2rem', background: '#000', color: '#fff', fontWeight: 900, fontSize: '1rem', textTransform: 'uppercase', display: 'inline-block' }}>
            Start Building Now →
          </Link>
        </div>
      </div>
    </div>
  );
}
