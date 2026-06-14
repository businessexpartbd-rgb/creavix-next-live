'use client';

import { useEffect, useState } from 'react';
import { Bell, X, Mail } from 'lucide-react';
import { SITE } from '../../lib/site-data';

/**
 * Listens for window events 'creavix:open-subscribe' (Navbar bell, Footer btn).
 * Posts to /api/subscribe. If RESEND_API_KEY is missing, the API falls back
 * to instructing the user to mailto: info@creavixit.com.
 */
export default function SubscribeModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<'idle' | 'ok' | 'fallback' | 'error'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      setDone('idle');
      setError('');
    };
    window.addEventListener('creavix:open-subscribe', onOpen as EventListener);
    return () => window.removeEventListener('creavix:open-subscribe', onOpen as EventListener);
  }, []);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('সঠিক ইমেইল দিন · Enter a valid email');
      return;
    }
    setError('');
    setBusy(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data: { ok?: boolean; fallback?: boolean; error?: string } = await res
        .json()
        .catch(() => ({}));
      if (data.ok) setDone('ok');
      else if (data.fallback) setDone('fallback');
      else setDone('error');
    } catch {
      setDone('error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-4 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Subscribe"
      onClick={() => setOpen(false)}
    >
      <div
        className="card-3d relative w-full max-w-md p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-ash-300 hover:bg-white/5 hover:text-ash-50"
        >
          <X size={16} />
        </button>

        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/15 text-brand ring-1 ring-brand/30">
          <Bell size={20} />
        </span>
        <h2 className="mt-5 font-display text-2xl uppercase tracking-[0.04em] text-ash-50">
          Subscribe
        </h2>
        <p className="mt-1 font-bn text-sm text-ash-300">
          নতুন অফার, প্যাকেজ ও ভিডিও আপডেট পেতে সাবস্ক্রাইব করুন।
        </p>

        {done === 'idle' || done === 'error' ? (
          <form onSubmit={submit} className="mt-6 space-y-3">
            <div>
              <label className="block text-xs font-medium uppercase tracking-[0.16em] text-ash-300">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@brand.com"
                required
                className="mt-2 w-full rounded-xl border border-black/10 bg-ink-900 px-4 py-3 text-sm text-ash-50 placeholder:text-ash-500 outline-none transition focus:border-brand/60 focus:ring-2 focus:ring-brand/20"
              />
              {error ? <p className="mt-1 text-xs text-brand">{error}</p> : null}
            </div>
            <button
              type="submit"
              disabled={busy}
              className="btn-3d-primary w-full justify-center disabled:opacity-60"
            >
              {busy ? 'Sending…' : 'Subscribe'}
            </button>
            {done === 'error' ? (
              <p className="text-xs text-brand">
                Something went wrong. Please email us instead.
              </p>
            ) : null}
            <a
              href={`mailto:${SITE.email1}?subject=Subscribe`}
              className="btn-ghost w-full justify-center text-xs"
            >
              <Mail size={14} />
              Or email {SITE.email1}
            </a>
          </form>
        ) : null}

        {done === 'ok' ? (
          <p className="mt-6 rounded-xl border border-brand/30 bg-brand/10 px-4 py-3 text-sm text-brand">
            ✓ Subscribed! আপনার ইমেইলে শীঘ্রই স্বাগত বার্তা পৌঁছাবে।
          </p>
        ) : null}
        {done === 'fallback' ? (
          <div className="mt-6 space-y-3 rounded-xl border border-black/10 bg-black/[0.04] px-4 py-3 text-sm">
            <p className="text-ash-200">
              Email service isn&apos;t configured yet — please email us directly:
            </p>
            <a
              href={`mailto:${SITE.email1}?subject=Subscribe&body=${encodeURIComponent(
                `Please subscribe ${email} to Creavix updates.`,
              )}`}
              className="btn-3d-primary w-full justify-center"
            >
              <Mail size={14} />
              Open mail app
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}
