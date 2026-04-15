import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border-subtle)', padding: '4rem 0', marginTop: '6rem' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>LearnCode With RK</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            20,000 expert guides for building products faster with AI.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="https://www.youtube.com/channel/UCQ188dyxCgqYdG1wRdbJtpw/featured" target="_blank" style={{ color: 'var(--text-secondary)' }}>YouTube</Link>
            <Link href="https://facebook.com/Ronitsharma.ideas" target="_blank" style={{ color: 'var(--text-secondary)' }}>Facebook</Link>
            <Link href="https://api.whatsapp.com/send?phone=919599695872" target="_blank" style={{ color: 'var(--text-secondary)' }}>WhatsApp</Link>
            <Link href="https://github.com/LearncodeWithRk" target="_blank" style={{ color: 'var(--text-secondary)' }}>GitHub</Link>
          </div>
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem' }}>Personas</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <li><Link href="/for/student">Students</Link></li>
            <li><Link href="/for/freelancer">Freelancers</Link></li>
            <li><Link href="/for/founder">Founders</Link></li>
          </ul>
        </div>
        <div>
          <h4 style={{ marginBottom: '1rem' }}>Categories</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <li><Link href="/category/tutorial">Tutorials</Link></li>
            <li><Link href="/category/case-study">Case Studies</Link></li>
            <li><Link href="/category/idea-list">Idea Lists</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
