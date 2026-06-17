'use client';

import { ReactNode } from 'react';
import {
  Camera,
  Film,
  Play,
  Wrench,
  Mic,
  Cpu,
  Grid3x3,
  MapPin,
  Tag,
  Star,
  MessageCircle,
} from 'lucide-react';

export type HeroTheme =
  | 'home'
  | 'services'
  | 'portfolio'
  | 'about'
  | 'pricing'
  | 'contact'
  | 'reviews';

interface HeroSectionProps {
  theme: HeroTheme;
  /** Bebas-Neue uppercase background watermark (huge, brand-tinted) */
  watermark?: string;
  children: ReactNode;
}

/**
 * Per-page hero animation rig.
 * - Home: floating camera + spinning film reel + pulsing play button
 * - Services: floating tool icons (AI, Camera, Mic)
 * - Portfolio: video grid mosaic icon
 * - About: location pin + team-silhouette dots
 * - Pricing: price tag + star rating
 * - Contact: WhatsApp pulse + map pin
 * - Reviews: stars
 *
 * Each rig is ABSOLUTELY positioned behind the children so page content
 * stays untouched. Mobile-safe: hidden below md to avoid clutter.
 */
export default function HeroSection({ theme, watermark, children }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-40">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-brand" />

      {/* Big watermark text */}
      {watermark ? (
        <div className="hero-watermark">
          <span>{watermark}</span>
        </div>
      ) : null}

      {/* Per-page floating decoration */}
      <ThemeRig theme={theme} />

      <div className="container-x relative">{children}</div>
    </section>
  );
}

function ThemeRig({ theme }: { theme: HeroTheme }) {
  switch (theme) {
    case 'home':
      return (
        <div className="pointer-events-none absolute inset-0 -z-[1] hidden md:block">
          <Camera className="absolute right-[6%] top-[18%] h-14 w-14 animate-float text-warm-accent/40" />
          <Film
            className="absolute right-[18%] top-[32%] h-16 w-16 animate-spin-slow text-warm-fg/8"
            strokeWidth={1.2}
          />
          <Play
            className="absolute right-[12%] top-[58%] h-12 w-12 animate-pulse-glow text-warm-accent/35"
            fill="currentColor"
          />
        </div>
      );
    case 'services':
      return (
        <div className="pointer-events-none absolute inset-0 -z-[1] hidden md:block">
          <Cpu className="absolute right-[6%] top-[20%] h-12 w-12 animate-float text-warm-accent/40" />
          <Camera className="absolute right-[20%] top-[36%] h-12 w-12 animate-float text-warm-fg/15" />
          <Mic className="absolute right-[12%] top-[60%] h-12 w-12 animate-float text-warm-accent/30" />
          <Wrench className="absolute right-[26%] top-[18%] h-9 w-9 animate-spin-slow text-warm-fg/15" />
        </div>
      );
    case 'portfolio':
      return (
        <div className="pointer-events-none absolute inset-0 -z-[1] hidden md:block">
          <Grid3x3 className="absolute right-[6%] top-[24%] h-20 w-20 animate-float text-warm-accent/30" />
          <Play
            className="absolute right-[20%] top-[44%] h-12 w-12 animate-pulse-glow text-warm-accent/40"
            fill="currentColor"
          />
          <Film
            className="absolute right-[12%] top-[64%] h-14 w-14 animate-spin-slow text-warm-fg/10"
            strokeWidth={1.2}
          />
        </div>
      );
    case 'about':
      return (
        <div className="pointer-events-none absolute inset-0 -z-[1] hidden md:block">
          <MapPin className="absolute right-[6%] top-[22%] h-14 w-14 animate-float text-warm-accent/40" />
          <span className="absolute right-[18%] top-[48%] flex gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-3 w-3 animate-pulse rounded-full bg-warm-accent/50"
                style={{ animationDelay: `${i * 200}ms` }}
              />
            ))}
          </span>
        </div>
      );
    case 'pricing':
      return (
        <div className="pointer-events-none absolute inset-0 -z-[1] hidden md:block">
          <Tag className="absolute right-[6%] top-[22%] h-14 w-14 animate-float text-warm-accent/40" />
          <div className="absolute right-[14%] top-[48%] flex gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                className="h-5 w-5 animate-pulse text-yellow-400"
                fill="currentColor"
                style={{ animationDelay: `${i * 120}ms` }}
              />
            ))}
          </div>
        </div>
      );
    case 'contact':
      return (
        <div className="pointer-events-none absolute inset-0 -z-[1] hidden md:block">
          <MessageCircle className="absolute right-[6%] top-[22%] h-14 w-14 animate-pulse-glow text-warm-accent/45" />
          <MapPin className="absolute right-[18%] top-[50%] h-12 w-12 animate-float text-warm-fg/15" />
        </div>
      );
    case 'reviews':
      return (
        <div className="pointer-events-none absolute inset-0 -z-[1] hidden md:block">
          <div className="absolute right-[8%] top-[26%] flex gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                className="h-7 w-7 animate-pulse text-yellow-400"
                fill="currentColor"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
}
