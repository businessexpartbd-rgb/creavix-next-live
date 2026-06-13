import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SHOWCASES, SITE } from '../../lib/site-data';
import HeroSection from '../components/HeroSection';
import Reveal from '../components/Reveal';
import AnimatedText from '../components/AnimatedText';
import SectionIntro from '../components/SectionIntro';
import VideoThumb from '../components/VideoThumb';
import CtaBand from '../components/CtaBand';

export const metadata = {
  title: 'AI Video Portfolio — Cinematic Ads & Brand Campaigns | Creavix',
  description:
    'Creavix-এর সেরা কাজ দেখুন — AI ভিডিও অ্যাড, সিনেম্যাটিক স্টোরিটেলিং ও ব্র্যান্ড ক্যাম্পেইন। Meta, YouTube ও TikTok-রেডি ভিডিও। বাংলাদেশের শীর্ষ ভিডিও এজেন্সি।',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Creavix Portfolio — Best AI Video Ads Bangladesh',
    description:
      'Watch our cinematic AI video campaigns. Meta, YouTube & TikTok-ready ads for Bangladeshi brands. 4,300+ projects delivered.',
    url: 'https://www.creavixit.com/portfolio',
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
  twitter: {
    title: 'Creavix Portfolio — AI Cinematic Video Work',
    description:
      "Cinematic AI video campaigns for Meta, YouTube & TikTok. Bangladesh's top video agency.",
    images: ['/share-card.jpg'],
  },
};

const STORY = SHOWCASES[0];
const SHORTS = SHOWCASES.slice(1);

const EXTRA_IDS = ['UlNoCAs69vg', '4ryJaLx6o0k'];

export default function PortfolioPage() {
  return (
    <>
      <HeroSection theme="portfolio" watermark="PORTFOLIO">
        <Reveal>
          <span className="eyebrow">Portfolio · শোকেস</span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-6 max-w-4xl font-display text-balance text-5xl uppercase leading-[0.92] tracking-[0.04em] text-white sm:text-6xl lg:text-7xl">
            Story-first <span className="accent">video work</span> for modern brands.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 max-w-2xl font-bn text-sm leading-7 text-ash-200 sm:text-base">
            সিনেম্যাটিক স্টোরিটেলিং আগে, এরপর ক্যাটাগরি-ভিত্তিক শর্ট-ফর্ম গ্রিড — মোবাইল ট্যাপ ও ডেস্কটপ ব্রাউজিং
            উভয়ের জন্য অপ্টিমাইজড।
          </p>
        </Reveal>
      </HeroSection>

      {/* Featured storytelling */}
      <section id="storytelling" className="container-x py-24 sm:py-28">
        <SectionIntro
          eyebrow="Featured storytelling · ফিচার্ড স্টোরিটেলিং"
          title="Large-format previews that keep"
          accent="story & atmosphere first"
          body_bn={STORY.title_bn + ' — বড় ফরম্যাটে গল্প-প্রথম প্রিভিউ।'}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {STORY.ids.slice(0, 4).map((id, i) => (
            <Reveal key={id} delay={i * 70}>
              <VideoThumb id={id} title={`${STORY.title_en} ${i + 1}`} priority={i === 0} />
            </Reveal>
          ))}
          {EXTRA_IDS.map((id, i) => (
            <Reveal key={id} delay={(STORY.ids.slice(0, 4).length + i) * 70}>
              <VideoThumb
                id={id}
                title={`${STORY.title_en} ${STORY.ids.slice(0, 4).length + i + 1}`}
                priority={false}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Categorized short-form */}
      <section className="border-y border-white/10 bg-ink-800/60 py-24 sm:py-28">
        <div className="container-x space-y-16">
          <SectionIntro
            eyebrow="Short-form grids · শর্ট-ফর্ম"
            title="Responsive shorts arranged for"
            accent="quick scanning"
          />
          {SHORTS.map((cat, idx) => (
            <Reveal key={cat.title_en} delay={idx * 60}>
              <div className="card-3d p-6 sm:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-2xl">
                    <h3 className="font-display text-2xl uppercase tracking-[0.04em] text-white sm:text-3xl">
                      {cat.title_en}
                    </h3>
                    <p className="mt-1 font-bn text-sm text-ash-400">{cat.title_bn}</p>
                    <p className="mt-3 text-sm leading-7 text-ash-300">{cat.sub_en}</p>
                  </div>
                  <a
                    href={`https://www.youtube.com/watch?v=${cat.ids[0]}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-secondary"
                  >
                    Watch on YouTube <ArrowUpRight size={14} />
                  </a>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                  {cat.ids.map((id, i) => (
                    <VideoThumb
                      key={id}
                      id={id}
                      ratio="9/16"
                      title={`${cat.title_en} ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-x py-20">
        <Reveal>
          <div className="rounded-card border border-white/10 bg-white/5 p-8 text-center sm:p-12">
            <h3 className="font-display text-2xl uppercase tracking-[0.04em] text-white sm:text-3xl">
              Want a campaign like these?
            </h3>
            <p className="mx-auto mt-3 max-w-xl font-bn text-sm leading-7 text-ash-200">
              আপনার পণ্য, অডিয়েন্স ও লক্ষ্য জানান — পরিষ্কার প্ল্যান ও স্যাম্পল ক্রিয়েটিভ ডিরেকশন পাঠাবো।
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={SITE.whatsappLink} target="_blank" rel="noreferrer" className="btn-3d-primary">
                Start your campaign
              </a>
              <Link href="/services" className="btn-3d-secondary">
                Explore services
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
