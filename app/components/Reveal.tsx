'use client';

import { ReactNode, useEffect, useRef, useState, ElementType } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  /** When true, re-animate every time element enters viewport */
  repeat?: boolean;
  as?: ElementType;
  className?: string;
}

/**
 * IntersectionObserver-based scroll reveal.
 * Default: animates once.
 * `repeat=true`: re-animates on every scroll back into view (used by ScrollAnimWrapper).
 */
export default function Reveal({
  children,
  delay = 0,
  repeat = false,
  as: Tag = 'div',
  className = '',
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            if (!repeat) obs.unobserve(entry.target);
          } else if (repeat) {
            setShown(false);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [repeat]);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement>}
      className={`reveal ${shown ? 'in-view' : ''} ${className}`.trim()}
      style={{ transitionDelay: shown ? `${delay}ms` : undefined }}
    >
      {children}
    </Tag>
  );
}
