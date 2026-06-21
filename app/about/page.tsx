import { CheckCircle2, Quote, Zap, Eye, Heart, Shield } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SITE, TRUST_PILLARS } from '../../lib/site-data';
import HeroSection from '../components/HeroSection';
import Reveal from '../components/Reveal';
import SectionIntro from '../components/SectionIntro';
import TrustCard from '../components/TrustCard';
import CtaBand from '../components/CtaBand';

export const metadata = {
  title: 'About Creavix — AI Video Studio Bangladesh Since 2014 | Hannan Khan',
  description:
    'Creavix IT Solution — হেমায়েতপুর, সাভার, ঢাকায় অবস্থিত বাংলাদেশের প্রিমিয়াম AI ভিডিও স্টুডিও। ২০১৪ সাল থেকে Hannan Khan-এর নেতৃত্বে ৪,৩০০+ ব্র্যান্ডের সাথে কাজ করেছি।',
  alternates: { canonical: '/about' },
  openGraph: {
    title: "About Creavix — Bangladesh's AI Video Studio Since 2014",
    description: 'Founded 2014 by Hannan Khan in Savar, Dhaka. 4,300+ projects. Cinematic AI video production with founder-led direction.',
    url: 'https://www.creavixit.com/about',
    images: [{ url: '/share-card.jpg', width: 1200, height: 630, alt: 'Creavix — AI Video Marketing Agency Bangladesh', type: 'image/jpeg' }],
  },
  twitter: {
    title: 'About Creavix — AI Video Studio Since 2014',
    description: "Founded 2014 by Hannan Khan in Savar, Dhaka. 4,300+ projects. Bangladesh's premier AI video studio.",
    images: ['/share-card.jpg'],
  },
};

const TOUCHPOINTS_BN = [
  'প্রতিটি ব্রিফে ফাউন্ডার-লেড সরাসরি ক্রিয়েটিভ ওভারসাইট।',
  'বাংলা-ইংরেজি বাইলিঙ্গুয়াল কমিউনিকেশন ও প্রিমিয়াম প্রেজেন্টেশন।',
  'সাভার, ঢাকার বাস্তব স্টুডিও — WhatsApp, ইমেইল ও সরাসরি অ্যাক্সেস।',
  '১০+ বছরের অভিজ্ঞতা — প্রোডাক্ট, ফিনান্স, কর্পোরেট ও শর্ট-ফর্ম।',
];

const STATS = [
  { value: SITE.servingSince, label_en: 'Serving since', label_bn: 'কার্যক্রমে' },
  { value: '10+', label_en: 'Years', label_bn: 'বছর' },
  { value: '4,300+', label_en: 'Projects', label_bn: 'প্রজেক্ট' },
  { value: 'Savar', label_en: 'Studio', label_bn: 'স্টুডিও' },
];

const TIMELINE = [
  {
    year: '2014',
    title_en: 'Founded in Savar',
    title_bn: 'সাভারে প্রতিষ্ঠা',
    desc_en: 'Creavix started as a small creative studio in Hemayetpur, Savar — focused on promotional video production for local businesses.',
    desc_bn: 'হেমায়েতপুর, সাভারে ছোট ক্রিয়েটিভ স্টুডিও হিসেবে যাত্রা শুরু — স্থানীয় ব্যবসার প্রমোশনাল ভিডিওর জন্য।',
  },
  {
    year: '2018',
    title_en: 'Scaled to 1,000+ Projects',
    title_bn: '১,০০০+ প্রজেক্ট সম্পন্ন',
    desc_en: 'After 4 years of consistent delivery, the studio crossed 1,000 completed campaigns — expanding into product and financial video ads.',
    desc_bn: '৪ বছরে ১,০০০+ ক্যাম্পেইন সম্পন্ন — প্রোডাক্ট ও ফাইন্যান্সিয়াল ভিডিও অ্যাডে সম্প্রসারিত।',
  },
  {
    year: '2021',
    title_en: 'AI-First Production Adopted',
    title_bn: 'এআই-ফার্স্ট প্রোডাকশন',
    desc_en: 'Integrated AI video tools into the production pipeline — enabling faster delivery, more visual variety and higher campaign consistency.',
    desc_bn: 'প্রোডাকশন পাইপলাইনে AI ভিডিও টুল যুক্ত করা হয় — দ্রুত ডেলিভারি ও উচ্চ কোয়ালিটি নিশ্চিত।',
  },
  {
    year: '2024',
    title_en: '4,000+ Projects Delivered',
    title_bn: '৪,০০০+ প্রজেক্ট',
    desc_en: 'Surpassed 4,000 successful deliveries across 10+ industries including fintech, e-commerce, insurance and NGOs.',
    desc_bn: 'ফিনটেক, ই-কমার্স, ইন্স্যুরেন্স ও এনজিও সহ ১০+ ইন্ডাস্ট্রিতে ৪,০০০+ সফল ডেলিভারি।',
  },
  {
    year: '2026',
    title_en: 'Global-Standard AI Studio',
    title_bn: 'গ্লোবাল-স্ট্যান্ডার্ড স্টুডিও',
    desc_en: 'Expanding to serve international clients with bilingual content, global campaign formats and founder-led quality oversight.',
    desc_bn: 'আন্তর্জাতিক ক্লায়েন্টদের জন্য বাইলিঙ্গুয়াল কন্টেন্ট ও গ্লোবাল ক্যাম্পেইন ফরম্যাটে সম্প্রসারণ।',
  },
];

interface CoreValue {
  icon: LucideIcon;
  title_en: string;
  title_bn: string;
  desc_en: string;
  desc_bn: string;
}

const CORE_VALUES: CoreValue[] = [
  {
    icon: Zap,
    title_en: 'Speed Without Compromise',
    title_bn: 'গতি, কোয়ালিটি ছাড়া নয়',
    desc_en: 'Every delivery is fast — 24h shorts, 48h long-form. But speed never comes at the cost of cinematic quality.',
    desc_bn: 'প্রতিটি ডেলিভারি দ্রুত — কিন্তু সিনেম্যাটিক কোয়ালিটির সাথে আপোষ নেই।',
  },
  {
    icon: Eye,
    title_en: 'Story Before Aesthetics',
    title_bn: 'অ্যাস্থেটিক্সের আগে গল্প',
    desc_en: 'Pretty visuals don\'t convert — clear, emotional storytelling does. We always script the narrative before the visual.',
    desc_bn: 'শুধু সুন্দর ভিজ্যুয়াল কনভার্ট করে না — পরিষ্কার ন্যারেটিভই করে।',
  },
  {
    icon: Heart,
    title_en: 'Bilingual by Default',
    title_bn: 'ডিফল্টে দুভাষিক',
    desc_en: 'Bangladesh has a bilingual audience. Every campaign we produce is designed for both Bangla and English speakers.',
    desc_bn: 'বাংলাদেশ বাইলিঙ্গুয়াল — প্রতিটি ক্যাম্পেইন বাংলা ও ইংরেজি উভয় অডিয়েন্সের জন্য।',
  },
  {
    icon: Shield,
    title_en: 'Founder-Led Accountability',
    title_bn: 'ফাউন্ডার-লেড দায়বদ্ধতা',
    desc_en: 'Hannan personally oversees every brief. If something misses the mark, we correct it — no excuses.',
    desc_bn: 'Hannan ব্যক্তিগতভাবে প্রতিটি ব্রিফ দেখে — কোনো ভুল হলে সংশোধন করা হয়, কোনো অজুহাত �����েই।',
  },
];

export default function AboutPage() {
  const mapsSrc = `https://maps.google.com/maps?q=${SITE.geo.lat},${SITE.geo.lng}&z=14&output=embed`;

  return (
    <>
      <HeroSection theme="about" watermark="ABOUT">
        <Reveal>
          <span className="eyebrow">About Creavix · আমাদের গল্প</span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-6 max-w-4xl font-serif text-balance text-5xl leading-tight tracking-tight text-warm-fg sm:text-6xl lg:text-7xl">
            Storytelling, performance & <span className="font-display text-warm-accent">AI production</span> together.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 max-w-2xl font-bn text-sm leading-7 text-warm-muted sm:text-base">
            Creavix বাংলাদেশের একটি ফোকাসড AI ভিডিও মার্কেটিং স্টুডিও। সিনেম্যাটিক ডিরেকশন ও আধুনিক AI ওয়ার্কফ্লো একসাথে।
          </p>
        </Reveal>
      </HeroSection>

      {/* Founder section */}
      <section className="container-x py-24 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-br from-warm-accent/15 to-transparent blur-2xl" />
              <div className="card-warm relative p-8 sm:p-10">
                <div className="grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-warm-accent to-orange-600 font-display text-4xl text-warm-bg ring-4 ring-warm-accent/20 shadow-warm-glow">
                  HK
                </div>
                <h3 className="mt-6 font-serif text-3xl tracking-tight text-warm-fg">
                  {SITE.founder.name}
                </h3>
                <p className="mt-1 text-sm text-warm-accent">{SITE.founder.role_en}</p>
                <p className="font-bn text-sm text-warm-muted">{SITE.founder.role_bn}</p>
                <p className="mt-5 font-bn text-sm leading-7 text-warm-muted">
                  Hannan সরাসরি প্রতিটি ব্রিফের ক্রিয়েটিভ ডিরেকশন করে — প্রথম মেসেজ থেকে ফাইনাল এক্সপোর্ট পর্যন্ত।
                </p>
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-warm-fg/10 bg-warm-accent/5 p-4">
                  <Quote size={16} className="mt-1 flex-none text-warm-accent" />
                  <p className="font-bn text-sm leading-7 text-warm-fg">
                    &ldquo;ক্লায়েন্ট শুধু ভিডিও কেনে না — তারা চয়েস করে কে ব্রিফের কাছাকাছি থাকবে আর সময়মতো রেসপন্স দেবে।&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="eyebrow">Founder-led direction · ফাউন্ডার-লেড</span>
              <h2 className="mt-5 font-serif text-3xl tracking-tight text-warm-fg sm:text-4xl">
                Closer creative ownership behind <span className="text-warm-accent">every delivery.</span>
              </h2>
              <p className="mt-5 font-bn text-sm leading-7 text-warm-muted">
                Creavix একটি ফাউন্ডার-লেড স্টুডিও। তাই ব্রিফ, রিভিশন ও ফাইনাল পলিশ — সবই কোর ডিসিশন-মেকারের কাছাকাছি থাকে।
              </p>
            </Reveal>
            <ul className="mt-8 space-y-4">
              {TOUCHPOINTS_BN.map((t, i) => (
                <Reveal key={t} delay={i * 60}>
                  <li className="flex gap-3">
                    <CheckCircle2 size={18} className="mt-1 flex-none text-warm-accent" />
                    <span className="font-bn text-sm leading-7 text-warm-fg">{t}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={200}>
              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {STATS.map((s) => (
                  <div key={String(s.label_en)} className="card-warm rounded-card p-4">
                    <div className="font-display text-3xl tracking-wide text-warm-fg">
                      <span className="text-warm-accent">{s.value}</span>
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-[0.16em] text-warm-muted">{s.label_en}</div>
                    <div className="mt-1 font-bn text-[11px] text-warm-muted">{s.label_bn}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-y border-warm-fg/10 bg-warm-accent/5 py-24 sm:py-28">
        <div className="container-x">
          <SectionIntro
            eyebrow="Our journey"
            title="A decade of"
            accent="consistent growth"
            body_bn="২০১৪ থেকে ২০২৬ — প্রতিটি মাইলস্টোন ছিল একটি নতুন প্রতিশ্রুতি।"
          />
          <div className="relative mt-14">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-warm-accent via-warm-accent/40 to-transparent sm:left-[50%] sm:-translate-x-px" />

            <div className="space-y-0">
              {TIMELINE.map((item, i) => {
                const isRight = i % 2 === 0;
                return (
                  <Reveal key={item.year} delay={i * 80}>
                    <div className={`relative flex gap-8 pb-12 pl-12 sm:pl-0 sm:gap-0 ${isRight ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                      {/* Year bubble */}
                      <div className="absolute left-0 top-0 z-10 grid h-9 w-9 place-items-center rounded-full border-2 border-warm-accent bg-warm-bg shadow-warm-glow sm:left-[50%] sm:-translate-x-1/2">
                        <span className="h-2.5 w-2.5 rounded-full bg-warm-accent" />
                      </div>
                      {/* Content card */}
                      <div className={`w-full sm:w-[calc(50%-2.5rem)] ${isRight ? 'sm:pr-8 sm:text-right' : 'sm:pl-8 sm:text-left'}`}>
                        <div className="card-warm p-5 sm:p-6">
                          <span className="font-display text-3xl tracking-wide text-warm-accent">{item.year}</span>
                          <h3 className="mt-2 font-serif text-xl tracking-tight text-warm-fg">{item.title_en}</h3>
                          <p className="font-bn text-xs text-warm-muted">{item.title_bn}</p>
                          <p className="mt-3 text-sm leading-7 text-warm-fg">{item.desc_en}</p>
                          <p className="mt-2 font-bn text-xs leading-6 text-warm-muted">{item.desc_bn}</p>
                        </div>
                      </div>
                      {/* Spacer on opposite side */}
                      <div className="hidden sm:block sm:w-[calc(50%-2.5rem)]" />
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="container-x py-24 sm:py-28">
        <SectionIntro
          eyebrow="Core values"
          title="The principles behind"
          accent="every campaign"
          body_bn="চারটি মূল মূল্যবোধ যা প্রতিটি প্রজেক্টে আমাদের গাইড করে।"
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CORE_VALUES.map((val, i) => {
            const Icon = val.icon;
            return (
              <Reveal key={val.title_en} delay={i * 70}>
                <div className="card-warm h-full p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-warm-accent/20 to-warm-accent/5 text-warm-accent ring-1 ring-warm-accent/30">
                    <Icon size={22} strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-5 font-serif text-xl tracking-tight text-warm-fg">{val.title_en}</h3>
                  <p className="font-bn text-xs text-warm-muted">{val.title_bn}</p>
                  <p className="mt-3 text-sm leading-7 text-warm-fg">{val.desc_en}</p>
                  <p className="mt-2 font-bn text-xs leading-6 text-warm-muted">{val.desc_bn}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Studio Map */}
      <section className="border-y border-warm-fg/10 bg-warm-accent/5 py-20 sm:py-24">
        <div className="container-x">
          <SectionIntro
            eyebrow="Studio"
            title="Real studio in"
            accent="Hemayetpur, Savar"
            body_bn="হেমায়েতপুর, সাভার, ঢাকা — ১৩৪০। ভিজিটের জন্য আগেই WhatsApp করে অ্যাপয়েন্টমেন্ট নিন।"
          />
          <Reveal delay={120}>
            <div className="mt-10 overflow-hidden rounded-card border border-warm-fg/10 shadow-warm-glow">
              <iframe
                src={mapsSrc}
                title="Creavix Studio location — Hemayetpur, Savar, Dhaka"
                width="100%"
                height="420"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.18em] text-warm-muted">{SITE.address_en}</p>
              <p className="font-bn text-xs text-warm-muted">{SITE.address_bn}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why teams stay */}
      <section className="container-x py-24 sm:py-28">
        <SectionIntro
          eyebrow="Why teams stay · কেন আমাদের সাথে থাকে"
          title="Process discipline backed by"
          accent="real production experience"
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_PILLARS.slice(0, 4).map((pillar, i) => (
            <Reveal key={pillar.title_en} delay={i * 60}>
              <TrustCard pillar={pillar} />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
