'use client';

import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import Reveal from './Reveal';

const VIDEO_ID = 'sHU3gWcwm4E';
const SUBTITLE_EN = 'Why do most ads fail to convert? Here\'s what actually works.';
const SUBTITLE_BN = 'বেশিরভাগ বিজ্ঞাপন কেন ফেল করে? আসলে কী করলে কাজ হয়?';

export default function AdInsightVideo() {
  const [muted, setMuted] = useState(true);

  const src = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=${
    muted ? 1 : 0
  }&loop=1&playlist=${VIDEO_ID}&controls=1&rel=0&modestbranding=1&playsinline=1`;

  return (
    <section className="container-x py-20 sm:py-24">
      <div className="mb-10 text-center">
        <Reveal>
          <span className="eyebrow">Ad Strategy · বিজ্ঞাপন কৌশল</span>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-4 font-display text-3xl uppercase tracking-[0.04em] text-white sm:text-4xl lg:text-5xl">
            Why Most Ads <span className="accent">Fail</span> — and What Works
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mx-auto mt-3 max-w-xl font-bn text-sm leading-7 text-ash-300">
            বিজ্ঞাপন দিচ্ছেন কিন্তু ফল আসছে না? এই ভিডিওতে জানুন আসল কারণ।
          </p>
        </Reveal>
      </div>

      <Reveal delay={180}>
        <div className="mx-auto w-full max-w-[320px]">
          <div
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl"
            style={{ aspectRatio: '9 / 16' }}
          >
            <iframe
              key={muted ? 'muted' : 'unmuted'}
              src={src}
              className="absolute inset-0 h-full w-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              loading="lazy"
              title="Why Most Ads Fail"
            />
            <button
              onClick={() => setMuted((m) => !m)}
              className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-black/90"
            >
              {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              {muted ? 'Sound On' : 'Mute'}
            </button>
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-center backdrop-blur-sm">
            <p className="text-sm font-medium leading-6 text-white">{SUBTITLE_EN}</p>
            <p className="mt-1 font-bn text-sm leading-7 text-ash-300">{SUBTITLE_BN}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
