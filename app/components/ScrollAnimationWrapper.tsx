'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  animation?: 'fade-up' | 'scale' | 'slide-in';
  delay?: number;
  className?: string;
}

/**
 * Scroll-triggered animation wrapper.
 * Re-triggers animation every time element enters viewport.
 * Lightweight IntersectionObserver-based (no Framer Motion).
 */
export default function ScrollAnimationWrapper({
  children,
  animation = 'fade-up',
  delay = 0,
  className = '',
}: ScrollAnimationWrapperProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  const animationClass =
    animation === 'scale'
      ? 'scroll-scale'
      : animation === 'slide-in'
        ? 'scroll-slide-in'
        : 'scroll-animate';

  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            // Reset animation on scroll out for re-trigger on scroll back in
            setIsInView(false);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      },
    );

    const el = ref.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${animationClass} ${isInView ? 'in-view' : ''} ${className}`.trim()}
      style={{
        animationDelay: isInView ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  );
}
