import { Mail, MapPin, MessageCircle, Phone, Zap, Clock } from 'lucide-react';
import { SITE, SOCIAL_LINKS } from '../../lib/site-data';
import HeroSection from '../components/HeroSection';
import Reveal from '../components/Reveal';
import SectionIntro from '../components/SectionIntro';
import ContactForm from '../components/ContactForm';
import { SOCIAL_ICON_MAP } from '../components/SocialIcons';

export const metadata = {
  title: 'Contact Creavix — WhatsApp, Email & Studio Visit | Bangladesh',
  description:
    'Creavix-এ যোগাযোগ করুন: WhatsApp +8801890484355 | Email: info@creavixit.com | স্টুডিও: হেমায়েতপুর, সাভার, ঢাকা। শনি–বৃহঃ সকাল ১০টা – রাত ৮টা।',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Creavix | Bangladesh AI Video Agency',
    description: 'Get in touch: WhatsApp +8801890484355 or email info@creavixit.com. Studio in Hemayetpur, Savar, Dhaka.',
    url: 'https://www.creavixit.com/contact',
    images: [{ url: '/share-card.jpg', width: 1200, height: 630, alt: 'Creavix — AI Video Marketing Agency Bangladesh', type: 'image/jpeg' }],
  },
  twitter: {
    title: 'Contact Creavix — AI Video Agency Bangladesh',
    description: 'WhatsApp +8801890484355 | info@creavixit.com | Hemayetpur, Savar, Dhaka.',
    images: ['/share-card.jpg'],
  },
};

const mapsSrc = `https://maps.google.com/maps?q=${SITE.geo.lat},${SITE.geo.lng}&z=14&output=embed`;

export default function ContactPage() {
  return (
    <>
      <HeroSection theme="contact" watermark="CONTACT">
        <Reveal>
          <span className="eyebrow">Contact · যোগাযোগ</span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-6 max-w-4xl font-serif text-balance text-5xl leading-tight tracking-tight text-warm-fg sm:text-6xl lg:text-7xl">
            Start your <span className="font-display text-warm-accent">video marketing</span> campaign.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 max-w-2xl font-bn text-sm leading-7 text-warm-muted sm:text-base">
            ব্রিফ, বাজেট বা পার্টনারশিপ — সবচেয়ে দ্রুত পথ বেছে নিন। সাধারণত কয়েক ঘণ্টায় উত্তর দিই।
          </p>
        </Reveal>
        <Reveal delay={220}>
          {/* Response time badge */}
          <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-warm-accent/30 bg-warm-accent/[0.08] px-4 py-2">
            <Zap size={14} className="text-warm-accent" />
            <span className="text-sm font-medium text-warm-muted00">
              Usually responds within 1 hour
            </span>
            <span className="font-bn text-xs text-warm-muted00">· সাধারণত ১ ঘণ্টায় উত্তর দিই</span>
          </div>
        </Reveal>
      </HeroSection>

      {/* Channels + form */}
      <section className="container-x py-24 sm:py-28">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="space-y-4">
              {/* WhatsApp card — primary */}
              <a
                href={SITE.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-4 rounded-card border border-warm-accent/30 bg-gradient-to-br from-warm-accent/12 via-white/[0.04] to-transparent p-6 transition hover:border-warm-accent/60 hover:shadow-glow"
              >
                <span className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-warm-accent text-warm-fg shadow-glow">
                  <MessageCircle size={20} />
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs uppercase tracking-[0.18em] text-warm-muted00">Fastest · WhatsApp</p>
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-400">
                      Online
                    </span>
                  </div>
                  <p className="mt-1 font-display text-xl uppercase tracking-wide text-warm-fg">
                    {SITE.whatsapp}
                  </p>
                  <p className="mt-2 font-bn text-sm text-warm-muted00">
                    ট্যাপ করে মেসেজ দিন। দ্রুত ব্রিফ ও প্রজেক্ট স্টার্টের জন্য বেস্ট।
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${SITE.hotline.replace(/[^+0-9]/g, '')}`}
                className="card-warm flex items-start gap-4 p-5"
              >
                <span className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-white/5 text-warm-accent ring-1 ring-white/10">
                  <Phone size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-warm-muted00">Hotline</p>
                  <p className="mt-1 font-display text-xl uppercase tracking-wide text-warm-fg">{SITE.hotline}</p>
                  <p className="mt-1 font-bn text-sm text-warm-muted00">শনি – বৃহঃ · সকাল ১০টা – রাত ৮টা</p>
                </div>
              </a>

              {/* Email */}
              <a href={`mailto:${SITE.email1}`} className="card-warm flex items-start gap-4 p-5">
                <span className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-white/5 text-warm-accent ring-1 ring-white/10">
                  <Mail size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-warm-muted00">Email</p>
                  <p className="mt-1 font-display text-lg uppercase tracking-wide text-warm-fg">{SITE.email1}</p>
                  <p className="text-sm text-warm-muted00">{SITE.email2}</p>
                </div>
              </a>

              {/* Address */}
              <div className="card-warm flex items-start gap-4 p-5">
                <span className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-white/5 text-warm-accent ring-1 ring-white/10">
                  <MapPin size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-warm-muted00">Studio</p>
                  <p className="mt-1 font-display text-lg uppercase tracking-wide text-warm-fg">{SITE.address_en}</p>
                  <p className="mt-1 font-bn text-sm text-warm-muted00">{SITE.address_bn}</p>
                </div>
              </div>

              {/* Studio hours */}
              <div className="rounded-card border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={14} className="text-warm-accent" />
                  <p className="text-xs uppercase tracking-[0.18em] text-warm-muted00">Studio Hours</p>
                </div>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-warm-muted00">Sat – Thu</span>
                    <span className="text-warm-muted00">10:00 AM – 8:00 PM</span>
                  </div>
                  <div className="flex justify-between font-bn text-xs">
                    <span className="text-warm-muted00">শনি – বৃহঃ</span>
                    <span className="text-warm-muted00">সকাল ১০টা – রাত ৮টা</span>
                  </div>
                  <div className="flex justify-between pt-1 text-xs text-warm-muted00">
                    <span>Friday</span>
                    <span className="text-warm-muted00">Closed · বন্ধ</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Map embed */}
      <section className="border-y border-white/10 bg-ink-800/60 py-20 sm:py-24">
        <div className="container-x">
          <SectionIntro
            eyebrow="Location · অবস্থান"
            title="Find the studio in"
            accent="Hemayetpur, Savar"
            body_bn="সাভারে আমাদের বাস্তব স্টুডিও। ভিজিটের জন্য আগেই WhatsApp করে অ্যাপয়েন্টমেন্ট নিন।"
          />
          <Reveal delay={120}>
            <div className="mt-10 overflow-hidden rounded-card border border-white/10 shadow-deep">
              <iframe
                src={mapsSrc}
                title="Creavix Studio location — Hemayetpur, Savar, Dhaka"
                width="100%"
                height="380"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <p className="mt-4 text-center text-xs uppercase tracking-[0.18em] text-warm-muted00">
              {SITE.address_en}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Social */}
      <section className="container-x py-24 sm:py-28">
        <SectionIntro
          eyebrow="Find us online · অনলাইনে"
          title="Every major platform mapped to a"
          accent="separate touchpoint"
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SOCIAL_LINKS.map((s, i) => {
            const Icon = SOCIAL_ICON_MAP[s.key];
            if (!Icon) return null;
            return (
              <Reveal key={s.key} delay={i * 50}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className="card-warm group flex items-center gap-4 p-5"
                >
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-white/5 text-warm-accent ring-1 ring-white/10 transition group-hover:bg-warm-accent group-hover:text-warm-fg group-hover:ring-warm-accent">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-display text-base uppercase tracking-wide text-warm-fg">{s.name}</p>
                    <p className="text-xs text-warm-muted00">{s.handle}</p>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
