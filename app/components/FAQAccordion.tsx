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
            className="overflow-hidden rounded-card border border-on-dark/10 bg-ink-800"
          >
            <button
              type="button"
              onClick={() => setOpenIdx(open ? null : i)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 bg-ink-700 px-5 py-4 text-left transition hover:bg-ink-600"
            >
              <span className="flex flex-col">
                <span className="font-display text-lg uppercase tracking-[0.04em] text-on-dark">
                  {item.q_en}
                </span>
                <span className="font-bn text-sm text-muted">{item.q_bn}</span>
              </span>
              <span
                className={`grid h-9 w-9 flex-none place-items-center rounded-full border border-on-dark/10 bg-soft-dark/5 text-muted transition ${
                  open ? 'rotate-45 border-accent-primary/50 text-accent-primary' : ''
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
                <div className="space-y-3 px-5 py-5 text-sm leading-7 text-muted">
                  <p>{item.a_en}</p>
                  <p className="font-bn text-muted">{item.a_bn}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
