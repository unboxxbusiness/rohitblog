import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle py-16 mt-24">
      <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div>
          <h3 className="mb-4 text-text-primary font-bold">LearnCode With RK</h3>
          <p className="text-text-secondary text-sm mb-6">
            20,000 expert guides for building products faster with AI.
          </p>
          <div className="flex flex-wrap gap-4 text-text-secondary text-sm">
            <Link href="https://www.youtube.com/channel/UCQ188dyxCgqYdG1wRdbJtpw/featured" target="_blank" className="hover:text-gold transition-colors duration-300">YouTube</Link>
            <Link href="https://facebook.com/Ronitsharma.ideas" target="_blank" className="hover:text-gold transition-colors duration-300">Facebook</Link>
            <Link href="https://api.whatsapp.com/send?phone=919599695872" target="_blank" className="hover:text-gold transition-colors duration-300">WhatsApp</Link>
            <Link href="https://github.com/LearncodeWithRk" target="_blank" className="hover:text-gold transition-colors duration-300">GitHub</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-4 font-bold">Personas</h4>
          <ul className="flex flex-col gap-2 text-text-secondary text-sm">
            <li><Link href="/for/student" className="hover:text-gold transition-colors duration-300">Students</Link></li>
            <li><Link href="/for/freelancer" className="hover:text-gold transition-colors duration-300">Freelancers</Link></li>
            <li><Link href="/for/founder" className="hover:text-gold transition-colors duration-300">Founders</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-bold">Categories</h4>
          <ul className="flex flex-col gap-2 text-text-secondary text-sm">
            <li><Link href="/category/tutorial" className="hover:text-gold transition-colors duration-300">Tutorials</Link></li>
            <li><Link href="/category/case-study" className="hover:text-gold transition-colors duration-300">Case Studies</Link></li>
            <li><Link href="/category/idea-list" className="hover:text-gold transition-colors duration-300">Idea Lists</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
