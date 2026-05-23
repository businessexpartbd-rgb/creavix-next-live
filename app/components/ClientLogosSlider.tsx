'use client';

import Image from 'next/image';
import { useState } from 'react';
import { CLIENT_LOGOS } from '../../lib/site-data';

/**
 * Bidirectional infinite logo slider:
 *  - Row 1 scrolls Right → Left
 *  - Row 2 scrolls Left → Right
 * Each row contains the list duplicated so the marquee loop is seamless.
 * Hovering or tapping any logo pauses BOTH rows for a moment, per spec.
 *
 * Logos are rendered through next/image, so each visitor gets AVIF/WebP
 * (when supported), the exact pixel size their device needs, lazy-loaded.
 * The source files live in `public/clients/` (see README in that folder).
 */
export default function ClientLogosSlider() {
  const [paused, setPaused] = useState(false);
  const onHover = () => setPaused(true);
  const onLeave = () => setPaused(false);

  const Row = ({ direction }: { direction: 'ltr' | 'rtl' }) => (
    <div
      className={`flex w-max gap-6 ${
        direction === 'ltr' ? 'animate-marquee-reverse' : 'animate-marquee'
      } ${paused ? '[animation-play-state:paused]' : ''}`}
      style={{ willChange: 'transform' }}
    >
      {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
        <div
          key={`${direction}-${i}-${logo.name}`}
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          onTouchStart={onHover}
          onTouchEnd={onLeave}
          className="grid h-24 w-44 flex-none place-items-center rounded-card border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm transition hover:border-brand/40 hover:bg-white/[0.08]"
          title={logo.name}
        >
          <div className="relative h-full w-full">
            <Image
              src={logo.src}
              alt={logo.name}
              fill
              sizes="(max-width: 640px) 25vw, 176px"
              className="object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="container-x py-16 sm:py-20">
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
