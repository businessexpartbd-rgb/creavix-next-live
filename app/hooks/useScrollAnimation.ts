'use client';

import { useEffect, useRef } from 'react';

/**
 * useScrollAnimation: Triggers animations when element enters viewport
 * Lightweight implementation using Intersection Observer
 */
export function useScrollAnimation(
  className: string = 'in-view',
  options?: IntersectionObserverInit
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add(className);
        observer.unobserve(element);
      }
    }, {
      threshold: 0.1,
      ...options,
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [className, options]);

  return ref;
}
