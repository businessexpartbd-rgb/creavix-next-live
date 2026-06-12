import { CheckCircle2, Quote } from 'lucide-react';
import Image from 'next/image';
import { SITE, TRUST_PILLARS } from '../../lib/site-data';
import HeroSection from '../components/HeroSection';
import Reveal from '../components/Reveal';
import SectionIntro from '../components/SectionIntro';
import TrustCard from '../components/TrustCard';
import CtaBand from '../components/CtaBand';
import FacebookLink from '../components/FacebookLink';

export const metadata = {
  title: 'About Creavix — AI Video Studio Bangladesh Since 2014 | Hannan Khan',
  description:
    'Creavix IT Solution — হেমায়েতপুর, সাভার, ঢাকায় অবস্থিত বাংলাদেশের প্রিমিয়াম AI ভিডিও স্টুডিও। ২০১৪ সাল থেকে Hannan Khan-এর নেতৃত্বে ৪,৩০০+ ব্র্যান্ডের সাথে কাজ করেছি।',
  alternates: { canonical: '/about' },
  openGraph: {
    title: "About Creavix — Bangladesh's AI Video Studio Since 2014",
    description:
      'Founded 2014 by Hannan Khan in Savar, Dhaka. 4,300+ projects. Cinematic AI video production with founder-led direction.',
    url: 'https://www.creavixit.com/about',
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
    title: 'About Creavix — AI Video Studio Since 2014',
    description:
      "Founded 2014 by Hannan Khan in Savar, Dhaka. 4,300+ projects. Bangladesh's premier AI video studio.",
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

export default function AboutPage() {
  const mapsSrc = `https://maps.google.com/maps?q=${SITE.geo.lat},${SITE.geo.lng}&z=14&output=embed`;

  return (
    <>
      <HeroSection theme="about" watermark="ABOUT">
        <Reveal>
          <span className="eyebrow">About Creavix · আমাদের গল্প</span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-6 max-w-4xl font-display text-balance text-5xl uppercase leading-[0.92] tracking-[0.04em] text-white sm:text-6xl lg:text-7xl">
            Storytelling, performance & <span className="accent">AI production</span> together.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 max-w-2xl font-bn text-sm leading-7 text-ash-200 sm:text-base">
            Creavix বাংলাদেশের একটি ফোকাসড AI ভিডিও মার্কেটিং স্টুডিও। সিনেম্যাটিক ডিরেকশন ও আধুনিক
            AI ওয়ার্কফ্লো একসাথে — তাই ক্যাম্পেইন দ্রুত গতি পায় ও আত্মবিশ্বাসী লাগে।
          </p>
        </Reveal>
      </HeroSection>

      {/* Team section - Founder & Management */}
      <section className="container-x py-24 sm:py-28">
        <div className="mb-16">
          <Reveal>
            <span className="eyebrow">Leadership · নেতৃত্ব</span>
            <h2 className="mt-5 font-display text-3xl uppercase tracking-[0.04em] text-white sm:text-4xl">
              Meet the <span className="accent">founding team</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Hannan Khan - Founder & CEO */}
          <Reveal>
            <div className="group relative overflow-hidden rounded-card border border-white/10 bg-ink-900/50 p-6 sm:p-8 transition hover:bg-ink-900">
              <div className="absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-br from-brand/20 to-transparent opacity-0 blur-2xl transition group-hover:opacity-100" />
              
              <div className="relative mb-6">
                <div className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-brand/30 to-transparent">
                  <Image
                    src={SITE.founder.image}
                    alt={`${SITE.founder.name} - ${SITE.founder.role_en}`}
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="font-display text-2xl uppercase tracking-[0.04em] text-white">
                    {SITE.founder.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-brand">{SITE.founder.role_en}</p>
                  <p className="font-bn text-xs text-ash-400">{SITE.founder.role_bn}</p>
                </div>

                <p className="font-bn text-sm leading-6 text-ash-200">
                  Hannan এর ২০১৪ সাল থেকে ডিজিটাল মার্কেটিং এবং ভিডিও প্রোডাকশনে ১০+ বছরের অভিজ্ঞতা। 
                  তিনি প্রতিটি প্রজেক্টে সরাসরি ক্রিয়েটিভ ডিরেকশন প্রদান করেন এবং নিশ্চিত করেন যে প্রতিটি ভিডিও ব্র্যান্ড স্ট্যান্ডার্ড পূরণ করে।
                </p>

                <FacebookLink url={SITE.founder.fb_url} label="Follow on Facebook" />
              </div>
            </div>
          </Reveal>

          {/* Sabbir Khan - Management & Operations */}
          <Reveal delay={60}>
            <div className="group relative overflow-hidden rounded-card border border-white/10 bg-ink-900/50 p-6 sm:p-8 transition hover:bg-ink-900">
              <div className="absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-br from-brand/20 to-transparent opacity-0 blur-2xl transition group-hover:opacity-100" />
              
              <div className="relative mb-6">
                <div className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-brand/30 to-transparent">
                  <Image
                    src={SITE.management.image}
                    alt={`${SITE.management.name} - ${SITE.management.role_en}`}
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="font-display text-2xl uppercase tracking-[0.04em] text-white">
                    {SITE.management.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-brand">{SITE.management.role_en}</p>
                  <p className="font-bn text-xs text-ash-400">{SITE.management.role_bn}</p>
                </div>

                <p className="font-bn text-sm leading-6 text-ash-200">
                  Sabbir Creavix-র অপারেশনাল দক্ষতা এবং প্রজেক্ট ম্যানেজমেন্ট পরিচালনা করেন। 
                  তার দায়িত্বে রয়েছে টাইমলি ডেলিভারি, ক্লায়েন্ট কমিউনিকেশন এবং নিশ্চিত করা যে প্রতিটি প্রজেক্ট স্মুথলি এক্সিকিউট হয়।
                </p>

                <FacebookLink url={SITE.management.fb_url} label="Follow on Facebook" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Studio Map */}
      <section className="border-y border-white/10 bg-ink-800/60 py-20 sm:py-24">
        <div className="container-x">
          <SectionIntro
            eyebrow="Studio · স্টুডিও"
            title="Find us in"
            accent="Hemayetpur, Savar"
            body_bn="হেমায়েতপুর, সাভার, ঢাকা — ১৩৪০। ভিজিটের জন্য আগেই WhatsApp করে অ্যাপয়েন্টমেন্ট নিন।"
          />
          <Reveal delay={120}>
            <div className="mt-10 overflow-hidden rounded-card border border-white/10">
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
            <p className="mt-4 text-center text-xs uppercase tracking-[0.18em] text-ash-400">
              {SITE.address_en}
            </p>
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
