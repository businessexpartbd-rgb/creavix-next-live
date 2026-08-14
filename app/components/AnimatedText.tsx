'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

interface AnimatedTextProps {
  children: ReactNode;
  delay?: number;
  /** Replays the animation whenever the text re-enters the viewport. */
  repeat?: boolean;
  className?: string;
}

/**
 * Light animation wrapper for body text, paragraphs, and descriptions.
 * Applies subtle fade-up animation (0.6s) for clean, professional look.
 * 
 * Features:
 * - Subtle fade-up (no blur)
 * - Viewport-triggered
 * - Respects prefers-reduced-motion
 */
export default function AnimatedText({
  children,
  delay = 0,
  repeat = false,
  className = '',
}: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement | null>(null);
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
            if (!repeat) observer.unobserve(entry.target);
          } else if (repeat) {
            setIsAnimating(false);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px',
      },
    );

    const el = ref.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [repeat]);

  const animationStyle: React.CSSProperties = isAnimating
    ? {
        animation: `revealTextLight 0.6s ease-out forwards`,
        animationDelay: `${delay}ms`,
      }
    : {};

  return (
    <p
      ref={ref}
      className={`${className}`.trim()}
      style={animationStyle}
    >
      {children}
    </p>
  );
}
