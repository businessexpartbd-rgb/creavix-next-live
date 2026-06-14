'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

interface ScrollRevealSectionProps {
  children: ReactNode;
  className?: string;
  staggerChildren?: boolean;
  staggerDelay?: number; // delay between each child (ms)
}

/**
 * Scroll-reveal section with optional stagger animation for child elements.
 * Uses IntersectionObserver for performance. Children must have data-stagger-index.
 */
export default function ScrollRevealSection({
  children,
  className = '',
  staggerChildren = false,
  staggerDelay = 100,
}: ScrollRevealSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Apply stagger delays to child elements on reveal
  useEffect(() => {
    if (!isVisible || !staggerChildren) return;

    const children = ref.current?.querySelectorAll('[data-stagger-index]');
    if (!children) return;

    children.forEach((child, index) => {
      const element = child as HTMLElement;
      element.style.setProperty(
        '--reveal-delay',
        `${index * staggerDelay}ms`
      );
      element.classList.add('reveal-stagger');
      element.classList.add('in-view');
    });
  }, [isVisible, staggerChildren, staggerDelay]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal-section ${className}`.trim()}
      data-testid="scroll-reveal-section"
    >
      {children}
    </div>
  );
}
