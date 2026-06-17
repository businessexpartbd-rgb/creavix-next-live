import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import { NAV_LINKS, SITE, SOCIAL_LINKS } from '../../lib/site-data';
import { SOCIAL_ICON_MAP } from './SocialIcons';
import SubscribeButton from './SubscribeButton';

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-warm-fg/10 bg-gradient-to-r from-warm-muted/80 to-warm-fg/80 text-warm-bg">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="relative grid h-12 w-12 flex-none place-items-center overflow-hidden rounded-xl bg-warm-fg/10 ring-1 ring-warm-fg/20">
              <Image
                src="/new-logo.png"
                alt={`${SITE.name} logo`}
                width={96}
                height={96}
                sizes="48px"
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-display text-2xl tracking-[0.18em] text-warm-bg">
                CREAVIX
              </span>
              <span className="text-[10px] uppercase tracking-[0.32em] text-warm-bg/80">
                IT SOLUTION
              </span>
            </div>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-warm-bg/80">{SITE.shortDesc}</p>
          <p className="mt-3 max-w-md font-bn text-sm leading-7 text-warm-bg/90">
            বাংলাদেশের প্রিমিয়াম এআই ভিডিও মার্কেটিং স্টুডিও। সিনেম্যাটিক স্টোরিটেলিং, প্রোডাক্ট অ্যাড ও বাইলিঙ্গুয়াল ক্যাম্পেইন।
          </p>

          {/* Social — pure SVG icons, no labels */}
          <div className="mt-6 flex flex-wrap gap-2">
            {SOCIAL_LINKS.map((s) => {
              const Icon = SOCIAL_ICON_MAP[s.key];
              if (!Icon) return null;
              return (
                <a
                  key={s.key}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${SITE.name} on ${s.name}`}
                  title={s.name}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-warm-muted00 transition hover:border-warm-accent/60 hover:bg-warm-accent hover:text-warm-fg"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-warm-muted00">
            Explore
          </h4>
          <ul className="mt-5 space-y-3 text-sm text-warm-muted00">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-warm-accent">
                  {link.label_en}
                  <span className="ml-2 font-bn text-xs text-warm-muted00">{link.label_bn}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-warm-muted00">
            Contact
          </h4>
          <ul className="mt-5 space-y-4 text-sm text-warm-muted00">
            <li className="flex items-start gap-3">
              <Phone size={16} className="mt-0.5 flex-none text-warm-accent" />
              <a href={`tel:${SITE.hotline.replace(/[^+0-9]/g, '')}`} className="hover:text-warm-fg">
                {SITE.hotline}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MessageCircle size={16} className="mt-0.5 flex-none text-warm-accent" />
              <a href={SITE.whatsappLink} target="_blank" rel="noreferrer" className="hover:text-warm-fg">
                WhatsApp · {SITE.whatsapp}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={16} className="mt-0.5 flex-none text-warm-accent" />
              <a href={`mailto:${SITE.email1}`} className="hover:text-warm-fg">
                {SITE.email1}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 flex-none text-warm-accent" />
              <span>
                {SITE.address_en}
                <br />
                <span className="font-bn text-warm-muted00">{SITE.address_bn}</span>
              </span>
            </li>
          </ul>
        </div>

        {/* Subscribe + Hours */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-warm-muted00">
            Studio Hours
          </h4>
          <ul className="mt-5 space-y-2 text-sm text-warm-muted00">
            <li>Sat – Thu · 10:00 AM – 8:00 PM</li>
            <li className="font-bn text-warm-muted00">শনি – বৃহঃ · সকাল ১০টা – রাত ৮টা</li>
            <li className="text-warm-muted00">Friday closed · শুক্রবার বন্ধ</li>
          </ul>

          <h4 className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-warm-muted00">
            Subscribe
          </h4>
          <p className="mt-3 text-xs leading-5 text-warm-muted00">
            নতুন অফার, প্যাকেজ ও ভিডিও আপডেট পেতে সাবস্ক্রাইব করুন।
          </p>
          <SubscribeButton>Subscribe — সাবস্ক্রাইব</SubscribeButton>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-warm-muted00 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {SITE.brand}. All rights reserved.
          </p>
          <p className="font-bn">
            Founded by {SITE.founder.name} · ২০১৪ থেকে সেবায়
          </p>
        </div>
      </div>
    </footer>
  );
}
