import Link from 'next/link';
import {
  ArrowRight,
  Star,
  PlayCircle,
  Sparkles,
  CheckCircle2,
  Quote,
} from 'lucide-react';
import {
  PROCESS,
  REVIEWS,
  SERVICES,
  SHOWCASES,
  SITE,
  STATS,
  TRUST_PILLARS,
  ytThumb,
} from '../data/site-data';
import Reveal from './components/Reveal';
import SectionIntro from './components/SectionIntro';
import ServiceCard from './components/ServiceCard';
import TrustCard from './components/TrustCard';
import VideoThumb from './components/VideoThumb';
import CtaBand from './components/CtaBand';

export const metadata = {
  title: 'AI Video Marketing Studio in Bangladesh',
  description:
    'Creavixit creates cinematic AI video campaigns, product promotional ads, YouTube Shorts content and bilingual brand storytelling for growth-focused businesses.',
  alternates: { canonical: '/' },
};

const HERO_REEL = SHOWCASES[0]?.ids?.slice(0, 3) || [];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-40">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-gold" />
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <Reveal>
                <span className="eyebrow">
                  <Sparkles size={12} className="text-gold-400" />
                  {SITE.tagline_en} · বাংলাদেশ
                </span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl xl:text-[68px]">
                  Cinematic <span className="accent">AI video</span> campaigns crafted to convert.
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg">
                  Creavixit blends premium storytelling, AI-led production and bilingual brand clarity
                  for businesses that want short-form speed, cinematic depth and a stronger
                  mobile-first web presence.
                </p>
                <p className="mt-3 max-w-xl font-bn text-sm leading-7 text-zinc-500">
                  মেটা, ইউটিউব ও টিকটকের জন্য বাস্তবধর্মী, কনভার্সন-কেন্দ্রিক এআই ভিডিও অ্যাড তৈরি করি।
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a href={SITE.whatsappLink} target="_blank" rel="noreferrer" className="btn-primary">
                    Start your campaign
                    <ArrowRight size={16} />
                  </a>
                  <Link href="/portfolio" className="btn-secondary">
                    <PlayCircle size={16} />
                    Watch our work
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={320}>
                <div className="mt-10 flex items-center gap-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <p className="text-sm text-zinc-400">
                    <span className="font-semibold text-white">4.8/5</span> from verified clients ·
                    <span className="ml-1">4,300+ projects since 2014</span>
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
                      <div className="absolute -inset-4 -z-10 rounded-[32px] bg-gradient-to-br from-gold-400/30 via-gold-400/10 to-transparent blur-2xl" />
                      <VideoThumb
                        id={HERO_REEL[0]}
                        title="Featured cinematic story"
                        priority
                      />
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
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-gold-400 text-ink-950">
                      <Sparkles size={18} />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Delivered in</p>
                      <p className="font-display text-lg font-semibold text-white">24–48 hours</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Stats */}
          <Reveal delay={200}>
            <div className="mt-20 grid gap-px rounded-3xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="bg-ink-900/60 p-6 first:rounded-t-3xl last:rounded-b-3xl sm:first:rounded-l-3xl sm:first:rounded-tr-none sm:last:rounded-r-3xl sm:last:rounded-bl-none"
                >
                  <p className="font-display text-3xl font-semibold text-white sm:text-4xl">
                    <span className="accent">{s.value}</span>
                  </p>
                  <p className="mt-2 text-sm font-medium text-zinc-300">{s.label}</p>
                  <p className="mt-1 text-xs text-zinc-500">{s.sub}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="container-x py-24 sm:py-28">
        <SectionIntro
          eyebrow="Core Services · মূল সার্ভিস"
          title="High-impact production systems for"
          accent="modern campaigns"
          body="Conversion-focused AI video ads, cinematic storytelling and bilingual campaign formats — arranged for faster decisions and clearer project briefs."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={i * 60}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section className="border-y border-white/10 bg-ink-900/60 py-24 sm:py-28">
        <div className="container-x">
          <SectionIntro
            eyebrow="Why Creavixit · কেন আমরা"
            title="A studio setup built for"
            accent="trust and delivery"
            body="Fast approvals, clear communication and reliable output quality make the studio easier to trust for long-term campaign work."
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

      {/* PORTFOLIO TEASER */}
      <section className="container-x py-24 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionIntro
            eyebrow="Showcase · কাজের ঝলক"
            title="Cinematic stories before the"
            accent="short-form grid"
            body="Mobile visitors see story-first direction first, then move deeper into product, finance and short-form campaign categories."
          />
          <Reveal delay={120}>
            <Link href="/portfolio" className="btn-secondary">
              View full portfolio <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SHOWCASES.slice(0, 3).map((sc, i) => (
            <Reveal key={sc.title_en} delay={i * 80}>
              <article className="glass overflow-hidden p-0">
                <VideoThumb id={sc.ids[0]} title={sc.title_en} />
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-white">{sc.title_en}</h3>
                  <p className="mt-1 font-bn text-sm text-zinc-500">{sc.title_bn}</p>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">{sc.sub_en}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-y border-white/10 bg-ink-900/60 py-24 sm:py-28">
        <div className="container-x">
          <SectionIntro
            eyebrow="Our Process · কাজের ধাপ"
            title="A clearer production flow for"
            accent="faster approvals"
            body="From discovery to delivery, every step stays visible so brand teams can easily track timelines, approvals and revisions."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step, i) => (
              <Reveal key={step.step} delay={i * 70}>
                <div className="glass relative h-full">
                  <span className="absolute -top-4 -right-4 grid h-12 w-12 place-items-center rounded-2xl bg-gold-400/10 font-display text-base font-bold text-gold-400 ring-1 ring-gold-400/30">
                    {step.step}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-x py-24 sm:py-28">
        <SectionIntro
          eyebrow="Client Voices · ক্লায়েন্ট রিভিউ"
          title="What teams say after"
          accent="working with us"
          body="Real feedback from brands that have launched AI video ads, storytelling films and bilingual campaigns with Creavixit."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 60}>
              <figure className="glass relative h-full">
                <Quote className="absolute right-6 top-6 text-gold-400/20" size={36} />
                <div className="flex">
                  {[...Array(r.rating)].map((_, j) => (
                    <Star key={j} size={14} className="fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <blockquote className="mt-5 text-sm leading-7 text-zinc-300">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-gold-400/40 to-gold-600/10 text-sm font-semibold text-gold-400 ring-1 ring-gold-400/20">
                    {r.name.charAt(0)}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-white">{r.name}</div>
                    <div className="text-xs text-zinc-500">{r.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* VALUE PROMISE */}
      <section className="container-x pb-24 sm:pb-28">
        <Reveal>
          <div className="grid gap-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <span className="eyebrow">Studio promise</span>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
                Sharper hierarchy, calmer reading flow and{' '}
                <span className="accent">stronger premium cues</span>.
              </h2>
            </div>
            <ul className="space-y-4">
              {[
                'Strategy-led content where every asset starts with audience intent and a conversion plan.',
                'Bilingual brand delivery — English-first structure with refined Bangla presentation for local trust.',
                'Premium turnaround without sacrificing cinematic polish or brand safety.',
                'Founder-led oversight on every brief from script to final export.',
              ].map((t) => (
                <li key={t} className="flex gap-3 text-sm leading-7 text-zinc-300">
                  <CheckCircle2 size={18} className="mt-1 flex-none text-gold-400" />
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
