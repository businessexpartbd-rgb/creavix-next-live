'use client';

import { useState, useRef } from 'react';
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
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';

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
  const h3Ref = useRef<HTMLHeadingElement>(null);
  useRevealOnScroll(h3Ref);
  const Icon = ICONS[service.icon] ?? Sparkles;

  return (
    <article
      className="card-3d group flex h-full cursor-pointer flex-col p-6 sm:p-7"
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
        {/* 3D-styled icon (CSS depth in lieu of Lottie placeholder) */}
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand/30 via-brand/10 to-transparent text-brand ring-1 ring-brand/30 shadow-[inset_0_-2px_6px_rgba(232,23,58,0.4),0_8px_20px_-8px_rgba(232,23,58,0.4)]">
          <Icon size={26} strokeWidth={1.6} />
        </span>
        <ArrowUpRight
          size={18}
          className="text-ash-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
        />
      </div>

      <h3 className="reveal-card mt-6 font-display text-2xl uppercase tracking-[0.04em] text-white" ref={h3Ref}>
        {service.title_en}
      </h3>
      <p className="mt-1 font-bn text-sm text-ash-300">{service.title_bn}</p>

      <p className="mt-4 text-sm leading-7 text-ash-300">{service.desc_en}</p>
      <p className="mt-2 font-bn text-sm leading-7 text-ash-200">{service.desc_bn}</p>

      {/* Expand panel */}
      <div
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-out ${
          expanded ? 'mt-5 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="min-h-0">
          <div className="rounded-card border border-white/10 bg-ink-700 p-5">
            <ul className="space-y-2">
              {service.bullets_bn.map((b) => (
                <li key={b} className="flex gap-2 font-bn text-sm leading-6 text-ash-200">
                  <CheckCircle2 size={14} className="mt-1 flex-none text-brand" />
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
              className="btn-3d-primary mt-5 w-full justify-center text-sm"
            >
              অর্ডার করুন →
            </a>
          </div>
        </div>
      </div>

      {/* Toggle hint */}
      <div className="mt-auto flex items-center gap-2 pt-5 text-xs uppercase tracking-[0.18em] text-ash-400">
        <span>{expanded ? 'Tap to collapse' : 'Tap for details'}</span>
        <ChevronDown
          size={14}
          className={`transition-transform ${expanded ? 'rotate-180 text-brand' : ''}`}
        />
      </div>
      <span className="sr-only">WhatsApp {SITE.whatsapp}</span>
    </article>
  );
}
