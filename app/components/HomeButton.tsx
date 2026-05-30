'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function HomeButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      // Show button after scrolling past hero (200vh = approx hero height)
      const heroHeight = window.innerHeight;
      setIsVisible(window.scrollY > heroHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Link
      href="/"
      title="Go to homepage"
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full text-white transition-all duration-300 ${
        isVisible
          ? 'scale-100 opacity-100 shadow-[0_4px_24px_rgba(232,23,58,0.45)]'
          : 'pointer-events-none scale-75 opacity-0'
      }`}
      style={{
        backgroundImage: 'linear-gradient(135deg, #ff4b6e 0%, #e8173a 100%)',
      }}
    >
      <Home size={20} strokeWidth={2} />
    </Link>
  );
}
