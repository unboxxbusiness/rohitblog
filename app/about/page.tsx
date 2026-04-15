import authorData from '@/data/author.json';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-24">
      <div className="mb-8 text-sm font-mono text-text-secondary">
        <Link href="/" className="hover:text-gold transition-colors duration-300">Home</Link>
        {" > "}
        <span>About Founder</span>
      </div>

      <div className="text-center mb-16">
        <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-black leading-[0.85] tracking-[-0.04em] uppercase mb-4">
          {authorData.name}
        </h1>
        <p className="font-serif italic text-[1.5rem] text-gold m-0">{authorData.role}</p>
        <p className="text-text-secondary text-[0.875rem] uppercase tracking-[0.05em] mt-2 font-bold">{authorData.profession}</p>
      </div>

      <div className="article-content">
        <blockquote className="text-[1.5rem] leading-[1.6] font-medium border-l-[4px] border-gold pl-[1.5rem] my-[3rem] italic">
          "{authorData.motto}"
        </blockquote>

        <h2 className="text-[2rem] font-bold mb-[1.5rem]">Background</h2>
        <p>{authorData.background}</p>

        <div className="p-8 bg-bg-surface border-l-4 border-gold my-8">
          <h2 className="text-2xl text-gold mb-2 font-bold">Core Mission</h2>
          <p className="italic m-0">{authorData.mission}</p>
        </div>

        <h2 className="text-[2rem] font-bold mb-[1.5rem] mt-[3rem]">Skills & Expertise</h2>
        <ul className="flex flex-col gap-2 mb-8">
          {authorData.skills.map((skill, index) => (
            <li key={index} className="flex items-start gap-4">
              <span className="text-gold font-bold">✓</span>
              {skill}
            </li>
          ))}
        </ul>

        <h2 className="text-[2rem] font-bold mb-[1.5rem] mt-[3rem]">Teaching Style</h2>
        <p>{authorData.teaching_style}</p>

        <div className="mt-16 p-12 bg-gold text-black text-center">
          <div className="text-2xl font-black uppercase mb-6">{authorData.tagline}</div>
          <p className="font-medium mb-8 text-xl">{authorData.cta}</p>
          <Link 
            href="/blog" 
            className="inline-block px-8 py-4 bg-black text-white font-black text-base uppercase no-underline hover:bg-bg-surface transition-colors cursor-pointer"
          >
            Start Building Now →
          </Link>
        </div>
      </div>
    </div>
  );
}
