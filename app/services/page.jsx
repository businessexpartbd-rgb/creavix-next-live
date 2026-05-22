import { CheckCircle2 } from 'lucide-react';
import { SERVICES, PROCESS } from '../../data/site-data';
import Reveal from '../components/Reveal';
import SectionIntro from '../components/SectionIntro';
import ServiceCard from '../components/ServiceCard';
import CtaBand from '../components/CtaBand';

export const metadata = {
  title: 'AI Video Ads & Storytelling Services',
  description:
    'Explore Creavixit services for AI video ads, cinematic storytelling, product promotional videos, financial video campaigns and bilingual Bangla-English brand production.',
  alternates: { canonical: '/services' },
};

const DELIVERY_STANDARDS = [
  'Cinematic visual treatment and platform-ready framing.',
  'Fast review loop with clear approval checkpoints.',
  'Bilingual creative support for Bangla and English audiences.',
  'CTA-focused scripting and structured narrative pacing.',
  'Subtitles, voice direction and motion design baked in.',
  'Multi-format exports for Meta, YouTube, TikTok and web.',
];

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-40">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-gold" />
        <div className="container-x">
          <Reveal>
            <span className="eyebrow">Services · সার্ভিস</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 max-w-4xl text-balance font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              <span className="accent">AI video ads</span> and storytelling services for growth-focused brands.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
              From launch promos to brand storytelling, each service gives businesses clearer
              messaging, stronger visuals and faster campaign motion across Meta, YouTube and TikTok.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="container-x py-24 sm:py-28">
        <SectionIntro
          eyebrow="Offer structure"
          title="Every service tuned for"
          accent="clarity and response"
          body="Each format is structured around a clear creative goal — discovery, conversion or trust-building."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={i * 60}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* DELIVERY STANDARDS */}
      <section className="border-y border-white/10 bg-ink-900/60 py-24 sm:py-28">
        <div className="container-x">
          <SectionIntro
            eyebrow="Delivery standard"
            title="What comes with the"
            accent="production experience"
            body="The production standard stays consistent across planning, scripting, revisions and final delivery."
          />
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {DELIVERY_STANDARDS.map((item, i) => (
              <Reveal key={item} delay={i * 50}>
                <div className="glass flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-1 flex-none text-gold-400" />
                  <span className="text-sm leading-7 text-zinc-300">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="container-x py-24 sm:py-28">
        <SectionIntro
          eyebrow="Process"
          title="A repeatable production flow for"
          accent="every campaign"
          body="From the first brief to platform-ready exports, every project follows a clear, transparent path."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step, i) => (
            <Reveal key={step.step} delay={i * 70}>
              <div className="glass h-full">
                <span className="font-display text-3xl font-bold text-gold-400">{step.step}</span>
                <h3 className="mt-3 font-display text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
