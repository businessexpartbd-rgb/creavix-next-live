'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { ytThumb } from '../../lib/site-data';
import Reveal from './Reveal';

interface CinematicGalleryProps {
  videos: Array<{ id: string; title: string }>;
}

export default function CinematicGallery({ videos }: CinematicGalleryProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCardClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="container-x py-24 sm:py-28">
      <Reveal>
        <div className="mb-16">
          <span className="eyebrow">Showcase</span>
          <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight tracking-tight text-warm-fg sm:text-5xl">
            Cinematic stories before the
            <span className="font-display text-warm-accent"> short-form grid</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-warm-muted">
            Featured cinematic pieces that define our storytelling approach. Scroll to explore.
          </p>
        </div>
      </Reveal>

      {/* Gallery Container */}
      <div ref={containerRef} className="relative">
        {/* Desktop: Stacked fold layout */}
        <div className="hidden md:flex flex-col gap-0">
          {videos.map((video, i) => {
            const isExpanded = expandedIndex === i;
            const isAboveExpanded = expandedIndex !== null && i < expandedIndex;
            const isBelowExpanded = expandedIndex !== null && i > expandedIndex;

            return (
              <Reveal key={video.id} delay={i * 60}>
                <button
                  onClick={() => handleCardClick(i)}
                  className={`group relative overflow-hidden rounded-none transition-all duration-500 ease-out cursor-pointer border-b border-warm-fg/10 last:border-b-0 shadow-md hover:shadow-lg
                    ${
                      isExpanded
                        ? 'h-96 sm:h-[500px] shadow-warm-glow'
                        : isBelowExpanded
                          ? 'h-0 opacity-0'
                          : isAboveExpanded
                            ? 'h-0 opacity-0'
                            : 'h-20 sm:h-24 hover:shadow-warm-glow/50'
                    }
                  `}
                >
                  {/* Thumbnail */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={ytThumb(video.id, 'hqdefault')}
                      alt={video.title}
                      fill
                      sizes="100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    {/* Overlay gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t transition duration-300 ${
                        isExpanded
                          ? 'from-warm-fg/85 via-warm-fg/40 to-warm-fg/10'
                          : 'from-warm-fg/70 via-warm-fg/20 to-transparent'
                      }`}
                    />

                    {/* Play button - centered on expanded, bottom-left on collapsed */}
                    {!isExpanded && (
                      <div className="absolute inset-0 flex items-center justify-start pl-4 sm:pl-6">
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-warm-accent/80 text-warm-fg shadow-lg transition duration-300 group-hover:scale-110 group-hover:bg-warm-accent">
                          <Play size={14} fill="currentColor" />
                        </span>
                      </div>
                    )}

                    {!isExpanded && (
                      <div className="absolute inset-0 flex items-center">
                        <div className="px-6">
                          <p className="text-sm font-medium text-warm-fg line-clamp-1">{video.title}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Expanded view - centered play button */}
                  {isExpanded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <a
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="z-10"
                      >
                        <span className="grid h-16 w-16 place-items-center rounded-full bg-warm-accent text-warm-fg shadow-2xl transition duration-300 hover:scale-110 hover:shadow-warm-glow">
                          <Play size={24} fill="currentColor" />
                        </span>
                      </a>
                    </div>
                  )}

                  {/* Bottom info on expanded */}
                  {isExpanded && (
                    <div className="absolute inset-x-0 bottom-0 p-8">
                      <p className="text-lg font-medium text-warm-fg">{video.title}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wide bg-warm-accent text-warm-fg rounded-full">
                          Watch on YouTube
                        </span>
                      </div>
                    </div>
                  )}
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* Mobile: Grid layout */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {videos.map((video, i) => (
            <Reveal key={video.id} delay={i * 40}>
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noreferrer"
                className="group relative block overflow-hidden rounded-card border border-warm-fg/10 transition hover:border-warm-accent/50"
              >
                <div className="aspect-video relative">
                  <Image
                    src={ytThumb(video.id, 'hqdefault')}
                    alt={video.title}
                    fill
                    sizes="100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-warm-fg/60 via-transparent to-transparent opacity-80 transition group-hover:opacity-100" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-warm-accent text-warm-fg shadow-lg transition duration-300 group-hover:scale-110">
                      <Play size={18} fill="currentColor" />
                    </span>
                  </div>

                  {/* Title overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="line-clamp-2 text-xs font-medium text-warm-fg drop-shadow">{video.title}</p>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Info text */}
      <Reveal delay={200}>
        <p className="mt-12 text-center text-xs uppercase tracking-[0.18em] text-warm-muted">
          Click cards to expand • Click play to watch on YouTube
        </p>
      </Reveal>
    </section>
  );
}
