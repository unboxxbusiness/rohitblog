import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="logo">
          LearnCode With RK
        </Link>
        <nav className="nav-links">
          <Link href="/for/student">Student</Link>
          <Link href="/for/freelancer">Freelancer</Link>
          <Link href="/for/founder">Founder</Link>
          <Link href="/blog">All Posts</Link>
          <Link href="/about" style={{ color: 'var(--gold)' }}>About RK</Link>
        </nav>
      </div>
    </header>
  );
}
