'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

interface HeroAnimatedHeadingProps {
  lines: readonly ReactNode[];
  className?: string;
}

/**
 * Lightweight, replayable home-hero headline animation.
 *
 * The browser performs the visual work in CSS (transform, opacity and clip-path),
 * while a single IntersectionObserver only toggles the animation when the heading
 * leaves or re-enters the viewport. This keeps the effect smooth on mobile and
 * avoids adding an animation dependency to the client bundle.
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
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
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
