'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Star, Quote, ShieldCheck } from 'lucide-react';
import { REVIEWS_SEED, type Review } from '../../lib/site-data';

/* ───────────── Cloudflare Turnstile (window + types) ───────────── */
interface TurnstileRenderOptions {
  sitekey: string;
  callback?: (token: string) => void;
  'expired-callback'?: () => void;
  'error-callback'?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact' | 'flexible';
  appearance?: 'always' | 'execute' | 'interaction-only';
  language?: string;
}
declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement | string, options: TurnstileRenderOptions) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId?: string) => void;
      getResponse: (widgetId?: string) => string;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';
const TURNSTILE_SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

const maskEmail = (email: string) => {
  const [user, domain] = email.split('@');
  if (!user || !domain) return email;
  const head = user.length <= 2 ? user[0] ?? 'x' : user.slice(0, 2);
  return `${head}***@${domain}`;
};
const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

/* ───────────── Component ───────────── */
export default function ReviewSection({ initial = REVIEWS_SEED }: { initial?: Review[] }) {
  const [reviews, setReviews] = useState<Review[]>(initial);
  const [showAll, setShowAll] = useState(false);
  // ✅ Real counter — increments only when a verified review is submitted.
  //   Starts at the seed count and goes up by 1 per accepted submission.
  const [counter, setCounter] = useState(initial.length);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [text, setText] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* ── Turnstile widget lifecycle ── */
  const turnstileWrapRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [token, setToken] = useState('');
  const [tsReady, setTsReady] = useState(false);

  useEffect(() => {
    if (!SITE_KEY || typeof window === 'undefined') return;

    // Load the Turnstile script once per page session.
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-creavix-turnstile]',
    );
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
      if (cancelled) return;
      if (!window.turnstile || !turnstileWrapRef.current || widgetIdRef.current) return;
      try {
        widgetIdRef.current = window.turnstile.render(turnstileWrapRef.current, {
          sitekey: SITE_KEY,
          callback: (t: string) => {
            setToken(t);
            setSubmitError('');
          },
          'expired-callback': () => setToken(''),
          'error-callback': () => {
            setToken('');
            setSubmitError('Verification failed — try again.');
          },
          theme: 'dark',
          // ✅ flexible (300+ × 65) — horizontal Cloudflare bar that
          //    matches the screenshot the user shared. Adapts to the
          //    container width: full form width on mobile (looks like
          //    a tidy single row, not a square card) and the same row
          //    look on desktop. The wrapper limits max width so it
          //    doesn't stretch beyond the form's reading column.
          size: 'flexible',
        });
        setTsReady(true);
      } catch {
        // Render may fail if script just loaded; retry next tick
      }
    };

    tryRender();
    const poll = window.setInterval(tryRender, 200);
    const timeout = window.setTimeout(() => window.clearInterval(poll), 10000);

    return () => {
      cancelled = true;
      window.clearInterval(poll);
      window.clearTimeout(timeout);
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          /* ignore — widget may already be detached */
        }
        widgetIdRef.current = null;
      }
    };
  }, []);

  const visibleReviews = useMemo(
    () => (showAll ? reviews : reviews.slice(0, 3)),
    [reviews, showAll],
  );

  const avg = useMemo(() => {
    if (!reviews.length) return 0;
    return Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10;
  }, [reviews]);

  const resetTurnstile = () => {
    if (window.turnstile && widgetIdRef.current) {
      try {
        window.turnstile.reset(widgetIdRef.current);
      } catch {
        /* ignore */
      }
    }
    setToken('');
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    // Validate email (required) — phone stays optional
    if (!validateEmail(email)) {
      setEmailError('সঠিক ইমেইল দিন · Enter a valid email');
      return;
    }
    setEmailError('');
    if (!rating || !name.trim() || !text.trim()) return;

    // Cloudflare Turnstile — must complete before submit
    if (SITE_KEY && !token) {
      setSubmitError(
        'Please complete the human verification above · উপরের ভেরিফিকেশন সম্পূর্ণ করুন',
      );
      return;
    }

    setBusy(true);
    let serverOk = false;
    try {
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone: phone || undefined,
          rating,
          text,
          turnstileToken: token,
        }),
      });
      serverOk = res.ok;
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setSubmitError(
          body.error === 'human verification failed'
            ? 'Verification failed — sometimes the server-side secret is misconfigured. Refresh and try again, or contact us via WhatsApp.'
            : body.error === 'human verification required'
              ? 'Verification missing — please complete the captcha above.'
              : 'Could not submit right now. Please try again later or WhatsApp us.',
        );
      }
    } catch {
      setSubmitError('Network error — please try again.');
    } finally {
      setBusy(false);
    }

    if (!serverOk) {
      // Reset Turnstile so the user can retry with a fresh token
      resetTurnstile();
      return;
    }

    // ✅ Server accepted (Turnstile passed) → counts as a verified original review.
    const isBangla = /[\u0980-\u09FF]/.test(text);
    const newReview: Review = {
      id: `local-${Date.now()}`,
      name,
      email: maskEmail(email),
      phone: phone || undefined,
      rating,
      text_bn: isBangla ? text : undefined,
      text_en: isBangla ? undefined : text,
      lang: isBangla ? 'bn' : 'en',
      createdAt: new Date().toISOString().slice(0, 10),
      verified: true,
    };
    setReviews((r) => [newReview, ...r]);
    setCounter((c) => c + 1);
    setSubmitted(true);
    setRating(0);
    setName('');
    setEmail('');
    setPhone('');
    setText('');
    resetTurnstile();
  };

  return (
    <section className="container-x py-24 sm:py-28">
      {/* Header + live counter */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="eyebrow">Client Reviews · ক্লায়েন্ট রিভিউ</span>
          <h2 className="mt-5 font-display text-3xl uppercase tracking-[0.04em] text-white sm:text-4xl lg:text-5xl">
            What teams say after <span className="accent">working with us</span>
          </h2>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <div className="flex items-center gap-2 text-sm">
            <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-brand" />
            <span className="text-ash-200">
              <strong className="text-white">{counter.toLocaleString('en-BD')}+</strong>{' '}
              reviews
            </span>
            <span className="font-bn text-ash-400">
              · {counter.toLocaleString('en-BD')}+ জন রিভিউ দিয়েছেন
            </span>
          </div>
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                size={14}
                className={`${
                  i < Math.round(avg) ? 'fill-yellow-400 text-yellow-400' : 'text-ash-500'
                }`}
                fill={i < Math.round(avg) ? 'currentColor' : 'none'}
              />
            ))}
            <span className="ml-2 text-xs text-ash-300">{avg}/5 average</span>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visibleReviews.map((r) => (
          <figure key={r.id} className="card-3d relative h-full p-6">
            <Quote className="absolute right-5 top-5 text-brand/20" size={32} />
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < r.rating ? 'fill-yellow-400 text-yellow-400' : 'text-ash-500'}
                  fill={i < r.rating ? 'currentColor' : 'none'}
                />
              ))}
            </div>
            <blockquote className="mt-4 text-sm leading-7 text-ash-200">
              {r.text_bn ? (
                <span className="font-bn">&ldquo;{r.text_bn}&rdquo;</span>
              ) : (
                <span>&ldquo;{r.text_en}&rdquo;</span>
              )}
            </blockquote>
            {r.text_bn && r.text_en ? (
              <p className="mt-2 text-xs leading-5 text-ash-400">&ldquo;{r.text_en}&rdquo;</p>
            ) : null}
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand/40 to-brand/10 text-sm font-semibold text-white ring-1 ring-brand/20">
                {r.name.charAt(0)}
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-white">{r.name}</div>
                <div className="text-xs text-ash-400">{r.email}</div>
              </div>
              {r.verified ? (
                <span
                  className="ml-auto grid h-7 w-7 place-items-center rounded-full bg-brand/15 text-brand"
                  title="Verified original review"
                >
                  <ShieldCheck size={14} />
                </span>
              ) : null}
            </figcaption>
          </figure>
        ))}
      </div>

      {reviews.length > 3 ? (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="btn-3d-secondary"
          >
            {showAll ? 'Show less · কম দেখান' : 'See more · আরো দেখুন'}
          </button>
        </div>
      ) : null}

      {/* Submit form */}
      <div className="mt-16 rounded-card border border-white/10 bg-white/[0.03] p-7 sm:p-9">
        <h3 className="font-display text-2xl uppercase tracking-[0.04em] text-white sm:text-3xl">
          Share your experience
        </h3>
        <p className="mt-1 font-bn text-sm text-ash-300">
          আপনার মতামত আমাদের ভিডিও কোয়ালিটি আরো উন্নত করতে সাহায্য করে।
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          {/* Star rating */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-[0.16em] text-ash-300">
              Your rating · রেটিং
            </label>
            <div className="mt-2 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => {
                const filled = (hover || rating) >= i;
                return (
                  <button
                    key={i}
                    type="button"
                    aria-label={`${i} star${i > 1 ? 's' : ''}`}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(i)}
                    className="star-btn"
                    data-active={filled}
                  >
                    {filled ? '★' : '☆'}
                  </button>
                );
              })}
              <span className="ml-3 text-sm text-ash-400">
                {rating ? `${rating}/5` : '— select —'}
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name · আপনার নাম"
              className="rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-sm text-white outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/20"
            />
            <div>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError('');
                }}
                onBlur={(e) => {
                  if (!validateEmail(e.target.value))
                    setEmailError('সঠিক ইমেইল দিন · Enter a valid email');
                }}
                placeholder="Email (required) · ইমেইল"
                className="w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-sm text-white outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/20"
              />
              {emailError ? <p className="mt-1 text-xs text-brand">{emailError}</p> : null}
            </div>
          </div>

          {/* ✅ Phone is OPTIONAL — no `required`, label clarifies it */}
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone — optional · ফোন (ঐচ্ছিক)"
            className="w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-sm text-white outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/20"
          />

          <textarea
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="আপনার অভিজ্ঞতা লিখুন... · Share your experience..."
            className="w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-sm text-white outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/20"
          />

          {/* ✅ Cloudflare Turnstile — flexible widget renders the standard
              horizontal "Verifying… CLOUDFLARE" bar that matches the
              screenshot the user shared. Wrapper caps max width at
              480px so it never stretches edge-to-edge on wide desktops. */}
          {SITE_KEY ? (
            <div>
              <label className="block text-xs font-medium uppercase tracking-[0.16em] text-ash-300">
                Human verification · মানব যাচাই
              </label>
              <div
                ref={turnstileWrapRef}
                className="mt-2 min-h-[68px] w-full max-w-[480px]"
              />
              {!tsReady ? (
                <p className="mt-1 text-[11px] text-ash-500">Loading verification…</p>
              ) : null}
            </div>
          ) : null}

          {submitError ? (
            <p className="rounded-xl border border-brand/40 bg-brand/10 px-4 py-3 text-sm text-brand">
              {submitError}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={busy || !rating || !name || !email || !text || (!!SITE_KEY && !token)}
            className="btn-3d-primary w-full justify-center disabled:opacity-60"
          >
            {busy ? 'Sending…' : 'Submit review · রিভিউ দিন'}
          </button>

          {submitted ? (
            <p className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
              ✓ Thank you! আপনার ভেরিফাইড রিভিউ যুক্ত হয়েছে — উপরে দেখুন।
            </p>
          ) : null}
          <p className="text-[11px] uppercase tracking-[0.18em] text-ash-500">
            Your email is masked publicly (e.g. ha***@gmail.com)
          </p>
        </form>
      </div>
    </section>
  );
}
