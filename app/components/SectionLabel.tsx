'use client';

import { ReactNode } from 'react';

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}

/**
 * Premium section label with violet uppercase styling.
 * Used above section headings to introduce premium sections.
 */
export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </div>
  );
}
