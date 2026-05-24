import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
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
    description:
      'Get in touch: WhatsApp +8801890484355 or email info@creavixit.com. Studio in Hemayetpur, Savar, Dhaka. Sat–Thu 10AM–8PM.',
    url: 'https://www.creavixit.com/contact',
  },
  twitter: {
    title: 'Contact Creavix — AI Video Agency Bangladesh',
    description:
      'WhatsApp +8801890484355 | info@creavixit.com | Hemayetpur, Savar, Dhaka.',
  },
};

export default function ContactPage() {
  return (
    <>
      <HeroSection theme="contact" watermark="CONTACT">
        <Reveal>
          <span className="eyebrow">Contact · যোগাযোগ</span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-6 max-w-4xl font-display text-balance text-5xl uppercase leading-[0.92] tracking-[0.04em] text-white sm:text-6xl lg:text-7xl">
            Start your <span className="accent">video marketing</span> campaign.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 max-w-2xl font-bn text-sm leading-7 text-ash-200 sm:text-base">
            ব্রিফ, বাজেট বা পার্টনারশিপ — সবচেয়ে দ্রুত পথ বেছে নিন। সাধারণত কয়েক ঘণ্টায় উত্তর দিই।
          </p>
        </Reveal>
      </HeroSection>

      {/* Channels + form */}
      <section className="container-x py-24 sm:py-28">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="space-y-5">
              <a
                href={SITE.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-4 rounded-card border border-brand/30 bg-gradient-to-br from-brand/15 to-transparent p-6 transition hover:border-brand/60"
              >
                <span className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-brand text-white">
                  <MessageCircle size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-ash-300">Fastest · WhatsApp</p>
                  <p className="mt-1 font-display text-xl uppercase tracking-wide text-white">
                    {SITE.whatsapp}
                  </p>
                  <p className="mt-2 font-bn text-sm text-ash-300">
                    ট্যাপ করে মেসেজ দিন। দ্রুত ব্রিফ ও প্রজেক্ট স্টার্টের জন্য বেস্ট।
                  </p>
                </div>
              </a>

              <a
                href={`tel:${SITE.hotline.replace(/[^+0-9]/g, '')}`}
                className="card-3d flex items-start gap-4 p-6"
              >
                <span className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-white/5 text-brand ring-1 ring-white/10">
                  <Phone size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-ash-300">Hotline</p>
                  <p className="mt-1 font-display text-xl uppercase tracking-wide text-white">
                    {SITE.hotline}
                  </p>
                  <p className="mt-2 font-bn text-sm text-ash-400">শনি – বৃহঃ · সকাল ১০টা – রাত ৮টা</p>
                </div>
              </a>

              <a href={`mailto:${SITE.email1}`} className="card-3d flex items-start gap-4 p-6">
                <span className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-white/5 text-brand ring-1 ring-white/10">
                  <Mail size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-ash-300">Email</p>
                  <p className="mt-1 font-display text-lg uppercase tracking-wide text-white">
                    {SITE.email1}
                  </p>
                  <p className="text-sm text-ash-300">{SITE.email2}</p>
                </div>
              </a>

              <div className="card-3d flex items-start gap-4 p-6">
                <span className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-white/5 text-brand ring-1 ring-white/10">
                  <MapPin size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-ash-300">Studio</p>
                  <p className="mt-1 font-display text-lg uppercase tracking-wide text-white">
                    {SITE.address_en}
                  </p>
                  <p className="mt-1 font-bn text-sm text-ash-400">{SITE.address_bn}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Social */}
      <section className="border-y border-white/10 bg-ink-800/60 py-24 sm:py-28">
        <div className="container-x">
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
                    className="card-3d group flex items-center gap-4 p-5"
                  >
                    <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-white/5 text-brand ring-1 ring-white/10 transition group-hover:bg-brand group-hover:text-white group-hover:ring-brand">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-display text-base uppercase tracking-wide text-white">
                        {s.name}
                      </p>
                      <p className="text-xs text-ash-400">{s.handle}</p>
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
