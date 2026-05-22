import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import { NAV_LINKS, SITE, SOCIAL_LINKS } from '../../data/site-data';

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-ink-900">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-white/0 ring-1 ring-white/10 shadow-glow">
              <Image
                src="/logo.png"
                alt={`${SITE.name} logo`}
                width={500}
                height={500}
                className="h-full w-full object-contain"
              />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-display text-xl font-semibold text-white">{SITE.name}</span>
              <span className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                AI Video Marketing Agency
              </span>
            </div>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-zinc-400">
            {SITE.shortDesc}
          </p>
          <p className="mt-4 font-bn text-sm text-zinc-500">
            বাংলাদেশের প্রিমিয়াম এআই ভিডিও মার্কেটিং স্টুডিও।
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-300">
            Explore
          </h4>
          <ul className="mt-5 space-y-3 text-sm text-zinc-400">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-gold-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-300">
            Contact
          </h4>
          <ul className="mt-5 space-y-4 text-sm text-zinc-400">
            <li className="flex items-start gap-3">
              <Phone size={16} className="mt-0.5 flex-none text-gold-400" />
              <a href={`tel:${SITE.hotline.replace(/[^+0-9]/g, '')}`} className="hover:text-white">
                {SITE.hotline}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MessageCircle size={16} className="mt-0.5 flex-none text-gold-400" />
              <a href={SITE.whatsappLink} target="_blank" rel="noreferrer" className="hover:text-white">
                WhatsApp · {SITE.whatsapp}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={16} className="mt-0.5 flex-none text-gold-400" />
              <a href={`mailto:${SITE.email1}`} className="hover:text-white">
                {SITE.email1}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 flex-none text-gold-400" />
              <span>
                {SITE.address_en}
                <br />
                <span className="font-bn text-zinc-500">{SITE.address_bn}</span>
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-300">Social</h4>
          <ul className="mt-5 grid grid-cols-2 gap-2 text-sm text-zinc-400">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.key}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-lg px-3 py-2 transition hover:bg-white/5 hover:text-white"
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {SITE.brand}. All rights reserved.
          </p>
          <p>
            Founded by {SITE.founder.name} · Serving since {SITE.servingSince}
          </p>
        </div>
      </div>
    </footer>
  );
}
