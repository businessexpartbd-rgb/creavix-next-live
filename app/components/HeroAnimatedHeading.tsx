'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

interface HeroAnimatedHeadingProps {
  lines: readonly ReactNode[];
  className?: string;
}

/**
 * Replayable hero headline driven by one observer and CSS-only motion.
 * Keeping the line reveal out of a frame-by-frame JavaScript loop makes the
 * animation smooth without adding a library or extra runtime work on mobile.
 */
export default function HeroAnimatedHeading({
  lines,
  className = '',
}: HeroAnimatedHeadingProps) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      {
        threshold: 0.2,
        rootMargin: '-4% 0px -8% 0px',
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <h1
      ref={ref}
      className={`hero-headline ${isActive ? 'is-active' : ''} ${className}`.trim()}
    >
      {lines.map((line, index) => (
        <span className="hero-headline-line" key={index}>
          {line}
        </span>
      ))}
    </h1>
  );
}
