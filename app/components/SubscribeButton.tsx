'use client';

import { ReactNode } from 'react';

/**
 * Tiny client-only button that fires the global 'creavix:open-subscribe' event.
 * Lets server components (Footer, etc.) trigger SubscribeModal without
 * shipping the whole parent tree as a client component.
 */
export default function SubscribeButton({
  children,
  className = 'btn-3d-secondary mt-3 w-full justify-center !py-2 text-xs',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent('creavix:open-subscribe'))}
      className={className}
    >
      {children}
    </button>
  );
}
