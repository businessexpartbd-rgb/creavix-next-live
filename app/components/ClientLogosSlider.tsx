'use client';

import { useState } from 'react';
import { CLIENT_LOGOS } from '../../lib/site-data';

/**
 * Bidirectional infinite logo slider:
 *  - Row 1 scrolls Left → Right (slow)
 *  - Row 2 scrolls Right → Left (slow)
 * Each row contains the list duplicated so the marquee loop is seamless.
 * Hovering or tapping any logo pauses BOTH rows for a moment, per spec.
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
          className="grid h-20 w-44 flex-none place-items-center rounded-card border border-white/10 bg-white/[0.04] backdrop-blur-sm transition hover:border-brand/40 hover:bg-white/[0.08]"
          title={logo.name}
        >
          <span
            className="font-display text-2xl tracking-[0.14em]"
            style={{
              background: `linear-gradient(135deg, ${logo.accent} 0%, #fff 100%)`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {logo.initials}
          </span>
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
