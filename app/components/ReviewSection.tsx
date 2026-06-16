'use client';

import { useEffect, useRef, useState } from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import type { DbReview } from '../api/reviews/route';

/* ──────────────────────────────────────────────
   Cloudflare Turnstile types
   ────────────────────────────────────────────── */
interface TurnstileRenderOptions {
  sitekey: string;
  callback?: (token: string) => void;
  'expired-callback'?: () => void;
  'error-callback'?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact' | 'flexible';
}
declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement | string, options: TurnstileRenderOptions) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId?: string) => void;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';
const TURNSTILE_SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

/* ──────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────── */
const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-BD', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  } catch {
    return iso.slice(0, 10);
  }
}

/* ──────────────────────────────────────────────
   Rating breakdown bar
   ────────────────────────────────────────────── */
function RatingBar({ star, count, total }: { star: number; count: number; total: number }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="w-3 text-right text-xs font-medium text-ash-300">{star}</span>
      <Star size={11} className="flex-none fill-yellow-400 text-yellow-400" />
      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-ink-700">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-yellow-400 transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-6 text-right text-xs text-ash-400">{count}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Stars renderer
   ────────────────────────────────────────────── */
function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-transparent text-ash-600'}
        />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Review card
   ────────────────────────────────────────────── */
function ReviewCard({ review }: { review: DbReview }) {
  return (
    <figure className="card-3d break-inside-avoid p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className="grid h-10 w-10 flex-none place-items-center rounded-full font-semibold text-white text-sm shadow-glow"
            style={{ backgroundColor: review.avatar_color }}
          >
            {review.name.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{review.name}</p>
            <p className="text-xs text-ash-400">{review.email_masked}</p>
          </div>
        </div>
        {review.verified && (
          <span className="flex flex-none items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
            <ShieldCheck size={10} />
            Verified
          </span>
        )}
      </div>

      {/* Stars + date */}
      <div className="mt-3 flex items-center justify-between">
        <Stars rating={review.rating} />
        <span className="text-[11px] text-ash-500">{formatDate(review.created_at)}</span>
      </div>

      {/* Review body */}
      <blockquote className="mt-3">
        <p className="text-sm leading-7 text-ash-200">&ldquo;{review.review_en}&rdquo;</p>
        {review.review_bn && (
          <p className="mt-2 font-bn text-xs leading-6 text-ash-400">&ldquo;{review.review_bn}&rdquo;</p>
        )}
      </blockquote>
    </figure>
  );
}

/* ──────────────────────────────────────────────
   Interactive star selector
   ────────────────────────────────────────────── */
function StarSelector({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = (hover || value) >= i;
        return (
          <button
            key={i}
            type="button"
            aria-label={`${i} star${i > 1 ? 's' : ''}`}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(i)}
            className={`text-2xl transition-transform hover:scale-110 ${
              filled ? 'text-brand drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]' : 'text-ash-600'
            }`}
          >
            {filled ? '★' : '☆'}
          </button>
        );
      })}
      {value > 0 && (
        <span className="ml-2 text-sm text-ash-400">{value}/5</span>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Main component
   ────────────────────────────────────────────── */
export default function ReviewSection({ initial }: { initial: DbReview[] }) {
  const [reviews, setReviews] = useState<DbReview[]>(initial);
  const [showAll, setShowAll] = useState(false);

  // Form state
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reviewEn, setReviewEn] = useState('');
  const [reviewBn, setReviewBn] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Turnstile
  const turnstileWrapRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [token, setToken] = useState('');
  const [tsReady, setTsReady] = useState(false);

  useEffect(() => {
    if (!SITE_KEY || typeof window === 'undefined') return;
    const existing = document.querySelector<HTMLScriptElement>('script[data-creavix-turnstile]');
    let script: HTMLScriptElement | null = existing;
    if (!script) {
      script = document.createElement('script');
      script.src = TURNSTILE_SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      script.dataset.creavixTurnstile = '1';
      document.head.appendChild(script);
    }
    let cancelled = false;
    const tryRender = () => {
      if (cancelled || !window.turnstile || !turnstileWrapRef.current || widgetIdRef.current) return;
      try {
        widgetIdRef.current = window.turnstile.render(turnstileWrapRef.current, {
          sitekey: SITE_KEY,
          callback: (t: string) => { setToken(t); setSubmitError(''); },
          'expired-callback': () => setToken(''),
          'error-callback': () => { setToken(''); setSubmitError('Verification failed — try again.'); },
          theme: 'dark',
          size: 'flexible',
        });
        setTsReady(true);
      } catch { /* retry */ }
    };
    tryRender();
    const poll = window.setInterval(tryRender, 200);
    const timeout = window.setTimeout(() => window.clearInterval(poll), 10000);
    return () => {
      cancelled = true;
      window.clearInterval(poll);
      window.clearTimeout(timeout);
      if (widgetIdRef.current && window.turnstile) {
        try { window.turnstile.remove(widgetIdRef.current); } catch { /* ignore */ }
        widgetIdRef.current = null;
      }
    };
  }, []);

  // Derived stats
  const total = reviews.length;
  const avg = total > 0
    ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / total) * 10) / 10
    : 4.8;
  const breakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  const visibleReviews = showAll ? reviews : reviews.slice(0, 6);

  const resetTurnstile = () => {
    if (window.turnstile && widgetIdRef.current) {
      try { window.turnstile.reset(widgetIdRef.current); } catch { /* ignore */ }
    }
    setToken('');
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError('');
    if (!validateEmail(email)) {
      setEmailError('সঠিক ইমেইল দিন · Enter a valid email');
      return;
    }
    setEmailError('');
    if (!rating || !name.trim() || !reviewEn.trim()) return;
    if (SITE_KEY && !token) {
      setSubmitError('Please complete the human verification above · উপরের ভেরিফিকেশন সম্পূর্ণ করুন');
      return;
    }
    setBusy(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, rating, review_en: reviewEn, review_bn: reviewBn || undefined, turnstileToken: token }),
      });
      if (res.ok) {
        const data = (await res.json()) as { review: DbReview };
        setReviews((prev) => [data.review, ...prev]);
        setSubmitted(true);
        setRating(0); setName(''); setEmail(''); setReviewEn(''); setReviewBn('');
        resetTurnstile();
      } else {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setSubmitError(body.error ?? 'Could not submit. Please try again.');
        resetTurnstile();
      }
    } catch {
      setSubmitError('Network error — please try again.');
      resetTurnstile();
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="container-x py-16 sm:py-20">
      {/* ── Google Play Store-style rating hero ── */}
      <div className="mb-16 rounded-card border border-white/10 bg-ink-800/60 p-6 sm:p-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
          {/* Big score */}
          <div className="flex flex-col items-center text-center sm:min-w-[140px]">
            <span className="font-sans text-[80px] font-extrabold leading-none tracking-tight text-ash-50 sm:text-[96px]">
              {avg.toFixed(1)}
            </span>
            <Stars rating={Math.round(avg)} size={18} />
            <p className="mt-1.5 text-xs text-ash-400">out of 5.0</p>
            <p className="mt-3 font-bn text-xs text-ash-500">
              {total.toLocaleString('en-BD')}+ রিভিউ
            </p>
          </div>

          {/* Breakdown bars */}
          <div className="flex-1 space-y-2.5">
            {breakdown.map(({ star, count }) => (
              <RatingBar key={star} star={star} count={count} total={total} />
            ))}
          </div>

          {/* Summary card */}
          <div className="hidden lg:flex flex-col items-center justify-center rounded-xl border border-brand/20 bg-brand/[0.06] px-8 py-6 text-center min-w-[160px]">
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={16} className={i < 5 ? 'fill-yellow-400 text-yellow-400' : 'text-ash-600'} />
              ))}
            </div>
            <p className="mt-2 font-display text-lg uppercase tracking-wide text-white">
              4,300+ projects
            </p>
            <p className="mt-1 font-bn text-xs text-ash-400">ভেরিফাইড ক্লায়েন্ট</p>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
              <ShieldCheck size={11} />
              Verified
            </span>
          </div>
        </div>
      </div>

      {/* ── Masonry review grid ── */}
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-2 xl:columns-3">
        {visibleReviews.map((review) => (
          <div key={review.id} className="mb-5 inline-block w-full animate-fade-up">
            <ReviewCard review={review} />
          </div>
        ))}
      </div>

      {reviews.length > 6 && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="btn-3d-secondary"
          >
            {showAll ? 'Show less · কম দেখান' : `Load more (${reviews.length - 6} more) · আরো দেখুন`}
          </button>
        </div>
      )}

      {/* ── Submit review form ── */}
      <div className="mt-20 rounded-card border border-white/10 bg-white/[0.03] p-7 sm:p-9">
        <h3 className="font-display text-2xl uppercase tracking-[0.04em] text-white sm:text-3xl">
          Share your experience
        </h3>
        <p className="mt-1 font-bn text-sm text-ash-300">
          আপনার মতামত দিন · আপনার রিভিউ আমাদের সার্ভিস আরো উন্নত করতে সাহায্য করে।
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          {/* Star selector */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-[0.16em] text-ash-300">
              Your rating · রেটিং
            </label>
            <div className="mt-2">
              <StarSelector value={rating} onChange={setRating} />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium uppercase tracking-[0.16em] text-ash-300">
                Name · নাম
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="mt-2 w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-sm text-white outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/20"
              />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-[0.16em] text-ash-300">
                Email · ইমেইল
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(''); }}
                onBlur={(e) => { if (!validateEmail(e.target.value)) setEmailError('সঠিক ইমেইল দিন · Enter a valid email'); }}
                placeholder="you@email.com (masked publicly)"
                className="mt-2 w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-sm text-white outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/20"
              />
              {emailError && <p className="mt-1 text-xs text-brand">{emailError}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-[0.16em] text-ash-300">
              Review in English
            </label>
            <textarea
              required
              value={reviewEn}
              onChange={(e) => setReviewEn(e.target.value)}
              rows={3}
              placeholder="Share your experience in English..."
              className="mt-2 w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-sm text-white outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/20"
            />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-[0.16em] text-ash-300">
              Review in Bangla — optional · বাংলায় রিভিউ (ঐচ্ছিক)
            </label>
            <textarea
              value={reviewBn}
              onChange={(e) => setReviewBn(e.target.value)}
              rows={3}
              placeholder="বাংলায় আপনার অভিজ্ঞতা শেয়ার করুন (ঐচ্ছিক)..."
              className="mt-2 w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 font-bn text-sm text-white outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/20"
            />
          </div>

          {/* Turnstile */}
          {SITE_KEY ? (
            <div>
              <label className="block text-xs font-medium uppercase tracking-[0.16em] text-ash-300">
                Human verification · মানব যাচাই
              </label>
              <div ref={turnstileWrapRef} className="mt-2 min-h-[68px] w-full max-w-[480px]" />
              {!tsReady && <p className="mt-1 text-[11px] text-ash-500">Loading verification…</p>}
            </div>
          ) : null}

          {submitError && (
            <p className="rounded-xl border border-brand/40 bg-brand/10 px-4 py-3 text-sm text-brand">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={busy || !rating || !name || !email || !reviewEn || (!!SITE_KEY && !token)}
            className="btn-3d-primary w-full justify-center disabled:opacity-60"
          >
            {busy ? 'Submitting…' : 'Submit review · রিভিউ দিন'}
          </button>

          {submitted && (
            <p className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
              Thank you! আপনার ভেরিফাইড রিভিউ যুক্ত হয়েছে — উপরে দেখুন।
            </p>
          )}

          <p className="text-[11px] uppercase tracking-[0.18em] text-ash-500">
            Your email is masked publicly (e.g. ha***@gmail.com)
          </p>
        </form>
      </div>
    </section>
  );
}
