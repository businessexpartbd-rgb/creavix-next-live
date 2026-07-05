'use client';

import { useEffect, useRef, useState } from 'react';
import { Film, Zap, TrendingUp, Users } from 'lucide-react';
import Reveal from './Reveal';
import ScrollZoom from './ScrollZoom';

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
}

export default function VideoMarketingShowcase() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats: StatItem[] = [
    {
      icon: <Film className="w-8 h-8" />,
      value: '4,300+',
      label: 'Videos Created',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      value: '24-48h',
      label: 'Fast Delivery',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: '340%',
      label: 'Avg ROI Boost',
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: '500+',
      label: 'Active Clients',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="border-y border-on-dark/10 bg-gradient-to-r from-accent-primary/5 via-warm-bg to-accent-primary/5 py-20 sm:py-28">
      <div className="container-x">
        <Reveal>
          <ScrollZoom className="mb-16 text-center">
            <h2 className="font-serif text-balance text-3xl font-normal leading-tight tracking-tight text-on-dark sm:text-4xl lg:text-5xl">
              Why top brands choose <span className="font-display text-accent-primary">Creavix</span> for video marketing
            </h2>
          </ScrollZoom>
        </Reveal>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <Reveal key={stat.label} delay={idx * 60}>
              <div className={`group relative overflow-hidden rounded-card border border-on-dark/10 bg-cream/60 backdrop-blur p-6 sm:p-8 transition-all duration-300 hover:border-accent-primary/40 hover:shadow-gold-glow cursor-pointer
                ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }
              `}
              style={{
                transitionDelay: isVisible ? `${idx * 100}ms` : '0ms',
              }}>
                {/* Animated background gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-accent-primary/10 to-transparent transition duration-300" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-accent-primary/20 to-accent-primary/5 text-accent-primary transition duration-300 group-hover:scale-110 group-hover:from-accent-primary/30 group-hover:to-accent-primary/10">
                    {stat.icon}
                  </div>

                  {/* Value - animated counter effect */}
                  <div className="mb-2 font-display text-3xl font-bold tracking-wide text-on-dark sm:text-4xl">
                    {stat.value}
                  </div>

                  {/* Label */}
                  <p className="text-sm font-medium text-muted transition duration-300 group-hover:text-on-dark">
                    {stat.label}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400}>
          <div className="mt-12 text-center">
            <p className="mx-auto max-w-xl text-sm leading-7 text-muted sm:text-base">
              Proven strategies for Meta, YouTube & TikTok. Real results from real agencies. No templates, no compromises.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
