'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * Floating scroll-to-top button.
 * Appears after user scrolls down, positioned above WhatsApp & ChatBot buttons.
 * Smooth scroll animation to top.
 */
export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const toggleVisibility = () => {
      // Show button after scrolling down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const throttledToggle = throttle(toggleVisibility, 100);

    window.addEventListener('scroll', throttledToggle, { passive: true });
    return () => window.removeEventListener('scroll', throttledToggle);
  }, []);

  const scrollToTop = () => {
    if (typeof window === 'undefined') return;

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Throttle helper
  function throttle(fn: () => void, delay: number) {
    let lastRun = 0;
    return () => {
      const now = Date.now();
      if (now - lastRun >= delay) {
        fn();
        lastRun = now;
      }
    };
  }

  if (!isClient) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-to-top-btn fixed right-5 z-[59] grid h-12 w-12 place-items-center rounded-full text-white transition-all duration-300 sm:h-14 sm:w-14 ${
        isVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      style={{
        bottom: `calc(env(safe-area-inset-bottom, 0) + 170px)`,
        background: 'linear-gradient(135deg, #ff4b6e 0%, #e8173a 100%)',
        boxShadow: '0 4px 20px rgba(232, 23, 58, 0.35)',
      }}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <ArrowUp size={20} className="sm:h-5 sm:w-5" strokeWidth={2.5} />
    </button>
  );
}
