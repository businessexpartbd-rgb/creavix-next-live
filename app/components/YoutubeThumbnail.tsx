'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';

interface YoutubeThumbnailProps {
  videoId: string;
  title: string;
  duration?: string;
  className?: string;
  clickable?: boolean;
}

/**
 * YouTube video thumbnail with premium play button overlay.
 * Displays YouTube thumbnail and overlays an interactive play button.
 * Links directly to YouTube if clickable is true.
 */
export default function YoutubeThumbnail({
  videoId,
  title,
  duration,
  className = '',
  clickable = true,
}: YoutubeThumbnailProps) {
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  const content = (
    <div
      className={`group relative overflow-hidden rounded-card bg-ink-800 ${className}`}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          crossOrigin="anonymous"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
          }}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-accent-primary/20 rounded-full blur-2xl group-hover:bg-accent-primary/40 transition-all duration-300" />
            <div className="relative grid h-16 w-16 place-items-center rounded-full bg-accent-primary text-on-dark shadow-glow transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow-lg">
              <Play size={24} fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Duration badge */}
        {duration && (
          <div className="absolute bottom-3 right-3 bg-black/70 px-2 py-1 rounded text-xs font-semibold text-on-dark">
            {duration}
          </div>
        )}
      </div>

      {/* Title overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-4 py-3 sm:px-5 sm:py-4">
        <p className="text-sm font-semibold text-on-dark line-clamp-2">{title}</p>
      </div>
    </div>
  );

  if (!clickable) return content;

  return (
    <Link href={youtubeUrl} target="_blank" rel="noreferrer">
      {content}
    </Link>
  );
}
