import { CheckCircle2, MessageCircle, Sparkles, Megaphone, Film, Package, Landmark, Wand2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SERVICES, FAQS, SITE, type Service } from '../../lib/site-data';
import HeroSection from '../components/HeroSection';
import Reveal from '../components/Reveal';
import SectionIntro from '../components/SectionIntro';
import VideoThumb from '../components/VideoThumb';
import FAQAccordion from '../components/FAQAccordion';
import CtaBand from '../components/CtaBand';
import ScrollZoom from '../components/ScrollZoom';

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
    images: [{ url: '/share-card.jpg', width: 1200, height: 630, alt: 'Creavix — AI Video Marketing Agency Bangladesh', type: 'image/jpeg' }],
  },
  twitter: {
    title: 'Creavix Services — AI Video Production Bangladesh',
    description: 'AI video ads, product promos & cinematic storytelling for Meta, YouTube & TikTok. 24h delivery.',
    images: ['/share-card.jpg'],
  },
};

const SERVICE_ICONS: Record<Service['icon'], LucideIcon> = {
  Sparkles, Megaphone, Film, Package, Landmark, Wand2,
};

// One representative YouTube ID per service for the alternating preview thumbnail
const SERVICE_VIDEO_IDS: Record<string, string> = {
  'ai-video-ads': 'Tu9qAT9c2Ek',
  'promotional-videos': 'rlY4Ih68DHM',
  'cinematic-storytelling': 'FvWyFDNAAPY',
  'product-brand-ads': 'rQk_sPwkDwU',
  'financial-video-ads': 'Q67-Nq-fPe0',
  'custom-projects': 'sHU3gWcwm4E',
};

// Pricing hint per service slug
const PRICING_HINTS: Record<string, { en: string; bn: string }> = {
  'ai-video-ads': { en: 'Starting from ৳1,200 · 24h delivery', bn: '৳১,২০০ থেকে শুরু · ২৪ ঘণ্টায়' },
  'promotional-videos': { en: 'Starting from ৳1,500 · 48h delivery', bn: '৳১,৫০০ থেকে শুরু · ৪৮ ঘণ্টায়' },
  'cinematic-storytelling': { en: 'Starting from ৳2,000 · 1-min cinematic', bn: '৳২,০০০ থেকে শুরু · ১ মিনিট সিনেম্যাটিক' },
  'product-brand-ads': { en: 'Starting from ৳1,200 · campaign-ready', bn: '৳১,২০০ থেকে শুরু · ক্যাম্পেইন-রেডি' },
  'financial-video-ads': { en: 'Custom pricing · compliance-checked', bn: 'কাস্টম মূল্য · কমপ্লায়েন্স-চেকড' },
  'custom-projects': { en: 'Contact for pricing · scoping call', bn: 'স্কোপিং কলে মূল্য · কাস্টম' },
};

function buildWhatsAppLink(service: Service): string {
  const msg =
    `হ্যালো Creavix! 👋\n\n` +
    `সার্ভিস অর্ডার করতে চাই:\n` +
    `📦 সার্ভিস: ${service.title_bn} (${service.title_en})\n\n` +
    `আরো বিস্তারিত জানতে চাই।`;
  return `${SITE.whatsappLink}?text=${encodeURIComponent(msg)}`;
}

export default function ServicesPage() {
  return (
    <>
      <HeroSection theme="services" watermark="SERVICES">
        <Reveal>
          <span className="eyebrow">Services</span>
        </Reveal>
        <Reveal delay={80}>
          <ScrollZoom className="mt-6">
            <h1 className="max-w-4xl font-serif text-balance text-5xl leading-tight tracking-tight text-on-dark sm:text-6xl lg:text-7xl">
              <span className="font-display text-accent-primary">AI Video Ads</span> and storytelling.
            </h1>
          </ScrollZoom>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Conversion-focused production across Meta, YouTube, and TikTok.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={SITE.whatsappLink} target="_blank" rel="noreferrer" className="btn-3d-primary">
              <MessageCircle size={16} />
              Start a project
            </a>
          </div>
        </Reveal>
      </HeroSection>

      {/* Alternating service sections */}
      <div className="divide-y divide-white/[0.06]">
        {SERVICES.map((service, idx) => {
          const Icon = SERVICE_ICONS[service.icon] ?? Sparkles;
          const videoId = SERVICE_VIDEO_IDS[service.slug];
          const hint = PRICING_HINTS[service.slug];
          const isEven = idx % 2 === 1;

          return (
            <section key={service.slug} id={service.slug} className={`py-24 sm:py-28 ${isEven ? 'bg-ink-800/40' : ''}`}>
              <div className="container-x">
                <div className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                  {/* Text side */}
                  <div className={isEven ? 'lg:col-start-2' : ''}>
                    <Reveal>
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent-primary/30 to-accent-primary/10 text-accent-primary ring-1 ring-accent-primary/30 shadow-[0_4px_16px_-4px_rgba(168,85,247,0.4)]">
                          <Icon size={20} strokeWidth={1.6} />
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-primary">
                          Service {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </Reveal>
                    <Reveal delay={60}>
                      <h2 className="mt-5 font-serif text-3xl leading-tight tracking-tight text-on-dark sm:text-4xl lg:text-5xl">
                        {service.title_en}
                      </h2>
                    </Reveal>
                    <Reveal delay={100}>
                      <p className="mt-5 text-base leading-8 text-muted">{service.desc_en}</p>
                    </Reveal>
                    <Reveal delay={140}>
                      <ul className="mt-7 space-y-2.5">
                        {service.bullets_bn?.map((b: string) => (
                          <li key={b} className="flex items-start gap-3">
                            <CheckCircle2 size={16} className="mt-1 flex-none text-accent-primary" />
                            <span className="text-sm leading-6 text-muted">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                    {hint && (
                      <Reveal delay={180}>
                        <div className="mt-6 flex items-center gap-3 rounded-xl border border-accent-primary/20 bg-accent-primary/[0.06] px-4 py-3">
                          <span className="h-2 w-2 flex-none rounded-full bg-accent-primary" />
                          <p className="text-sm font-medium text-muted">{hint.en}</p>
                        </div>
                      </Reveal>
                    )}
                    <Reveal delay={220}>
                      <div className="mt-7 flex flex-wrap gap-3">
                        <a
                          href={buildWhatsAppLink(service)}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-3d-primary"
                        >
                          <MessageCircle size={16} />
                          Order now
                        </a>
                      </div>
                    </Reveal>
                  </div>

                  {/* Video side */}
                  <div className={isEven ? 'lg:col-start-1' : ''}>
                    <Reveal delay={80}>
                      {videoId ? (
                        <VideoThumb
                          id={videoId}
                          title={service.title_en}
                          priority={idx === 0}
                        />
                      ) : (
                        <div className="aspect-video rounded-card border border-white/10 bg-ink-800 grid place-items-center">
                          <Icon size={48} className="text-accent-primary/30" />
                        </div>
                      )}
                    </Reveal>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* FAQ section */}
      <section className="border-t border-on-dark/10 bg-accent-primary/5 py-24 sm:py-28">
        <div className="container-x">
          <SectionIntro
            eyebrow="FAQ"
            title="Common questions before"
            accent="booking a service"
          />
          <div className="mt-12">
            <FAQAccordion items={FAQS} />
          </div>
          <Reveal delay={120}>
            <div className="mt-10 rounded-card border border-accent-primary/20 bg-gradient-to-br from-accent-primary/[0.08] to-transparent p-6 sm:p-8">
              <p className="text-sm leading-7 text-muted">
                More questions? Ask on WhatsApp — we typically reply within hours.
              </p>
              <a
                href={SITE.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="btn-3d-primary mt-4"
              >
                <MessageCircle size={16} />
                Message on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
