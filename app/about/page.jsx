import { CheckCircle2, Quote } from 'lucide-react';
import { SITE, TRUST_PILLARS } from '../../data/site-data';
import Reveal from '../components/Reveal';
import SectionIntro from '../components/SectionIntro';
import TrustCard from '../components/TrustCard';
import CtaBand from '../components/CtaBand';

export const metadata = {
  title: 'About — AI Creative Studio',
  description:
    'Learn how Creavixit combines bilingual communication, AI-assisted production and cinematic direction to build faster brand campaigns.',
  alternates: { canonical: '/about' },
};

const TOUCHPOINTS = [
  'Direct founder oversight on story clarity, visual polish and final delivery readiness.',
  'Bilingual communication that keeps local and global campaigns clear and premium.',
  'Fast access through WhatsApp, email and a real studio presence in Savar, Dhaka.',
  'Decade-long experience across product launches, finance, corporate storytelling and short-form.',
];

const STATS = [
  { value: SITE.servingSince, label: 'Serving since' },
  { value: '10+', label: 'Years of campaign work' },
  { value: '4,300+', label: 'Projects delivered' },
  { value: 'Savar', label: 'Studio presence' },
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-40">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-gold" />
        <div className="container-x">
          <Reveal>
            <span className="eyebrow">About Creavixit · আমাদের গল্প</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 max-w-4xl text-balance font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              A focused studio where <span className="accent">storytelling, performance</span> and AI production work together.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
              Creavixit is a Bangladesh-based AI video marketing studio built for brands that want
              premium output without slow agency drag. Our work blends cinematic direction with
              modern AI workflows so campaigns move faster and feel more confident.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="container-x py-24 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-br from-gold-400/30 to-transparent blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 p-8 sm:p-10">
                <div className="grid h-32 w-32 place-items-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-4xl font-display font-bold text-ink-950">
                  HK
                </div>
                <h3 className="mt-6 font-display text-3xl font-semibold text-white">
                  {SITE.founder.name}
                </h3>
                <p className="mt-1 text-sm text-gold-400">{SITE.founder.role}</p>
                <p className="mt-5 text-sm leading-7 text-zinc-400">
                  Hannan leads creative direction at Creavixit and stays close to every brief from
                  the first message to the final export. The studio&apos;s standard for storytelling,
                  bilingual presentation and brand-safe output starts here.
                </p>
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <Quote size={16} className="mt-1 flex-none text-gold-400" />
                  <p className="text-sm leading-7 text-zinc-300">
                    Brands aren&apos;t just buying video production. They&apos;re choosing who stays close to
                    the brief and remains reachable when timing matters.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="eyebrow">Founder-led direction</span>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
                Closer creative ownership behind <span className="accent">every delivery pass</span>.
              </h2>
              <p className="mt-5 text-base leading-7 text-zinc-400">
                Creavixit is positioned as a founder-led studio, so briefs, revisions and final
                polish stay close to the core decision-makers instead of disappearing into a
                layered agency chain.
              </p>
            </Reveal>

            <ul className="mt-8 space-y-4">
              {TOUCHPOINTS.map((t, i) => (
                <Reveal key={t} delay={i * 60}>
                  <li className="flex gap-3">
                    <CheckCircle2 size={18} className="mt-1 flex-none text-gold-400" />
                    <span className="text-sm leading-7 text-zinc-300">{t}</span>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={200}>
              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {STATS.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="font-display text-2xl font-semibold text-white">
                      <span className="accent">{s.value}</span>
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-500">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHY TEAMS STAY */}
      <section className="border-y border-white/10 bg-ink-900/60 py-24 sm:py-28">
        <div className="container-x">
          <SectionIntro
            eyebrow="Why teams stay"
            title="Process discipline backed by"
            accent="real production experience"
            body="The value isn't only the visual layer — it's the repeatable delivery system behind every campaign."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_PILLARS.slice(0, 4).map((pillar, i) => (
              <Reveal key={pillar.title_en} delay={i * 60}>
                <TrustCard pillar={pillar} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT CLIENTS FEEL */}
      <section className="container-x py-24 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <span className="eyebrow">What clients feel</span>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Clear communication, visible polish and{' '}
              <span className="accent">faster turnaround</span>.
            </h2>
          </Reveal>
          <ul className="space-y-4">
            {[
              'Brand-safe bilingual presentation for local and international-facing campaigns.',
              'Premium interface direction matched to a modern AI-led agency position.',
              'Responsive structure that makes the site easier to browse on mobile.',
              'Separate pages for service depth, trust building and portfolio discovery.',
            ].map((t, i) => (
              <Reveal key={t} delay={i * 50}>
                <li className="glass flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-1 flex-none text-gold-400" />
                  <span className="text-sm leading-7 text-zinc-300">{t}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
