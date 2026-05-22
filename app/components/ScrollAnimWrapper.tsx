'use client';

import { ReactNode } from 'react';
import Reveal from './Reveal';

/**
 * Repeating scroll-anim wrapper.
 * Re-animates on both scroll-down (entry) AND scroll-up (re-entry).
 * Use this for any block where you want the master-guide spec:
 *   "scroll up এবং scroll down উভয়েই animation"
 */
export default function ScrollAnimWrapper({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <Reveal repeat delay={delay} className={className}>
      {children}
    </Reveal>
  );
}
