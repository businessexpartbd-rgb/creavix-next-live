import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { FAQS, PRICING, SITE } from '../../lib/site-data';
import HeroSection from '../components/HeroSection';
import Reveal from '../components/Reveal';
import SectionIntro from '../components/SectionIntro';
import PricingCard from '../components/PricingCard';
import FAQAccordion from '../components/FAQAccordion';
import CtaBand from '../components/CtaBand';



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
          <h1 className="mt-6 max-w-4xl font-display text-balance text-5xl uppercase leading-[0.92] tracking-[0.04em] text-white sm:text-6xl lg:text-7xl">
            Flexible packages for <span className="accent">every campaign stage.</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 max-w-2xl font-bn text-sm leading-7 text-ash-200 sm:text-base">
            স্টোরি টেলিং ভিডিও ১ মিনিট, এবং প্রোডাক্ট ভিডিও — দুই ক্যাটাগরিতেই ৫০% ছাড়ে।
            অর্ডার করতে যেকোনো প্যাকেজে ট্যাপ করুন।
          </p>
        </Reveal>
      </HeroSection>

      {/* Categories */}
      <div className="container-x py-24 sm:py-28">
        {PRICING.map((cat, idx) => (
          <section key={cat.slug} className={idx === 0 ? '' : 'mt-24'}>
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
          </section>
        ))}

        <Reveal delay={240}>
          <p className="mt-12 text-center text-xs uppercase tracking-[0.18em] text-ash-400">
            Custom industry packages available · বাংলা & English supported · Money-back guarantee on
            agreed scope
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
            <a
              href={SITE.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-brand hover:text-brand-secondary"
            >
              WhatsApp
            </a>
            -এ মেসেজ দিন।
          </p>
        </Reveal>
      </section>
    </>
  );
}
