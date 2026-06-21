import Link from 'next/link';
import {
  ArrowRight,
  Star,
  PlayCircle,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import {
  PROCESS_STEPS,
  REVIEWS_SEED,
  SERVICES,
  SHOWCASES,
  SITE,
  STATS,
  TRUST_PILLARS,
} from '../lib/site-data';
import HeroSection from './components/HeroSection';
import Reveal from './components/Reveal';
import SectionIntro from './components/SectionIntro';
import ServiceCard from './components/ServiceCard';
import TrustCard from './components/TrustCard';
import VideoThumb from './components/VideoThumb';
import CtaBand from './components/CtaBand';
import ClientLogosSlider from './components/ClientLogosSlider';
import ReviewSection from './components/ReviewSection';
import ScrollZoom from './components/ScrollZoom';
import VideoMarketingShowcase from './components/VideoMarketingShowcase';
import type { DbReview } from './api/reviews/route';
export const metadata = {
  title: 'Creavix — AI Video Marketing Agency Bangladesh',
  description:
    "বাংলাদেশের #১ AI ভিডিও মার্কেটিং এজেন্সি। Meta, YouTube ও TikTok-এর জন্য সিনেম্যাটিক ভিডিও অ্যাড। ২০১৪ থেকে ৪,৩০০+ প্রজেক্ট।",
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Creavix AI Video Agency | Cinematic Ads BD',
    description:
      "Premium AI-powered video ads for Meta, YouTube & TikTok. Bangladesh's most trusted video studio since 2014.",
    images: [
      {
        url: '/share-card.jpg',
        width: 1200,
        height: 630,
        alt: 'Creavix — AI Video Marketing Agency Bangladesh',
        type: 'image/jpeg',
      },
    ],
  },
};

const HERO_REEL = SHOWCASES[0]?.ids?.slice(0, 3) ?? [];

export default function HomePage() {
  return (
    <>
      <HeroSection theme="home" watermark="CREAVIX">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <Reveal>
              <span className="eyebrow">
                <Sparkles size={12} className="text-warm-accent" />
                {SITE.tagline_en}
              </span>
            </Reveal>
            <Reveal delay={80}>
              <ScrollZoom className="mt-6">
                <h1 className="font-serif text-balance text-5xl leading-[1.1] tracking-tight text-warm-fg sm:text-6xl lg:text-7xl xl:text-[88px]">
                  Cinematic <span className="font-display text-warm-accent">AI Video</span>
                  <br />
                  campaigns that convert.
                </h1>
              </ScrollZoom>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-base leading-8 text-warm-muted sm:text-lg">
                Premium storytelling meets AI production. Fast, cinematic, and built for conversions.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href={SITE.whatsappLink} target="_blank" rel="noreferrer" className="btn-3d-primary">
                  Start your campaign
                  <ArrowRight size={16} />
                </a>
                <Link href="/portfolio" className="btn-3d-secondary">
                  <PlayCircle size={16} />
                  View work
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Hero media - single featured video */}
          <div className="relative">
            <Reveal delay={120}>
              {HERO_REEL[0] ? (
                <div className="relative">
                  <div className="absolute -inset-4 -z-10 rounded-[32px] bg-gradient-to-br from-warm-accent/20 via-warm-accent/5 to-transparent blur-2xl" />
                  <VideoThumb id={HERO_REEL[0]} title="Featured cinematic story" priority />
                </div>
              ) : null}
            </Reveal>
          </div>
        </div>

        {/* Stats */}
        <Reveal delay={200}>
          <div className="mt-20 grid gap-px rounded-card border border-warm-fg/10 bg-warm-bg/30 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label_en}
                className="bg-warm-bg p-6 first:rounded-t-card last:rounded-b-card sm:first:rounded-l-card sm:first:rounded-tr-none sm:last:rounded-r-card sm:last:rounded-bl-none"
              >
                <p className="font-display text-4xl tracking-wide text-warm-accent sm:text-5xl">
                  {s.value}
                </p>
                <p className="mt-2 text-sm font-medium text-warm-fg">{s.label_en}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </HeroSection>

      {/* Client logos */}
      <ClientLogosSlider />

      {/* Services */}
      <section className="container-x py-24 sm:py-28 cv-auto">
        <SectionIntro
          eyebrow="Core Services"
          title="High-impact production for"
          accent="modern campaigns"
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={i * 60}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Video Marketing Showcase */}
      <VideoMarketingShowcase />

      {/* Trust pillars */}
      <section className="border-y border-warm-fg/10 bg-warm-accent/5 py-24 sm:py-28 cv-auto">
        <div className="container-x">
          <SectionIntro
            eyebrow="Why Creavix"
            title="Built for"
            accent="trust and delivery"
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_PILLARS.map((pillar, i) => (
              <Reveal key={pillar.title_en} delay={i * 50}>
                <TrustCard pillar={pillar} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio teaser */}
      <section className="container-x py-24 sm:py-28 cv-auto">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionIntro
            eyebrow="Showcase"
            title="Cinematic stories before the"
            accent="short-form grid"
          />
          <Reveal delay={120}>
            <Link href="/portfolio" className="btn-3d-secondary">
              View full portfolio <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SHOWCASES.slice(0, 3).map((sc, i) => (
            <Reveal key={sc.title_en} delay={i * 80}>
              <article className="card-warm overflow-hidden">
                <VideoThumb id={sc.ids[0]} title={sc.title_en} />
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-warm-fg/10 bg-warm-accent/5 py-24 sm:py-28 cv-auto">
        <div className="container-x">
          <SectionIntro
            eyebrow="Our Process"
            title="A clearer flow for"
            accent="faster approvals"
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={step.step} delay={i * 70}>
                <div className="card-warm relative h-full p-6">
                  <span className="absolute -right-4 -top-4 grid h-12 w-12 place-items-center rounded-2xl bg-warm-accent/15 font-display text-base text-warm-accent ring-1 ring-warm-accent/30">
                    {step.step}
                  </span>
                  <h3 className="font-display text-xl uppercase tracking-[0.04em] text-warm-fg">
                    {step.title_en}
                  </h3>
                  <p className="mt-1 font-bn text-sm text-warm-muted00">{step.title_bn}</p>
                  <p className="mt-3 font-bn text-sm leading-7 text-warm-muted00">{step.desc_bn}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews (live counter + form) */}
      <ReviewSection initial={REVIEWS_SEED.map<DbReview>((r) => ({
        id: r.id,
        name: r.name,
        email_masked: r.email,
        rating: r.rating,
        review_en: r.text_en ?? r.text_bn ?? '',
        review_bn: r.text_bn,
        verified: r.verified,
        created_at: r.createdAt,
        avatar_color: '#A855F7',
      }))} />

      {/* Value promise */}
      <section className="container-x pb-24 sm:pb-28 cv-auto">
        <Reveal>
          <div className="grid gap-10 rounded-card border border-warm-fg/10 bg-warm-fg/[0.03] p-8 sm:p-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <span className="eyebrow">Studio Promise</span>
              <h2 className="mt-5 font-serif text-3xl leading-tight tracking-tight text-warm-fg sm:text-4xl">
                Quality, speed, and
                <span className="font-display text-warm-accent"> clear communication</span>.
              </h2>
            </div>
            <ul className="space-y-3">
              {[
                'Conversion-focused strategy from day one.',
                'Fast turnarounds without compromising quality.',
                'Direct founder oversight on every project.',
                'Transparent, bilingual collaboration.',
              ].map((t) => (
                <li key={t} className="flex gap-3 text-sm leading-6 text-warm-fg">
                  <CheckCircle2 size={18} className="mt-0.5 flex-none text-warm-accent" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
