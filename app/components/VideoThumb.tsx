'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { ytThumb } from '../../lib/site-data';

interface VideoThumbProps {
  id: string;
  title?: string;
  ratio?: '16/9' | '9/16';
  embed?: boolean;
  priority?: boolean;
}

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
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Pause when scrolled out of view
  useEffect(() => {
    if (!embed || typeof IntersectionObserver === 'undefined') return;
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && iframeRef.current) {
            iframeRef.current.contentWindow?.postMessage(
              JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
              '*',
            );
          }
        });
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [embed]);

  // Pause when another video plays
  useEffect(() => {
    const onPlay = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.id !== id && iframeRef.current) {
        iframeRef.current.contentWindow?.postMessage(
          JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
          '*',
        );
      }
    };
    window.addEventListener('creavix:video-play' as any, onPlay);
    return () => window.removeEventListener('creavix:video-play' as any, onPlay);
  }, [id]);

  const onActivate = () => {
    setActive(true);
    window.dispatchEvent(new CustomEvent('creavix:video-play', { detail: { id } }));
  };

  if (active) {
    return (
      <div
        ref={containerRef}
        className={`relative overflow-hidden rounded-card border border-white/10 bg-ink-800 ${ratioClass}`}
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

  // ✅ FIX: <img> এর বদলে next/image ব্যবহার করা হয়েছে
  // এতে LCP score উন্নত হবে, lazy loading সঠিকভাবে কাজ করবে
  // priority={true} হলে preload হবে — hero video-এর জন্য দরকারি
  const thumbSrc = ytThumb(id, ratio === '9/16' ? 'hqdefault' : 'maxresdefault');

  return (
    <button
      type="button"
      ref={(el) => {
        containerRef.current = el as unknown as HTMLDivElement;
      }}
      onClick={onActivate}
      title={title}
      aria-label={`Play ${title}`}
      className={`group relative block w-full overflow-hidden rounded-card border border-white/10 bg-ink-800 ${ratioClass}`}
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
        <span className="grid h-14 w-14 place-items-center rounded-full bg-brand text-white shadow-glow transition duration-300 group-hover:scale-110">
          <Play size={20} fill="currentColor" />
        </span>
      </div>
      {title ? (
        <div className="absolute inset-x-0 bottom-0 p-4 text-left">
          <p className="line-clamp-2 text-sm font-medium text-white drop-shadow">{title}</p>
        </div>
      ) : null}
    </button>
  );
}
