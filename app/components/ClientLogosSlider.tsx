'use client';
import Image from 'next/image';
import { useState, useCallback, useEffect, useRef } from 'react';
import { CLIENT_LOGOS } from '../../lib/site-data';

/**
 * Bidirectional infinite logo slider:
 *  - Row 1 scrolls Right → Left
 *  - Row 2 scrolls Left → Right
 *
 * Speed/Battery optimizations:
 *  - Animation paused when slider is off-screen (IntersectionObserver)
 *  - Animation paused on hover/touch (existing behavior)
 *  - Logos use next/image with sizes hint → AVIF/WebP per device
 *  - First-row logos lazy beyond the first viewport-width worth
 */
export default function ClientLogosSlider() {
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const onHover = useCallback(() => setPaused(true), []);
  const onLeave = useCallback(() => setPaused(false), []);

  // ✅ Pause animation while section is off-screen → no CPU/GPU when not visible
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setInView(e.isIntersecting);
      },
      { threshold: 0, rootMargin: '100px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const playState = !inView || paused ? 'paused' : 'running';

  const Row = ({ direction }: { direction: 'ltr' | 'rtl' }) => (
    <div
      className={`flex w-max gap-12 ${
        direction === 'ltr' ? 'animate-marquee-reverse-slow' : 'animate-marquee-slow'
      }`}
      style={{
        // GPU-promoted layer; animation pauses when off-screen / hovered
        transform: 'translateZ(0)',
        animationPlayState: playState,
      }}
    >
      {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
        <div
          key={`${direction}-${i}-${logo.name}`}
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          onTouchStart={onHover}
          onTouchEnd={onLeave}
          className="logo-item grid h-24 w-44 flex-none place-items-center p-3"
          title={logo.name}
        >
          <div className="relative h-full w-full">
            <Image
              src={logo.src}
              alt={logo.name}
              fill
              sizes="(max-width: 640px) 25vw, 176px"
              className="logo-image object-contain transition-all duration-300"
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section ref={sectionRef} className="container-x py-16 sm:py-20 cv-auto">
      <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-ash-400">
        Trusted by brands across Bangladesh · বিশ্বস্ত ব্র্যান্ডসমূহ
      </p>
      <div className="logos-mask space-y-5">
        <Row direction="rtl" />
        <Row direction="ltr" />
      </div>
    </section>
  );
}
