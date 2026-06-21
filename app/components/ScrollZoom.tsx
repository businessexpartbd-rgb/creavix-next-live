'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollZoomProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollZoom({
  children,
  className = '',
  delay = 0,
}: ScrollZoomProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Create intersection observer for scroll-triggered animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger animation when element enters viewport
          setTimeout(() => {
            setIsInView(true);
          }, delay);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [delay]);

  return (
    <div
      ref={elementRef}
      className={`scroll-zoom-container ${isInView ? 'in-view' : ''} ${className}`}
      style={{
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
}
