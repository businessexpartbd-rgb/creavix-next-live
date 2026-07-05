'use client';

import { Check, Sparkles } from 'lucide-react';
import type { PricingPlan } from '../../lib/site-data';
import { buildOrderWhatsAppLink } from '../../lib/site-data';

export default function PricingCard({
  plan,
  category_bn,
}: {
  plan: PricingPlan;
  /** Bangla category name used in the WhatsApp prefill (e.g. 'স্টোরি টেলিং') */
  category_bn: string;
}) {
  const discountPct = Math.round(
    ((plan.originalBDT - plan.priceBDT) / plan.originalBDT) * 100,
  );
  return (
    <article
      className={`relative flex h-full flex-col rounded-card border p-7 transition ${
        plan.highlight
          ? 'border-accent-primary/50 bg-gradient-to-br from-accent-primary/12 via-white/[0.04] to-transparent shadow-glow-lg'
          : 'border-on-dark/10 bg-white/[0.03] hover:border-accent-primary/30'
      }`}
    >
      {plan.highlight ? (
        <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-accent-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-on-dark shadow-glow">
          <Sparkles size={11} />
          Most popular
        </span>
      ) : null}

      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-display text-2xl uppercase tracking-[0.04em] text-on-dark">
            {plan.name_en}
          </h3>
          <p className="mt-1 font-bn text-sm text-muted">{plan.name_bn}</p>
        </div>
        <span className="rounded-full bg-accent-primary/15 px-3 py-1 text-[11px] font-semibold text-accent-primary">
          -{discountPct}%
        </span>
      </div>

      <div className="mt-6 flex items-end gap-3">
        <div className="font-display text-4xl tracking-wide text-on-dark">
          ৳<span className="accent">{plan.priceBDT.toLocaleString('en-BD')}</span>
        </div>
        <div className="pb-1 text-xs text-muted line-through">
          ৳{plan.originalBDT.toLocaleString('en-BD')}
        </div>
      </div>
      {plan.duration ? (
        <p className="mt-1 font-bn text-xs text-muted">⏱ {plan.duration}</p>
      ) : null}

      <ul className="mt-7 space-y-3">
        {plan.features_bn.map((f) => (
          <li
            key={f}
            className="flex items-start gap-3 font-bn text-sm leading-6 text-muted"
          >
            <Check size={16} className="mt-0.5 flex-none text-accent-primary" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-7">
        <a
          href={buildOrderWhatsAppLink(category_bn, plan.name_bn, plan.priceBDT)}
          target="_blank"
          rel="noreferrer"
          className={
            plan.highlight ? 'btn-3d-primary w-full' : 'btn-3d-secondary w-full'
          }
        >
          অর্ডার করুন
        </a>
        <p className="mt-3 text-center text-[11px] uppercase tracking-[0.18em] text-muted">
          WhatsApp · pre-filled
        </p>
      </div>
    </article>
  );
}
