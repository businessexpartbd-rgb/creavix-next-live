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
                <Sparkles size={12} className="text-brand" />
                {SITE.tagline_en} · বাংলাদেশ
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 font-display text-balance text-5xl uppercase leading-[0.92] tracking-[0.04em] text-white sm:text-6xl lg:text-7xl xl:text-[88px]">
                Cinematic <span className="accent">AI Video</span>
                <br />
                campaigns that convert.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-base leading-8 text-ash-300 sm:text-lg">
                Creavix blends premium storytelling, AI-led production and bilingual brand
                clarity for businesses that want short-form speed, cinematic depth and a
                stronger mobile-first web presence.
              </p>
              <p className="mt-3 max-w-xl font-bn text-sm leading-7 text-ash-200">
                মেটা, ইউটিউব ও টিকটকের জন্য বাস্তবধর্মী, কনভার্সন-কেন্দ্রিক এআই ভিডিও অ্যাড।
                ২০১৪ থেকে ৪,৩০০+ ব্র্যান্ডের পাশে।
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
                  Watch our work
                </Link>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-10 flex items-center gap-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-ash-300">
                  <span className="font-semibold text-white">4.8/5</span> from verified clients ·{' '}
                  <span className="font-bn">৪,৩০০+ প্রজেক্ট</span>
                </p>
              </div>
            </Reveal>
          </div>

          {/* Hero media stack */}
          <div className="relative">
            <Reveal delay={120}>
              <div className="relative grid gap-4">
                {HERO_REEL[0] ? (
                  <div className="relative">
                    <div className="absolute -inset-4 -z-10 rounded-[32px] bg-gradient-to-br from-brand/30 via-brand/10 to-transparent blur-2xl" />
                    <VideoThumb id={HERO_REEL[0]} title="Featured cinematic story" priority />
                  </div>
                ) : null}
                <div className="grid grid-cols-2 gap-4">
                  {HERO_REEL.slice(1, 3).map((id, i) => (
                    <VideoThumb key={id} id={id} title={`Hero reel ${i + 2}`} />
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={280}>
              <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-white/10 bg-ink-900/80 p-4 shadow-card backdrop-blur lg:block">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-white">
                    <Sparkles size={18} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-ash-400">Delivered in</p>
                    <p className="font-display text-lg uppercase tracking-wide text-white">
                      24–48 hours
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Stats */}
        <Reveal delay={200}>
          <div className="mt-20 grid gap-px rounded-card border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label_en}
                className="bg-ink-900/60 p-6 first:rounded-t-card last:rounded-b-card sm:first:rounded-l-card sm:first:rounded-tr-none sm:last:rounded-r-card sm:last:rounded-bl-none"
              >
                <p className="font-display text-4xl tracking-wide text-white sm:text-5xl">
                  <span className="accent">{s.value}</span>
                </p>
                <p className="mt-2 text-sm font-medium text-ash-200">{s.label_en}</p>
                <p className="mt-1 font-bn text-xs text-ash-400">{s.sub_bn}</p>
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
          eyebrow="Core Services · মূল সার্ভিস"
          title="High-impact production for"
          accent="modern campaigns"
          body="Conversion-focused AI video ads, cinematic storytelling and bilingual campaign formats."
          body_bn="কনভার্সন-ফোকাসড এআই ভিডিও অ্যাড, সিনেম্যাটিক স্টোরিটেলিং ও বাইলিঙ্গুয়াল ক্যাম্পেইন।"
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={i * 60}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Trust pillars */}
      <section className="border-y border-white/10 bg-ink-800/60 py-24 sm:py-28 cv-auto">
        <div className="container-x">
          <SectionIntro
            eyebrow="Why Creavix · কেন আমরা"
            title="Built for"
            accent="trust and delivery"
            body_bn="দ্রুত অনুমোদন, পরিষ্কার যোগাযোগ ও নির্ভরযোগ্য কোয়ালিটি — তাই দীর্ঘমেয়াদি ক্যাম্পেইনে স্টুডিও ভরসা অর্জন করেছে।"
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
            eyebrow="Showcase · কাজের ঝলক"
            title="Cinematic stories before the"
            accent="short-form grid"
            body_bn="স্টোরি-ফার্স্ট ভিডিও আগে দেখানো হয়, এরপর ক্যাটাগরিভিত্তিক শর্ট-ফর্ম গ্রিড।"
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
              <article className="card-3d overflow-hidden">
                <VideoThumb id={sc.ids[0]} title={sc.title_en} />
                <div className="p-6">
                  <h3 className="font-display text-xl uppercase tracking-[0.04em] text-white">
                    {sc.title_en}
                  </h3>
                  <p className="mt-1 font-bn text-sm text-ash-400">{sc.title_bn}</p>
                  <p className="mt-3 text-sm leading-7 text-ash-300">{sc.sub_en}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-white/10 bg-ink-800/60 py-24 sm:py-28 cv-auto">
        <div className="container-x">
          <SectionIntro
            eyebrow="Our Process · কাজের ধাপ"
            title="A clearer flow for"
            accent="faster approvals"
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={step.step} delay={i * 70}>
                <div className="card-3d relative h-full p-6">
                  <span className="absolute -right-4 -top-4 grid h-12 w-12 place-items-center rounded-2xl bg-brand/15 font-display text-base text-brand ring-1 ring-brand/30">
                    {step.step}
                  </span>
                  <h3 className="font-display text-xl uppercase tracking-[0.04em] text-white">
                    {step.title_en}
                  </h3>
                  <p className="mt-1 font-bn text-sm text-ash-400">{step.title_bn}</p>
                  <p className="mt-3 font-bn text-sm leading-7 text-ash-200">{step.desc_bn}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews (live counter + form) */}
      <ReviewSection initial={REVIEWS_SEED} />

      {/* Value promise */}
      <section className="container-x pb-24 sm:pb-28 cv-auto">
        <Reveal>
          <div className="grid gap-10 rounded-card border border-white/10 bg-white/[0.03] p-8 sm:p-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <span className="eyebrow">Studio promise · প্রতিশ্রুতি</span>
              <h2 className="mt-5 font-display text-3xl uppercase tracking-[0.04em] text-white sm:text-4xl">
                Sharper hierarchy, calmer reading flow,{' '}
                <span className="accent">stronger premium cues.</span>
              </h2>
            </div>
            <ul className="space-y-4">
              {[
                'Strategy-led content where every asset starts with audience intent and a conversion plan.',
                'Bilingual brand delivery — English-first structure with refined Bangla presentation.',
                'Premium turnaround without sacrificing cinematic polish or brand safety.',
                'Founder-led oversight on every brief from script to final export.',
              ].map((t) => (
                <li key={t} className="flex gap-3 text-sm leading-7 text-ash-200">
                  <CheckCircle2 size={18} className="mt-1 flex-none text-brand" />
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
