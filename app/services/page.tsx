import { CheckCircle2 } from 'lucide-react';
import { SERVICES, PROCESS_STEPS } from '../../lib/site-data';

export const metadata = {
  title: 'AI Video Ads, Cinematic Storytelling & Product Videos | Creavix Services',
  description:
    'AI ভিডিও অ্যাড, প্রোডাক্ট প্রমো, ফাইন্যান্সিয়াল ভিডিও ও সিনেম্যাটিক স্টোরিটেলিং। Meta, YouTube, TikTok-এর জন্য ২৪ ঘণ্টায় ডেলিভারি। Creavix Bangladesh।',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Creavix Services — AI Video Ads & Cinematic Production Bangladesh',
    description:
      'AI video ads, product promos, financial campaigns & cinematic storytelling. 24h delivery. Bilingual BD video agency since 2014.',
    url: 'https://www.creavixit.com/services',
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
    title: 'Creavix Services — AI Video Production Bangladesh',
    description:
      'AI video ads, product promos & cinematic storytelling for Meta, YouTube & TikTok. 24h delivery.',
    images: ['/share-card.jpg'],
  },
};
import HeroSection from '../components/HeroSection';
import Reveal from '../components/Reveal';
import SectionIntro from '../components/SectionIntro';
import ServiceCard from '../components/ServiceCard';
import CtaBand from '../components/CtaBand';



const DELIVERY_STANDARDS_BN = [
  'সিনেম্যাটিক ভিজ্যুয়াল ও প্ল্যাটফর্ম-রেডি ফ্রেমিং',
  'দ্রুত রিভিউ লুপ ও পরিষ্কার অ্যাপ্রুভাল চেকপয়েন্ট',
  'বাংলা ও ইংরেজি দুই অডিয়েন্সের জন্য বাইলিঙ্গুয়াল সাপোর্ট',
  'CTA-ফোকাসড স্ক্রিপ্টিং ও স্ট্রাকচার্ড ন্যারেটিভ',
  'সাবটাইটেল, ভয়েস ডিরেকশন ও মোশন গ্রাফিক্স',
  'মেটা / ইউটিউব / টিকটক / ওয়েব — মাল্টি-ফরম্যাট এক্সপোর্ট',
];

export default function ServicesPage() {
  return (
    <>
      <HeroSection theme="services" watermark="SERVICES">
        <Reveal>
          <span className="eyebrow">Services · সার্ভিস</span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-6 max-w-4xl font-display text-balance text-5xl uppercase leading-[0.92] tracking-[0.04em] text-white sm:text-6xl lg:text-7xl">
            <span className="accent">AI Video Ads</span> and storytelling for growth-focused brands.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 max-w-2xl text-base leading-8 text-ash-300 sm:text-lg">
            From launch promos to brand storytelling, each service gives businesses clearer
            messaging, stronger visuals and faster campaign motion across Meta, YouTube and TikTok.
          </p>
          <p className="mt-3 max-w-2xl font-bn text-sm leading-7 text-ash-200">
            লঞ্চ প্রমো থেকে ব্র্যান্ড স্টোরিটেলিং — প্রতিটি সার্ভিস ব্যবসাকে দেয় পরিষ্কার মেসেজিং,
            শক্তিশালী ভিজ্যুয়াল ও দ্রুত ক্যাম্পেইন গতি।
          </p>
        </Reveal>
      </HeroSection>

      {/* Services grid */}
      <section className="container-x py-24 sm:py-28">
        <SectionIntro
          eyebrow="Offer structure · অফার স্ট্রাকচার"
          title="Every service tuned for"
          accent="clarity & response"
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={i * 60}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Delivery standards */}
      <section className="border-y border-white/10 bg-ink-800/60 py-24 sm:py-28">
        <div className="container-x">
          <SectionIntro
            eyebrow="Delivery standard · ডেলিভারি স্ট্যান্ডার্ড"
            title="What comes with the"
            accent="production experience"
          />
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {DELIVERY_STANDARDS_BN.map((item, i) => (
              <Reveal key={item} delay={i * 50}>
                <div className="card-3d flex items-start gap-3 p-5">
                  <CheckCircle2 size={18} className="mt-1 flex-none text-brand" />
                  <span className="font-bn text-sm leading-7 text-ash-200">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container-x py-24 sm:py-28">
        <SectionIntro
          eyebrow="Process · প্রসেস"
          title="A repeatable flow for"
          accent="every campaign"
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.step} delay={i * 70}>
              <div className="card-3d h-full p-6">
                <span className="font-display text-3xl text-brand">{step.step}</span>
                <h3 className="mt-3 font-display text-xl uppercase tracking-[0.04em] text-white">
                  {step.title_en}
                </h3>
                <p className="mt-1 font-bn text-sm text-ash-400">{step.title_bn}</p>
                <p className="mt-3 font-bn text-sm leading-7 text-ash-200">{step.desc_bn}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
