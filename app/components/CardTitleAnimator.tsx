'use client';

import { useEffect, useRef } from 'react';

/**
 * Apply staggered fade-up animation to all card titles (h3 within .card-3d)
 * Triggered by IntersectionObserver when card enters viewport
 */
export default function CardTitleAnimator() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

    // Find all card titles (h3 inside .card-3d)
    const cardTitles = document.querySelectorAll('.card-3d h3');

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const title = entry.target as HTMLElement;
            title.classList.add('card-title');
            
            // Staggered animation delay
            const delay = index * 100;
            setTimeout(() => {
              title.classList.add('animate-in');
            }, delay);

            // Unobserve after animation triggers
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -50px 0px' },
    );

    // Observe all card titles
    cardTitles.forEach((title) => {
      observerRef.current?.observe(title);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return null;
}
