import { Play } from 'lucide-react';
import { ytThumb } from '../../data/site-data';

export default function VideoThumb({ id, title, ratio = '16/9', priority = false }) {
  const ratioClass = ratio === '9/16' ? 'aspect-[9/16]' : 'aspect-video';
  return (
    <a
      href={`https://www.youtube.com/watch?v=${id}`}
      target="_blank"
      rel="noreferrer"
      title={title}
      aria-label={`Watch ${title} on YouTube`}
      className={`group relative block overflow-hidden rounded-2xl border border-white/10 bg-ink-800 ${ratioClass}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ytThumb(id, ratio === '9/16' ? 'hqdefault' : 'maxresdefault')}
        alt={title}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent opacity-90 transition group-hover:opacity-100" />
      <div className="absolute inset-0 grid place-items-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-gold-400/95 text-ink-950 shadow-glow transition duration-300 group-hover:scale-110">
          <Play size={20} fill="currentColor" />
        </span>
      </div>
      {title ? (
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="line-clamp-2 text-sm font-medium text-white drop-shadow">{title}</p>
        </div>
      ) : null}
    </a>
  );
}
