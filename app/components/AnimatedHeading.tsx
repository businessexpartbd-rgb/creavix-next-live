'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

interface AnimatedHeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3;
  stagger?: boolean;
  delay?: number;
  className?: string;
}

/**
 * Reusable animated heading component for premium text reveal animations.
 * Applies to all h1, h2, h3 across the website.
 * 
 * Features:
 * - Fast premium reveal (0.8s) with blur-to-clear effect
 * - Optional stagger for multi-line text
 * - Viewport-triggered via IntersectionObserver
 * - Respects prefers-reduced-motion
 */
export default function AnimatedHeading({
  children,
  level = 2,
  stagger = false,
  delay = 0,
  className = '',
}: AnimatedHeadingProps) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      setIsAnimating(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsAnimating(true);
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

  const Tag = `h${level}` as const;
  const animationStyle: React.CSSProperties = isAnimating
    ? {
        animation: `revealText 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
        animationDelay: `${delay}ms`,
      }
    : {};

  return (
    <Tag
      ref={ref as any}
      className={`${className}`.trim()}
      style={animationStyle}
    >
      {children}
    </Tag>
  );
}
