'use client';

import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  /** Re-trigger counter when scrolled into view */
  repeat?: boolean;
}

/**
 * Animated counter that increments from 0 to target value.
 * Uses requestAnimationFrame for smooth, performant animation.
 * Optional repeat mode re-triggers on every scroll into view.
 */
export default function Counter({
  value,
  duration = 2000,
  suffix = '',
  prefix = '',
  className = '',
  repeat = false,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const animationRef = useRef<number | null>(null);

  // Intersection observer for scroll-based trigger
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
          } else if (repeat) {
            setIsInView(false);
            setCount(0);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    const el = ref.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [repeat]);

  // Animation logic with requestAnimationFrame
  useEffect(() => {
    if (!isInView || count === value) return;

    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function: easeOutQuad for smooth deceleration
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      const currentCount = Math.floor(easeProgress * value);

      setCount(currentCount);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={`counter-animate ${className}`.trim()}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
