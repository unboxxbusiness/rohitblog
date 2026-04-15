'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="border-b border-border-subtle py-4 sm:py-6 bg-bg-primary sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 flex justify-between items-center relative">
        <Link href="/" className="font-black tracking-[0.1em] text-[1.15rem] sm:text-xl uppercase z-50 relative">
          LearnCode With RK
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-sm font-medium tracking-[0.05em] uppercase items-center">
          <Link href="/for/student" className="hover:text-gold transition-colors duration-300">Student</Link>
          <Link href="/for/freelancer" className="hover:text-gold transition-colors duration-300">Freelancer</Link>
          <Link href="/for/founder" className="hover:text-gold transition-colors duration-300">Founder</Link>
          <Link href="/blog" className="hover:text-gold transition-colors duration-300">All Posts</Link>
          <Link href="/about" className="text-gold hover:text-gold-hover transition-colors duration-300 pr-0">About RK</Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden z-50 p-2 text-text-primary hover:text-gold focus:outline-none transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          <div className="w-6 h-5 flex flex-col justify-between relative">
            <span className={`block h-[2px] w-full bg-current transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
            <span className={`block h-[2px] w-full bg-current transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`block h-[2px] w-full bg-current transition-all duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-bg-primary/95 backdrop-blur-md z-40 flex flex-col items-center justify-center transition-all duration-300 ease-in-out md:hidden ${
            isMobileMenuOpen ? 'opacity-100 pointer-events-auto shadow-2xl' : 'opacity-0 pointer-events-none'
          }`}
        >
          <nav className="flex flex-col gap-8 text-[1.5rem] font-bold tracking-[0.05em] uppercase text-center w-full px-8">
            <Link 
              href="/for/student" 
              className="py-4 border-b border-border-subtle hover:text-gold hover:border-gold transition-colors duration-300 w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Student
            </Link>
            <Link 
              href="/for/freelancer" 
              className="py-4 border-b border-border-subtle hover:text-gold hover:border-gold transition-colors duration-300 w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Freelancer
            </Link>
            <Link 
              href="/for/founder" 
              className="py-4 border-b border-border-subtle hover:text-gold hover:border-gold transition-colors duration-300 w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Founder
            </Link>
            <Link 
              href="/blog" 
              className="py-4 border-b border-border-subtle hover:text-gold hover:border-gold transition-colors duration-300 w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              All Posts
            </Link>
            <Link 
              href="/about" 
              className="py-4 text-gold hover:text-gold-hover transition-colors duration-300 w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About RK
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
