'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { REVIEWS_SEED, type Review } from '@/lib/site-data';
import ReviewCard from './ReviewCard';

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

const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

interface DatabaseReview {
  id: string;
  name: string;
  email_masked: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function ReviewSectionWithDatabase({
  initial = REVIEWS_SEED,
}: {
  initial?: Review[];
}) {
  // Combine seed reviews with database reviews
  const [dbReviews, setDbReviews] = useState<DatabaseReview[]>([]);
  const [counter, setCounter] = useState(initial.length);

  // Form state
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [text, setText] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Turnstile state
  const turnstileWrapRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [token, setToken] = useState('');
  const [tsReady, setTsReady] = useState(false);

  // Fetch reviews from database on mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('reviews')
          .select('id, name, email_masked, rating, comment, created_at')
          .eq('approved', true)
          .order('created_at', { ascending: false })
          .limit(50);

        if (error) {
          console.error('[reviews] fetch error:', error);
          return;
        }

        if (data) {
          setDbReviews(data as DatabaseReview[]);
          setCounter(initial.length + data.length);
        }
      } catch (error) {
        console.error('[reviews] unexpected error:', error);
      }
    };

    fetchReviews();
  }, [initial.length]);

  // Initialize Turnstile
  useEffect(() => {
    if (!SITE_KEY || typeof window === 'undefined') return;

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-creavix-turnstile]'
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
          size: 'flexible',
        });
        setTsReady(true);
      } catch {
        // ignore
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
          /* ignore */
        }
        widgetIdRef.current = null;
      }
    };
  }, []);

  const visibleReviews = useMemo(() => {
    return dbReviews.slice(0, 6);
  }, [dbReviews]);

  const avg = useMemo(() => {
    if (!visibleReviews.length) return Math.round((initial.reduce((s, r) => s + r.rating, 0) / initial.length) * 10) / 10;
    const allRatings = [
      ...initial.map((r) => r.rating),
      ...visibleReviews.map((r) => r.rating),
    ];
    return Math.round((allRatings.reduce((s, r) => s + r, 0) / allRatings.length) * 10) / 10;
  }, [visibleReviews, initial]);

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

    if (!validateEmail(email)) {
      setEmailError('সঠিক ইমেইল দিন · Enter a valid email');
      return;
    }
    setEmailError('');
    if (!rating || !name.trim() || !text.trim()) return;

    if (SITE_KEY && !token) {
      setSubmitError(
        'Please complete the human verification above · উপরের ভেরিফিকেশন সম্পূর্ণ করুন'
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
              : 'Could not submit right now. Please try again later or WhatsApp us.'
        );
      }
    } catch {
      setSubmitError('Network error — please try again.');
    } finally {
      setBusy(false);
    }

    if (!serverOk) {
      resetTurnstile();
      return;
    }

    // Refresh reviews from database
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('reviews')
        .select('id, name, email_masked, rating, comment, created_at')
        .eq('approved', true)
        .order('created_at', { ascending: false })
        .limit(50);

      if (!error && data) {
        setDbReviews(data as DatabaseReview[]);
        setCounter(initial.length + data.length);
      }
    } catch (error) {
      console.error('[reviews] refresh error:', error);
    }

    setSubmitted(true);
    setRating(0);
    setName('');
    setEmail('');
    setPhone('');
    setText('');
    resetTurnstile();

    // Auto-hide success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="container-x py-24 sm:py-28">
      {/* Header + live counter */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="eyebrow">Client Reviews · ক্লায়েন্ট রিভিউ</span>
          <h2 className="mt-5 font-display text-3xl uppercase tracking-[0.04em] text-ash-50 sm:text-4xl lg:text-5xl">
            What teams say after <span className="accent">working with us</span>
          </h2>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <div className="flex items-center gap-2 text-sm">
            <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-brand" />
            <span className="text-ash-200">
              <strong className="text-ash-50">{counter.toLocaleString('en-BD')}+</strong>{' '}
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

      {/* Reviews Grid - Database Reviews */}
      {visibleReviews.length > 0 && (
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visibleReviews.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </div>
      )}

      {/* Seed Reviews - Legacy */}
      {visibleReviews.length === 0 && initial.length > 0 && (
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {initial.slice(0, 6).map((r) => (
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
                <div className="text-sm">
                  <p className="font-medium text-ash-50">{r.name}</p>
                  <p className="text-xs text-ash-400">{r.email}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {/* Form Section */}
      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold text-ash-50 mb-6">
            Share your experience · আপনার অভিজ্ঞতা শেয়ার করুন
          </h3>
          <form onSubmit={submit} className="space-y-4">
            {/* Name */}
            <div>
              <input
                type="text"
                placeholder="Your name · আপনার নাম"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-black/15 bg-ink-700 px-4 py-3 text-ash-50 placeholder:text-ash-400 focus:border-brand/50 focus:outline-none"
                disabled={busy}
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email · ইমেইল"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                className={`w-full rounded-lg border px-4 py-3 bg-ink-700 text-ash-50 placeholder:text-ash-400 focus:outline-none ${
                  emailError ? 'border-red-500/50' : 'border-black/15 focus:border-brand/50'
                }`}
                disabled={busy}
              />
              {emailError && <p className="mt-1 text-xs text-red-400">{emailError}</p>}
            </div>

            {/* Phone */}
            <div>
              <input
                type="tel"
                placeholder="Phone (optional) · ফোন (ঐচ্ছিক)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-black/15 bg-ink-700 px-4 py-3 text-ash-50 placeholder:text-ash-400 focus:border-brand/50 focus:outline-none"
                disabled={busy}
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm text-ash-300 mb-3">
                Rating · রেটিং
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-3xl transition-all ${
                      star <= rating ? 'text-yellow-400 scale-110' : 'text-ash-400'
                    }`}
                    disabled={busy}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <textarea
                placeholder="Your review · আপনার মন্তব্য"
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={2000}
                rows={4}
                className="w-full rounded-lg border border-black/15 bg-ink-700 px-4 py-3 text-ash-50 placeholder:text-ash-400 focus:border-brand/50 focus:outline-none resize-none"
                disabled={busy}
              />
              <p className="mt-1 text-xs text-ash-400">{text.length}/2000</p>
            </div>

            {/* Turnstile */}
            <div ref={turnstileWrapRef} />

            {/* Submit Errors */}
            {submitError && (
              <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                {submitError}
              </p>
            )}

            {/* Success Message */}
            {submitted && (
              <p className="text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                ✓ Thank you! Your review has been saved.
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={busy || !rating || !name || !email || !text}
              className="w-full btn-3d-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {busy ? 'Submitting...' : 'Submit Review · রিভিউ জমা দিন'}
            </button>
          </form>
        </div>

        {/* Info Column */}
        <div className="flex flex-col justify-between gap-6">
          <div className="glass">
            <p className="text-sm text-ash-200 mb-3">
              📝 <strong>Your feedback matters</strong>
            </p>
            <p className="text-xs text-ash-400 leading-relaxed">
              We read every review and use your feedback to improve our services. Your email will be masked for privacy.
            </p>
          </div>
          <div className="glass">
            <p className="text-sm text-ash-200 mb-3">
              ⏱️ <strong>Real-time display</strong>
            </p>
            <p className="text-xs text-ash-400 leading-relaxed">
              Your review appears here instantly after approval. Help other teams discover us through your experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
