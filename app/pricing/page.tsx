import Link from 'next/link';
import { Check, Minus, Sparkles } from 'lucide-react';
import { FAQS, PRICING, SITE } from '../../lib/site-data';
import HeroSection from '../components/HeroSection';
import Reveal from '../components/Reveal';
import SectionIntro from '../components/SectionIntro';
import PricingCard from '../components/PricingCard';
import FAQAccordion from '../components/FAQAccordion';
import CtaBand from '../components/CtaBand';

export const metadata = {
  title: 'AI Video Ad Pricing Bangladesh — Storytelling & Product Video Packages | Creavix',
  description:
    'সাশ্রয়ী দামে প্রিমিয়াম AI ভিডিও — ১,২০০ টাকা থেকে। ৫০% ডিসকাউন্ট চলছে। স্টোরিটেলিং, প্রোডাক্ট ভিডিও ও কাস্টম প্যাকেজ। Creavix Bangladesh।',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Creavix Pricing — Affordable AI Video Packages Bangladesh',
    description: 'AI video ad packages from BDT 1,200. 50% discount running. Transparent pricing, 24h delivery.',
    url: 'https://www.creavixit.com/pricing',
    images: [{ url: '/share-card.jpg', width: 1200, height: 630, alt: 'Creavix — AI Video Marketing Agency Bangladesh', type: 'image/jpeg' }],
  },
  twitter: {
    title: 'Creavix Pricing — AI Video Ad Packages BD',
    description: 'AI video packages from BDT 1,200. 50% discount. Storytelling & Product plans.',
    images: ['/share-card.jpg'],
  },
};

// Comparison table rows — feature presence per plan tier
// storytelling: Modern, Premium, Pro
const STORY_COMPARE_ROWS = [
  { feature_en: 'Duration', feature_bn: 'সময়কাল', tiers: ['1 min', '1 min', '1 min'] },
  { feature_en: 'Cinematic visuals', feature_bn: 'সিনেম্যাটিক ভিজ্যুয়াল', tiers: [true, true, true] },
  { feature_en: 'Hook-first script', feature_bn: 'হুক-ফার্স্ট স্ক্রিপ্ট', tiers: [true, true, true] },
  { feature_en: 'BN/EN voiceover', feature_bn: 'বাংলা/ইংরেজি ভয়েসওভার', tiers: [true, true, true] },
  { feature_en: 'Mood board', feature_bn: 'মুড বোর্ড', tiers: [false, true, true] },
  { feature_en: 'Multi-format export', feature_bn: 'মাল্টি-ফরম্যাট এক্সপোর্ট', tiers: [false, true, true] },
  { feature_en: 'Custom sound design', feature_bn: 'কাস্টম সাউন্ড ডিজাইন', tiers: [false, false, true] },
  { feature_en: 'Editable master file', feature_bn: 'এডিটেবল মাস্টার ফাইল', tiers: [false, false, true] },
  { feature_en: 'Revisions', feature_bn: 'রিভিশন', tiers: ['2', '3', '4'] },
  { feature_en: 'Priority delivery', feature_bn: 'প্রায়োরিটি ডেলিভারি', tiers: [false, true, true] },
  { feature_en: 'Founder-led direction', feature_bn: 'ফাউন্ডার-লেড ডিরেকশন', tiers: [false, false, true] },
];

// product: Basic, Standard, Pro
const PRODUCT_COMPARE_ROWS = [
  { feature_en: 'Product hero shot', feature_bn: 'প্রোডাক্ট হিরো শট', tiers: [true, true, true] },
  { feature_en: 'Aspect ratios', feature_bn: 'আসপেক্ট রেশিও', tiers: ['1', '2', '3+'] },
  { feature_en: 'Licensed music', feature_bn: 'লাইসেন্সড মিউজিক', tiers: [true, true, true] },
  { feature_en: 'Custom voiceover', feature_bn: 'কাস্টম ভয়েসওভার', tiers: [false, true, true] },
  { feature_en: 'A/B hook variations', feature_bn: 'A/B হুক ভ্যারিয়েশন', tiers: [false, true, true] },
  { feature_en: 'Sound design', feature_bn: 'সাউন্ড ডিজাইন', tiers: [false, false, true] },
  { feature_en: 'Campaign-ready pack', feature_bn: 'ক্যাম্পেইন-রেডি প্যাক', tiers: [false, false, true] },
  { feature_en: 'Revisions', feature_bn: 'রিভিশন', tiers: ['2', '3', '4'] },
];

type CellValue = boolean | string;

function CellIcon({ value, isHighlight }: { value: CellValue; isHighlight: boolean }) {
  if (value === true) {
    return <Check size={16} className={isHighlight ? 'text-brand' : 'text-emerald-400'} />;
  }
  if (value === false) {
    return <Minus size={14} className="text-ash-500" />;
  }
  return (
    <span className={`text-sm font-semibold ${isHighlight ? 'text-brand' : 'text-ash-200'}`}>
      {value}
    </span>
  );
}

interface CompareRow {
  feature_en: string;
  feature_bn: string;
  tiers: CellValue[];
}

function ComparisonTable({
  rows,
  planNames,
  highlightIndex,
}: {
  rows: CompareRow[];
  planNames: string[];
  highlightIndex: number;
}) {
  return (
    <div className="mt-10 overflow-x-auto rounded-card border border-white/10">
      <table className="w-full min-w-[540px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-ink-800">
            <th className="p-4 text-left text-xs uppercase tracking-[0.18em] text-ash-400 w-[40%]">
              Feature
            </th>
            {planNames.map((name, i) => (
              <th
                key={name}
                className={`p-4 text-center text-xs uppercase tracking-[0.18em] ${
                  i === highlightIndex ? 'text-brand' : 'text-ash-300'
                }`}
              >
                {name}
                {i === highlightIndex && (
                  <span className="ml-1.5 inline-flex items-center gap-0.5 rounded-full bg-brand/20 px-1.5 py-0.5 text-[9px] text-brand">
                    <Sparkles size={8} />
                    Popular
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={row.feature_en}
              className={`border-b border-white/[0.06] ${rowIdx % 2 === 0 ? 'bg-ink-900' : 'bg-ink-800/50'}`}
            >
              <td className="p-4">
                <span className="font-medium text-ash-200">{row.feature_en}</span>
                <span className="ml-2 font-bn text-xs text-ash-500">{row.feature_bn}</span>
              </td>
              {row.tiers.map((val, i) => (
                <td key={i} className={`p-4 text-center ${i === highlightIndex ? 'bg-brand/[0.04]' : ''}`}>
                  <div className="flex justify-center">
                    <CellIcon value={val} isHighlight={i === highlightIndex} />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PricingPage() {
  return (
    <>
      <HeroSection theme="pricing" watermark="PRICING">
        <Reveal>
          <span className="eyebrow">
            <Sparkles size={12} className="text-brand" /> 50% OFF · ছাড় চলছে
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-6 max-w-4xl font-serif text-balance text-5xl leading-tight tracking-tight text-warm-fg sm:text-6xl lg:text-7xl">
            Flexible packages for <span className="font-display text-warm-accent">every campaign stage.</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 max-w-2xl font-bn text-sm leading-7 text-warm-muted sm:text-base">
            স্টোরি টেলিং ভিডিও ১ মিনিট, এবং প্রোডাক্ট ভিডিও — দুই ক্যাটাগরিতেই ৫০% ছাড়ে। অর্ডার করতে যেকোনো প্যাকেজে ট্যাপ করুন।
          </p>
        </Reveal>
      </HeroSection>

      {/* Categories */}
      <div className="container-x py-24 sm:py-28 space-y-28">
        {PRICING.map((cat, idx) => {
          const isStory = cat.slug === 'storytelling';
          const compareRows = isStory ? STORY_COMPARE_ROWS : PRODUCT_COMPARE_ROWS;
          const planNames = cat.plans.map((p) => p.name_en);
          const highlightIdx = cat.plans.findIndex((p) => p.highlight);

          return (
            <section key={cat.slug}>
              <SectionIntro
                eyebrow={`${cat.title_en} · ${cat.title_bn}`}
                title={cat.title_en}
                accent="Packages"
                body_bn={cat.blurb_bn}
              />
              <div className="mt-14 grid gap-6 lg:grid-cols-3">
                {cat.plans.map((plan, i) => (
                  <Reveal key={plan.name_en} delay={i * 80}>
                    <PricingCard plan={plan} category_bn={cat.title_bn} />
                  </Reveal>
                ))}
              </div>

              {/* Comparison table */}
              <Reveal delay={120}>
                <div className="mt-8">
                  <p className="text-xs uppercase tracking-[0.18em] text-ash-400">
                    Full comparison · বিস্তারিত তুলনা
                  </p>
                  <ComparisonTable
                    rows={compareRows}
                    planNames={planNames}
                    highlightIndex={highlightIdx >= 0 ? highlightIdx : 1}
                  />
                </div>
              </Reveal>
            </section>
          );
        })}

        <Reveal delay={240}>
          <p className="text-center text-xs uppercase tracking-[0.18em] text-ash-400">
            Custom industry packages available · বাংলা & English supported · Money-back guarantee on agreed scope
          </p>
        </Reveal>
      </div>

      {/* FAQ */}
      <section className="border-y border-white/10 bg-ink-800/60 py-24 sm:py-28">
        <div className="container-x">
          <SectionIntro
            eyebrow="FAQ · প্রশ্নোত্তর"
            title="Questions before"
            accent="booking"
            body_bn="বাজেট ও টাইমলাইন আলোচনায় সাহায্য করতে সবচেয়ে কমন প্রশ্নগুলো।"
          />
          <div className="mt-12">
            <FAQAccordion items={FAQS} />
          </div>
          <Reveal delay={160}>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-card border border-brand/20 bg-gradient-to-br from-brand/[0.07] to-transparent p-6">
                <p className="text-sm font-semibold text-ash-200">Not sure which plan fits?</p>
                <p className="mt-1 font-bn text-xs text-ash-400">সঠিক প্যাকেজ নিয়ে নিশ্চিত না হলে — WhatsApp করুন।</p>
                <a href={SITE.whatsappLink} target="_blank" rel="noreferrer" className="btn-3d-primary mt-4 text-sm">
                  WhatsApp করুন
                </a>
              </div>
              <div className="rounded-card border border-white/10 bg-white/[0.03] p-6">
                <p className="text-sm font-semibold text-ash-200">Custom project?</p>
                <p className="mt-1 font-bn text-xs text-ash-400">বড় বা ইন্ডাস্ট্রি-স্পেসিফিক প্রজেক্টের জন্য আলাদা কোট নি��।</p>
                <Link href="/contact" className="btn-3d-secondary mt-4 text-sm">
                  Get a custom quote
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />

      <section className="container-x pb-24">
        <Reveal>
          <p className="text-center text-sm text-ash-400">
            Not sure which plan fits?{' '}
            <Link href="/contact" className="font-semibold text-brand hover:text-brand-secondary">
              Tell us about your project
            </Link>{' '}
            — সাহায্য করব। অথবা সরাসরি{' '}
            <a href={SITE.whatsappLink} target="_blank" rel="noreferrer" className="font-semibold text-brand hover:text-brand-secondary">
              WhatsApp
            </a>
            -এ মেসেজ দিন।
          </p>
        </Reveal>
      </section>
    </>
  );
}
