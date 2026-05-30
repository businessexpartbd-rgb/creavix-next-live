'use client';

import { useEffect, RefObject } from 'react';

/**
 * Reusable hook for fade-up reveal animations on scroll
 * Adds 'revealed' class when element enters viewport (threshold 0.15)
 * CSS handles the actual animation (translateY + opacity)
 */
export function useRevealOnScroll(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}
