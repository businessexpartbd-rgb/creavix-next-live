'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

export interface FaqItem {
  q_en: string;
  q_bn: string;
  a_en: string;
  a_bn: string;
}

export default function FAQAccordion({ items }: { items: readonly FaqItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const open = openIdx === i;
        return (
          <div
            key={item.q_en}
            className="overflow-hidden rounded-card border border-white/10 bg-ink-800"
          >
            <button
              type="button"
              onClick={() => setOpenIdx(open ? null : i)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 bg-ink-700 px-5 py-4 text-left transition hover:bg-ink-600"
            >
              <span className="flex flex-col">
                <span className="font-display text-lg uppercase tracking-[0.04em] text-warm-fg">
                  {item.q_en}
                </span>
                <span className="font-bn text-sm text-warm-muted00">{item.q_bn}</span>
              </span>
              <span
                className={`grid h-9 w-9 flex-none place-items-center rounded-full border border-white/10 bg-white/5 text-warm-muted00 transition ${
                  open ? 'rotate-45 border-warm-accent/50 text-warm-accent' : ''
                }`}
              >
                <Plus size={16} />
              </span>
            </button>
            <div
              className={`grid overflow-hidden bg-ink-900 transition-[grid-template-rows] duration-400 ease-out ${
                open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="min-h-0">
                <div className="space-y-3 px-5 py-5 text-sm leading-7 text-warm-muted00">
                  <p>{item.a_en}</p>
                  <p className="font-bn text-warm-muted00">{item.a_bn}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
