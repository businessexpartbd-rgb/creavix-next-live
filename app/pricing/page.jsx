import Link from 'next/link';
import { Check, Sparkles } from 'lucide-react';
import { FAQS, PRICING_PLANS, SITE } from '../../data/site-data';
import Reveal from '../components/Reveal';
import SectionIntro from '../components/SectionIntro';
import CtaBand from '../components/CtaBand';

export const metadata = {
  title: 'Pricing for AI Video Campaigns',
  description:
    'Compare Creavixit pricing paths for launch, growth and signature AI video campaigns. Transparent packages and FAQ support.',
  alternates: { canonical: '/pricing' },
};

export default function PricingPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-40">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-gold" />
        <div className="container-x">
          <Reveal>
            <span className="eyebrow">Pricing · প্রাইসিং</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 max-w-4xl text-balance font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Flexible packages for <span className="accent">different campaign stages</span>.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
              Compare launch, growth and premium campaign formats with clear scope and price
              direction. All packages are tailored after a quick discovery call.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PLANS */}
      <section className="container-x py-24 sm:py-28">
        <div className="grid gap-6 lg:grid-cols-3">
          {PRICING_PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 80}>
              <article
                className={`relative flex h-full flex-col rounded-3xl border p-8 transition ${
                  plan.highlight
                    ? 'border-gold-400/40 bg-gradient-to-br from-gold-400/10 via-white/[0.04] to-transparent shadow-glow'
                    : 'border-white/10 bg-white/[0.03]'
                }`}
              >
                {plan.highlight ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-400 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-950">
                    <Sparkles size={11} className="mr-1 inline" />
                    Most popular
                  </span>
                ) : null}
                <h3 className="font-display text-2xl font-semibold text-white">{plan.name}</h3>
                <p className="mt-1 text-sm text-zinc-400">{plan.subtitle}</p>
                <div className="mt-6 font-display text-3xl font-semibold">
                  <span className="accent">{plan.price}</span>
                </div>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm leading-7 text-zinc-300">
                      <Check size={16} className="mt-1 flex-none text-gold-400" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <a
                    href={SITE.whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className={plan.highlight ? 'btn-primary w-full' : 'btn-secondary w-full'}
                  >
                    Discuss this plan
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={240}>
          <p className="mt-10 text-center text-xs uppercase tracking-[0.18em] text-zinc-500">
            Custom industry packages available · Bangla & English supported · Money-back guarantee on agreed scope
          </p>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="border-y border-white/10 bg-ink-900/60 py-24 sm:py-28">
        <div className="container-x">
          <SectionIntro
            eyebrow="FAQ · প্রশ্নোত্তর"
            title="Questions clients usually ask before"
            accent="booking"
            body="The most common questions are answered here so budget and timeline conversations can move faster."
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {FAQS.map((item, i) => (
              <Reveal key={item.q} delay={i * 60}>
                <details className="glass group cursor-pointer">
                  <summary className="flex items-center justify-between gap-4 list-none">
                    <h3 className="font-display text-lg font-semibold text-white">{item.q}</h3>
                    <span className="grid h-8 w-8 flex-none place-items-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition group-open:rotate-45 group-open:border-gold-400/40 group-open:text-gold-400">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-zinc-400">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />

      {/* Compact extra link */}
      <section className="container-x pb-24">
        <Reveal>
          <p className="text-center text-sm text-zinc-500">
            Not sure which plan fits?{' '}
            <Link href="/contact" className="font-semibold text-gold-400 hover:text-gold-500">
              Tell us about your project
            </Link>{' '}
            and we&apos;ll suggest the right path.
          </p>
        </Reveal>
      </section>
    </>
  );
}
