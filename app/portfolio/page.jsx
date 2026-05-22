import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SHOWCASES, SITE } from '../../data/site-data';
import Reveal from '../components/Reveal';
import SectionIntro from '../components/SectionIntro';
import VideoThumb from '../components/VideoThumb';
import CtaBand from '../components/CtaBand';

export const metadata = {
  title: 'Video Ads Portfolio & Storytelling Work',
  description:
    'Browse cinematic storytelling videos and short-form AI video campaigns from Creavixit. Featured work across product, financial and brand industries.',
  alternates: { canonical: '/portfolio' },
};

const STORY_CATEGORY = SHOWCASES[0];
const SHORT_CATEGORIES = SHOWCASES.slice(1);

export default function PortfolioPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-40">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-gold" />
        <div className="container-x">
          <Reveal>
            <span className="eyebrow">Portfolio · শোকেস</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 max-w-4xl text-balance font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Story-first <span className="accent">video work</span> for modern brands.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
              Cinematic storytelling first, followed by fast-loading short-form grids organized by
              category — built for mobile taps and desktop browsing alike.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FEATURED STORYTELLING */}
      <section id="storytelling" className="container-x py-24 sm:py-28">
        <SectionIntro
          eyebrow="Featured storytelling"
          title="Large-format previews that keep"
          accent="story and atmosphere first"
          body={STORY_CATEGORY.sub_en}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {STORY_CATEGORY.ids.slice(0, 4).map((id, i) => (
            <Reveal key={id} delay={i * 70}>
              <VideoThumb
                id={id}
                title={`${STORY_CATEGORY.title_en} ${i + 1}`}
                priority={i === 0}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* CATEGORIES (SHORT-FORM) */}
      <section className="border-y border-white/10 bg-ink-900/60 py-24 sm:py-28">
        <div className="container-x space-y-16">
          <SectionIntro
            eyebrow="Short-form grids"
            title="Responsive shorts arranged for"
            accent="quick scanning"
            body="Mobile uses a two-column 9:16 grid; tablet expands to three columns and desktop to four."
          />
          {SHORT_CATEGORIES.map((cat, idx) => (
            <Reveal key={cat.title_en} delay={idx * 60}>
              <div className="glass">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-2xl">
                    <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                      {cat.title_en}
                    </h3>
                    <p className="mt-1 font-bn text-sm text-zinc-500">{cat.title_bn}</p>
                    <p className="mt-3 text-sm leading-7 text-zinc-400">{cat.sub_en}</p>
                  </div>
                  <a
                    href={`https://www.youtube.com/watch?v=${cat.ids[0]}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gold-400 hover:text-gold-500"
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
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center sm:p-12">
            <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              Want a campaign like these for your brand?
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-400">
              Share your product, audience and goal — we&apos;ll respond with a clear plan and a sample
              creative direction.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={SITE.whatsappLink} target="_blank" rel="noreferrer" className="btn-primary">
                Start your campaign
              </a>
              <Link href="/services" className="btn-secondary">
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
