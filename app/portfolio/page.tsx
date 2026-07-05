'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Play, Clock, ArrowUpRight, MessageCircle } from 'lucide-react';
import { SHOWCASES, SITE, ytThumb } from '../../lib/site-data';
import HeroSection from '../components/HeroSection';
import Reveal from '../components/Reveal';
import CtaBand from '../components/CtaBand';
import ScrollZoom from '../components/ScrollZoom';
import CinematicGallery from '../components/CinematicGallery';

// Map showcase titles to filter tab labels
const FILTER_TABS = [
  { key: 'all', label_en: 'All', label_bn: 'সব' },
  { key: 'cinematic', label_en: 'Cinematic', label_bn: 'সিনেম্যাটিক' },
  { key: 'product-ai', label_en: 'AI Video Ads', label_bn: 'এআই ভিডিও' },
  { key: 'financial', label_en: 'Financial', label_bn: 'ফাইন্যান্সিয়াল' },
  { key: 'product-brand', label_en: 'Product & Brand', label_bn: 'প্রোডাক্ট' },
  { key: 'custom', label_en: 'Custom', label_bn: 'কাস্টম' },
] as const;

// Assign filter key to each showcase
const SHOWCASE_FILTER_KEY: Record<string, string> = {
  'Cinematic Storytelling': 'cinematic',
  'Product AI Promotional Ads': 'product-ai',
  'Financial Video Ads': 'financial',
  'Product & Brand Ads': 'product-brand',
  'Custom Projects': 'custom',
};

// IDs that appear in the "Coming Soon" section (6 future cinematic spots)
const COMING_SOON_COUNT = 6;

type FilterKey = typeof FILTER_TABS[number]['key'];

function VideoCard({ id, title, priority = false }: { id: string; title: string; priority?: boolean }) {
  const thumb = ytThumb(id, 'hqdefault');
  const ytUrl = `https://www.youtube.com/watch?v=${id}`;

  return (
    <a
      href={ytUrl}
      target="_blank"
      rel="noreferrer"
      title={title}
      className="group relative block overflow-hidden rounded-card border border-on-dark/10 bg-cream transition hover:border-accent-primary/50 hover:shadow-gold-glow"
    >
      <div className="aspect-video">
        <Image
          src={thumb}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition duration-500 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent opacity-80 transition group-hover:opacity-100" />
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-accent-primary text-on-dark shadow-glow transition duration-300 group-hover:scale-110 group-hover:shadow-glow-lg">
            <Play size={18} fill="currentColor" />
          </span>
        </div>
        {/* Title overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3">
          <p className="line-clamp-1 text-xs font-medium text-on-dark/90 drop-shadow">{title}</p>
          <div className="mt-1 flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] text-muted">
            <ArrowUpRight size={10} />
            YouTube
          </div>
        </div>
      </div>
    </a>
  );
}

function ComingSoonCard({ index }: { index: number }) {
  return (
    <div className="relative overflow-hidden rounded-card border border-dashed border-on-dark/20 bg-cream/60">
      <div className="aspect-video flex flex-col items-center justify-center gap-3 p-4 text-center">
        <span className="grid h-10 w-10 place-items-center rounded-full border border-on-dark/10 bg-soft-dark/5 text-muted">
          <Clock size={18} />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Coming Soon
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  // Build flat list of {id, title, filterKey, showcaseTitle}
  const allVideos = SHOWCASES.flatMap((showcase) =>
    showcase.ids.map((id, i) => ({
      id,
      title: `${showcase.title_en} ${i + 1}`,
      filterKey: SHOWCASE_FILTER_KEY[showcase.title_en] ?? 'custom',
      showcaseTitle: showcase.title_en,
    })),
  );

  const filtered =
    activeFilter === 'all'
      ? allVideos
      : allVideos.filter((v) => v.filterKey === activeFilter);

  return (
    <>
      <HeroSection theme="portfolio" watermark="PORTFOLIO">
        <Reveal>
          <span className="eyebrow">Portfolio · শোকেস</span>
        </Reveal>
        <Reveal delay={80}>
          <ScrollZoom className="mt-6">
            <h1 className="max-w-4xl font-serif text-balance text-5xl leading-tight tracking-tight text-on-dark sm:text-6xl lg:text-7xl">
              Story-first <span className="font-display text-accent-primary">video work</span> for modern brands.
            </h1>
          </ScrollZoom>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-muted sm:text-base">
            Browse by category — cinematic storytelling, AI product ads, financial campaigns and custom projects.
          </p>
          <p className="mt-2 max-w-2xl font-bn text-sm leading-7 text-muted">
            ক্যাটাগরি অনুযায়ী ফিল্টার করুন — সিনেম্যাটিক, এআই প্রোডাক্ট অ্যাড, ফাইন্যান্সিয়াল ও কাস্টম।
          </p>
        </Reveal>
      </HeroSection>

      {/* Cinematic Stories Gallery */}
      {(() => {
        const cinematicShowcase = SHOWCASES.find((s) => s.title_en === 'Cinematic Storytelling');
        if (cinematicShowcase) {
          const cinematicVideos = cinematicShowcase.ids.map((id, i) => ({
            id,
            title: `${cinematicShowcase.title_en} ${i + 1}`,
          }));
          return <CinematicGallery videos={cinematicVideos} />;
        }
        return null;
      })()}

      {/* Filter tabs */}
      <div className="border-b border-on-dark/10 bg-soft-dark/5 backdrop-blur-md sticky top-16 sm:top-20 z-30">
        <div className="container-x">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-none">
            {FILTER_TABS.map((tab) => {
              const active = activeFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveFilter(tab.key)}
                  className={`flex-none rounded-full px-4 py-2 text-sm font-medium transition whitespace-nowrap ${
                    active
                      ? 'bg-accent-primary text-on-dark shadow-gold-glow'
                      : 'border border-on-dark/10 bg-soft-dark/5 text-muted hover:border-accent-primary/40 hover:text-on-dark'
                  }`}
                >
                  {tab.label_en}
                  <span className={`ml-1.5 font-bn text-[11px] ${active ? 'text-accent-primary-secondary' : 'text-muted'}`}>
                    {tab.label_bn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Video grid */}
      <section className="container-x py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((video, i) => (
            <Reveal key={video.id} delay={i * 40}>
              <VideoCard id={video.id} title={video.title} priority={i < 3} />
            </Reveal>
          ))}

          {/* Coming Soon cards (only shown in 'all' or 'cinematic' filter) */}
          {(activeFilter === 'all' || activeFilter === 'cinematic') &&
            Array.from({ length: COMING_SOON_COUNT }).map((_, i) => (
              <Reveal key={`coming-soon-${i}`} delay={(filtered.length + i) * 40}>
                <ComingSoonCard index={i} />
              </Reveal>
            ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-sm text-muted">No videos in this category yet.</p>
          </div>
        )}

        <Reveal delay={200}>
          <p className="mt-10 text-center text-xs uppercase tracking-[0.18em] text-muted">
            Click any thumbnail to watch on YouTube
          </p>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="border-t border-on-dark/10 bg-accent-primary/5 py-20 sm:py-24">
        <div className="container-x">
          <Reveal>
            <div className="rounded-card border border-accent-primary/20 bg-gradient-to-br from-accent-primary/[0.08] to-transparent p-8 text-center sm:p-12">
              <h3 className="font-serif text-2xl leading-tight tracking-tight text-on-dark sm:text-3xl">
                Want a campaign like these?
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted">
                Share your brief, and we'll send a creative direction and timeline.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href={SITE.whatsappLink} target="_blank" rel="noreferrer" className="btn-3d-primary">
                  <MessageCircle size={16} />
                  Start your campaign
                </a>
                <Link href="/services" className="btn-3d-secondary">
                  Explore services
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
