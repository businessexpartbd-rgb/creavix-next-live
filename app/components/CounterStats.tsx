'use client';

import { useRef, useEffect, useState } from 'react';
import { STATS } from '../../lib/site-data';

export default function CounterStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Initialize counts to 0
    const initialCounts: { [key: string]: number } = {};
    STATS.forEach((s) => {
      initialCounts[s.label_en] = 0;
    });
    setCounts(initialCounts);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            // Animate each counter
            STATS.forEach((s) => {
              const targetValue = parseInt(s.value.replace(/\D/g, '')) || 0;
              const duration = 1500; // 1.5 seconds
              const steps = 60;
              const increment = targetValue / steps;
              let current = 0;

              const counter = setInterval(() => {
                current += increment;
                if (current >= targetValue) {
                  setCounts((prev) => ({ ...prev, [s.label_en]: targetValue }));
                  clearInterval(counter);
                } else {
                  setCounts((prev) => ({ ...prev, [s.label_en]: Math.floor(current) }));
                }
              }, duration / steps);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <div
      ref={containerRef}
      className="mt-20 grid gap-px rounded-card border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-4"
    >
      {STATS.map((s) => {
        const suffix = s.value.replace(/\d/g, '').trim();
        const displayValue = counts[s.label_en] ? `${counts[s.label_en]}${suffix}` : s.value;

        return (
          <div
            key={s.label_en}
            className="bg-ink-900/60 p-6 first:rounded-t-card last:rounded-b-card sm:first:rounded-l-card sm:first:rounded-tr-none sm:last:rounded-r-card sm:last:rounded-bl-none"
          >
            <p className="font-display text-4xl tracking-wide text-white sm:text-5xl">
              <span className="accent">{displayValue}</span>
            </p>
            <p className="mt-2 text-sm font-medium text-ash-200">{s.label_en}</p>
            <p className="mt-1 font-bn text-xs text-ash-400">{s.sub_bn}</p>
          </div>
        );
      })}
    </div>
  );
}
