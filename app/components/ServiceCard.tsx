'use client';

import { useState } from 'react';
import {
  ArrowUpRight,
  Sparkles,
  Megaphone,
  Film,
  Package,
  Landmark,
  Wand2,
  ChevronDown,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react';
import type { Service } from '../../lib/site-data';
import { SITE, buildOrderWhatsAppLink } from '../../lib/site-data';

const ICONS: Record<Service['icon'], LucideIcon> = {
  Sparkles,
  Megaphone,
  Film,
  Package,
  Landmark,
  Wand2,
};

export default function ServiceCard({ service }: { service: Service }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = ICONS[service.icon] ?? Sparkles;

  return (
    <article
      className="rounded-card border border-accent-primary/10 bg-accent-primary/5 group relative flex h-full cursor-pointer flex-col p-6 transition-all duration-300 sm:p-7 hover:shadow-gold-glow"
      onClick={() => setExpanded((v) => !v)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setExpanded((v) => !v);
        }
      }}
      aria-expanded={expanded}
    >
      <div className="flex items-start justify-between">
        {/* Premium icon with micro-animation and warm orange glow */}
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-accent-primary/20 via-accent-primary/5 to-transparent text-accent-primary ring-1 ring-accent-primary/30 shadow-[inset_0_-2px_6px_rgba(235,94,40,0.25),0_8px_20px_-8px_rgba(235,94,40,0.35)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[inset_0_-2px_6px_rgba(235,94,40,0.35),0_12px_30px_-4px_rgba(235,94,40,0.45)]">
          <Icon size={26} strokeWidth={1.6} className="transition-transform duration-500 group-hover:rotate-12" />
        </span>
        <ArrowUpRight
          size={18}
          className="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-primary"
        />
      </div>

      <h3 className="mt-6 font-serif text-xl tracking-tight text-on-dark">
        {service.title_en}
      </h3>
      <p className="mt-1 font-bn text-sm text-muted">{service.title_bn}</p>

      <p className="mt-4 text-sm leading-7 text-muted">{service.desc_en}</p>
      <p className="mt-2 font-bn text-sm leading-7 text-muted">{service.desc_bn}</p>

      {/* Expand panel */}
      <div
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-out ${
          expanded ? 'mt-5 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="min-h-0">
          <div className="rounded-card border border-on-dark/10 bg-cream/60 p-5 shadow-card">
            <ul className="space-y-2">
              {service.bullets_bn.map((b) => (
                <li key={b} className="flex gap-2 font-bn text-sm leading-6 text-on-dark">
                  <CheckCircle2 size={14} className="mt-1 flex-none text-accent-primary" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <a
              onClick={(e) => e.stopPropagation()}
              href={buildOrderWhatsAppLink('সার্ভিস', service.title_bn, 0).replace(
                /মূল্য:[^\n]+\n/,
                '',
              )}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-5 w-full justify-center text-sm"
            >
              অর্ডার করুন →
            </a>
          </div>
        </div>
      </div>

      {/* Toggle hint */}
      <div className="mt-auto flex items-center gap-2 pt-5 text-xs uppercase tracking-[0.18em] text-muted">
        <span>{expanded ? 'Tap to collapse' : 'Tap for details'}</span>
        <ChevronDown
          size={14}
          className={`transition-transform ${expanded ? 'rotate-180 text-accent-primary' : ''}`}
        />
      </div>
      <span className="sr-only">WhatsApp {SITE.whatsapp}</span>
    </article>
  );
}
