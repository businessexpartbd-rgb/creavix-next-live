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
      className={`inline-flex items-center gap-2 rounded-full border border-accent-primary/30 bg-accent-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-primary ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent-primary" />
      {children}
    </div>
  );
}
