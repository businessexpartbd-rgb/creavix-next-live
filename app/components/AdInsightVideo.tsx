'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Play, Volume2, VolumeX } from 'lucide-react';
import Reveal from './Reveal';
import { ytThumb } from '../../lib/site-data';

const VIDEO_ID = 'sHU3gWcwm4E';
const SUBTITLE_EN = "Why do most ads fail to convert? Here's what actually works.";
const SUBTITLE_BN = 'বেশিরভাগ বিজ্ঞাপন কেন ফেল করে? আসলে কী করলে কাজ হয়?';

/**
 * Hero ad-strategy auto-play spot.
 *
 *   ① Lightweight YouTube thumbnail (~10KB) renders first.
 *   ② Once the section scrolls into view → iframe mounts with
 *      autoplay=1 + loop=1 → muted preview starts.
 *   ③ When the section scrolls out of view (>60%) → the iframe is sent
 *      a "pauseVideo" command via the YouTube IFrame-API.
 *   ④ When the visitor scrolls back into view → "playVideo" resumes the
 *      loop. Same UX as Instagram/TikTok feeds — the video plays only
 *      while it's visible.
 *   ⑤ Mute toggle works without remounting the iframe (live command).
 */
export default function AdInsightVideo() {
  const [muted, setMuted] = useState(true);
  const [activated, setActivated] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const post = useCallback((func: string, args: unknown[] = []) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func, args }),
      '*',
    );
  }, []);

  /* ── First-time mount + ongoing pause/resume on scroll ── */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setActivated(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // First visible → mount the iframe.
            setActivated(true);
            // If the iframe was already mounted (re-entry), resume.
            post('playVideo');
          } else if (entry.intersectionRatio < 0.4) {
            // Mostly off-screen → pause to save CPU + bandwidth.
            post('pauseVideo');
          }
        }
      },
      { threshold: [0, 0.4, 0.6, 1], rootMargin: '200px 0px' },
    );
    obs.observe(el);

    // Tab/window switch — pause when the page is hidden.
    const onVisibility = () => {
      if (document.hidden) post('pauseVideo');
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      obs.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [post]);

  /* ── Pause when any other VideoThumb on the page starts ── */
  useEffect(() => {
    const onOther = (e: Event) => {
      const detail = (e as CustomEvent<{ id: string }>).detail;
      if (detail?.id !== VIDEO_ID) post('pauseVideo');
    };
    window.addEventListener('creavix:video-play', onOther as EventListener);
    return () =>
      window.removeEventListener('creavix:video-play', onOther as EventListener);
  }, [post]);

  /* ── Live mute toggle without remounting the iframe ── */
  const toggleMute = () => {
    setMuted((m) => {
      const next = !m;
      post(next ? 'mute' : 'unMute');
      return next;
    });
  };

  // enablejsapi=1 unlocks postMessage controls; loop+playlist make the
  // single video loop seamlessly; mute=1 is required for autoplay on
  // mobile browsers.
  const src = activated
    ? `https://www.youtube.com/embed/${VIDEO_ID}?enablejsapi=1&autoplay=1&mute=${
        muted ? 1 : 0
      }&loop=1&playlist=${VIDEO_ID}&controls=1&rel=0&modestbranding=1&playsinline=1`
    : '';

  return (
    <section className="container-x py-20 sm:py-24">
      <div className="mb-10 text-center">
        <Reveal>
          <span className="eyebrow">Ad Strategy · বিজ্ঞাপন কৌশল</span>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-4 font-display text-3xl uppercase tracking-[0.04em] text-white sm:text-4xl lg:text-5xl">
            Why Most Ads <span className="accent">Fail</span> — and What Works
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mx-auto mt-3 max-w-xl font-bn text-sm leading-7 text-ash-300">
            বিজ্ঞাপন দিচ্ছেন কিন্তু ফল আসছে না? এই ভিডিওতে জানুন আসল কারণ।
          </p>
        </Reveal>
      </div>

      <Reveal delay={180}>
        <div className="mx-auto w-full max-w-[320px]" ref={wrapRef}>
          <div
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl"
            style={{ aspectRatio: '9 / 16' }}
          >
            {activated ? (
              <iframe
                ref={iframeRef}
                src={src}
                className="absolute inset-0 h-full w-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                loading="lazy"
                title="Why Most Ads Fail — Creavix"
              />
            ) : (
              <Image
                src={ytThumb(VIDEO_ID, 'hqdefault')}
                alt="Why most ads fail — preview"
                fill
                sizes="320px"
                crossOrigin="anonymous"
                className="object-cover"
              />
            )}

            {!activated ? (
              <div className="pointer-events-none absolute inset-0 grid place-items-center bg-black/40">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-brand text-white shadow-glow">
                  <Play size={24} fill="currentColor" />
                </span>
              </div>
            ) : null}

            {activated ? (
              <button
                onClick={toggleMute}
                aria-label={muted ? 'Unmute video' : 'Mute video'}
                className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-black/90"
              >
                {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                {muted ? 'Sound On' : 'Mute'}
              </button>
            ) : null}
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-center backdrop-blur-sm">
            <p className="text-sm font-medium leading-6 text-white">{SUBTITLE_EN}</p>
            <p className="mt-1 font-bn text-sm leading-7 text-ash-300">{SUBTITLE_BN}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
