import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  Music2,
} from 'lucide-react';
import { SITE, SOCIAL_LINKS } from '../../data/site-data';
import Reveal from '../components/Reveal';
import SectionIntro from '../components/SectionIntro';
import ContactForm from '../components/ContactForm';

const SOCIAL_ICONS = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  x: Twitter,
  tiktok: Music2,
  whatsapp: MessageCircle,
};

export const metadata = {
  title: 'Contact — Start Your Video Marketing Campaign',
  description:
    'Contact Creavixit to plan AI video ads, storytelling campaigns, product promotional videos and custom video marketing projects.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-40">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-gold" />
        <div className="container-x">
          <Reveal>
            <span className="eyebrow">Contact · যোগাযোগ</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 max-w-4xl text-balance font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Start your <span className="accent">video marketing</span> campaign.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
              Choose the fastest route for your brief, budget question or partnership request.
              We typically reply within a few hours during working days.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section className="container-x py-24 sm:py-28">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Channels */}
          <Reveal>
            <div className="space-y-5">
              <a
                href={SITE.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-4 rounded-3xl border border-gold-400/30 bg-gradient-to-br from-gold-400/15 to-transparent p-6 transition hover:border-gold-400/60"
              >
                <span className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-gold-400 text-ink-950">
                  <MessageCircle size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                    Fastest · WhatsApp
                  </p>
                  <p className="mt-1 font-display text-xl font-semibold text-white">{SITE.whatsapp}</p>
                  <p className="mt-2 text-sm text-zinc-400">
                    Tap to message. Best for quick briefs and project starts.
                  </p>
                </div>
              </a>

              <a href={`tel:${SITE.hotline.replace(/[^+0-9]/g, '')}`} className="glass flex items-start gap-4">
                <span className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-white/5 text-gold-400 ring-1 ring-white/10">
                  <Phone size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Hotline</p>
                  <p className="mt-1 font-display text-xl font-semibold text-white">{SITE.hotline}</p>
                  <p className="mt-2 text-sm text-zinc-400">Sat–Thu, 10:00 AM – 8:00 PM (BST)</p>
                </div>
              </a>

              <a href={`mailto:${SITE.email1}`} className="glass flex items-start gap-4">
                <span className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-white/5 text-gold-400 ring-1 ring-white/10">
                  <Mail size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Email</p>
                  <p className="mt-1 font-display text-lg font-semibold text-white">{SITE.email1}</p>
                  <p className="text-sm text-zinc-400">{SITE.email2}</p>
                </div>
              </a>

              <div className="glass flex items-start gap-4">
                <span className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-white/5 text-gold-400 ring-1 ring-white/10">
                  <MapPin size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Studio</p>
                  <p className="mt-1 font-display text-lg font-semibold text-white">
                    {SITE.address_en}
                  </p>
                  <p className="mt-1 font-bn text-sm text-zinc-500">{SITE.address_bn}</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* SOCIAL */}
      <section className="border-y border-white/10 bg-ink-900/60 py-24 sm:py-28">
        <div className="container-x">
          <SectionIntro
            eyebrow="Find us online"
            title="Every major platform mapped to a"
            accent="separate touchpoint"
            body="Each social channel stays distinct, branded and easy to open from both mobile and desktop visitors."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SOCIAL_LINKS.map((s, i) => {
              const Icon = SOCIAL_ICONS[s.key] || MessageCircle;
              return (
                <Reveal key={s.key} delay={i * 50}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="glass group flex items-center gap-4"
                  >
                    <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-white/5 text-gold-400 ring-1 ring-white/10 transition group-hover:bg-gold-400 group-hover:text-ink-950 group-hover:ring-gold-400">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="font-display text-base font-semibold text-white">{s.name}</p>
                      <p className="text-xs text-zinc-500">{s.handle}</p>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
