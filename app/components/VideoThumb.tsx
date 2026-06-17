'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { ytThumb } from '../../lib/site-data';

interface VideoThumbProps {
  id: string;
  title?: string;
  ratio?: '16/9' | '9/16';
  /** Mount the iframe immediately on first viewport entry (true) instead
   *  of waiting for a click. Used by the hero auto-play spot. */
  embed?: boolean;
  /** Eager-load the thumbnail image — pass true on the LCP candidate. */
  priority?: boolean;
}

/**
 * Click-to-play YouTube thumbnail with auto-pause-on-scroll-out.
 *
 *   ① Visitor sees a static thumbnail (next/image, lazy by default).
 *   ② On click → iframe mounts with autoplay=1 → video plays.
 *   ③ As soon as it scrolls out of view (>60% off-screen) → iframe is
 *      sent the YouTube IFrame-API "pauseVideo" command. When the
 *      visitor scrolls back, the video stays paused at the same frame
 *      so playback resumes only when they click play again.
 *   ④ When ANY other VideoThumb on the page starts playing, every
 *      other one immediately pauses (single-channel feel, matching
 *      AdInsightVideo).
 *   ⑤ Tab switch / window blur also pauses (mobile background switch).
 */
export default function VideoThumb({
  id,
  title = 'Featured video',
  ratio = '16/9',
  embed = false,
  priority = false,
}: VideoThumbProps) {
  const ratioClass = ratio === '9/16' ? 'aspect-[9/16]' : 'aspect-video';
  const [active, setActive] = useState(embed);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const containerRef = useRef<HTMLDivElement | HTMLButtonElement | null>(null);

  const pauseIframe = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
      '*',
    );
  }, []);

  /* ── Pause on scroll-out (works for both click and embed activation).
     Re-runs when `active` flips so we track the new container element
     after the button → div swap. */
  useEffect(() => {
    if (!active || typeof IntersectionObserver === 'undefined') return;
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.4) {
            pauseIframe();
          }
        }
      },
      { threshold: [0, 0.4, 0.6, 1] },
    );
    obs.observe(el);

    const onVisibility = () => {
      if (document.hidden) pauseIframe();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      obs.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [active, pauseIframe]);

  /* ── Pause when another video on the page starts playing ── */
  useEffect(() => {
    if (!active) return;
    const onPlay = (e: Event) => {
      const detail = (e as CustomEvent<{ id: string }>).detail;
      if (detail?.id !== id) pauseIframe();
    };
    window.addEventListener('creavix:video-play', onPlay as EventListener);
    return () =>
      window.removeEventListener('creavix:video-play', onPlay as EventListener);
  }, [active, id, pauseIframe]);

  const onActivate = () => {
    setActive(true);
    window.dispatchEvent(new CustomEvent('creavix:video-play', { detail: { id } }));
  };

  if (active) {
    return (
      <div
        ref={(el) => {
          containerRef.current = el;
        }}
        className={`relative overflow-hidden rounded-card border border-warm-fg/10 bg-ink-800 ${ratioClass}`}
      >
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${id}?enablejsapi=1&rel=0&modestbranding=1&playsinline=1&autoplay=1`}
          title={title}
          loading={priority ? 'eager' : 'lazy'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  // Static thumbnail — high-DPI WebP via next/image, lazy by default.
  const thumbSrc = ytThumb(id, ratio === '9/16' ? 'hqdefault' : 'maxresdefault');
  return (
    <button
      type="button"
      ref={(el) => {
        containerRef.current = el;
      }}
      onClick={onActivate}
      title={title}
      aria-label={`Play ${title}`}
      className={`group relative block w-full overflow-hidden rounded-card border border-warm-fg/10 bg-ink-800 ${ratioClass}`}
    >
      <Image
        src={thumbSrc}
        alt={title}
        fill
        sizes={
          ratio === '9/16'
            ? '(max-width: 640px) 50vw, 300px'
            : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px'
        }
        priority={priority}
        className="object-cover transition duration-700 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent opacity-90 transition group-hover:opacity-100" />
      <div className="absolute inset-0 grid place-items-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-warm-accent text-warm-fg shadow-glow transition duration-300 group-hover:scale-110">
          <Play size={20} fill="currentColor" />
        </span>
      </div>
      {title ? (
        <div className="absolute inset-x-0 bottom-0 p-4 text-left">
          <p className="line-clamp-2 text-sm font-medium text-warm-fg drop-shadow">{title}</p>
        </div>
      ) : null}
    </button>
  );
}
