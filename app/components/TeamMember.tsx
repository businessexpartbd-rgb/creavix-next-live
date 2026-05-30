'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SOCIAL_ICON_MAP } from './SocialIcons';

interface TeamMemberProps {
  name: string;
  title_en: string;
  title_bn: string;
  description_bn: string;
  description_en?: string;
  image: string;
  imageAlt: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  delay?: number;
}

export default function TeamMember({
  name,
  title_en,
  title_bn,
  description_bn,
  description_en,
  image,
  imageAlt,
  facebookUrl,
  linkedinUrl,
  delay = 0,
}: TeamMemberProps) {
  return (
    <div
      className="animate-fade-in"
      style={{
        animation: `fadeIn 0.6s ease-out forwards`,
        animationDelay: `${delay}ms`,
        opacity: 0,
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="group relative">
        <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand/20 via-brand/5 to-transparent opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

        <div className="overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 group-hover:border-brand/40">
          {/* Image container with optimized image */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-ash-800 to-ink-900">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={delay === 0}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>

          {/* Content */}
          <div className="relative p-6 sm:p-8">
            <h3 className="font-display text-2xl sm:text-3xl tracking-[0.02em] text-white">
              {name}
            </h3>

            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-brand">
              {title_en}
            </p>
            <p className="font-bn text-sm text-ash-300 uppercase tracking-[0.12em]">
              {title_bn}
            </p>

            {/* Descriptions */}
            <p className="font-bn mt-4 text-sm leading-6 text-ash-200">
              {description_bn}
            </p>
            {description_en && (
              <p className="mt-3 text-sm leading-6 text-ash-300">
                {description_en}
              </p>
            )}

            {/* Social links */}
            {(facebookUrl || linkedinUrl) && (
              <div className="mt-6 flex gap-3">
                {facebookUrl && (
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${name} on Facebook`}
                    title="Facebook"
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-ash-300 transition-all hover:border-brand/60 hover:bg-brand hover:text-white hover:scale-110"
                  >
                    {SOCIAL_ICON_MAP.facebook && (
                      <SOCIAL_ICON_MAP.facebook className="h-4 w-4" />
                    )}
                  </a>
                )}
                {linkedinUrl && (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${name} on LinkedIn`}
                    title="LinkedIn"
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-ash-300 transition-all hover:border-brand/60 hover:bg-brand hover:text-white hover:scale-110"
                  >
                    {SOCIAL_ICON_MAP.linkedin && (
                      <SOCIAL_ICON_MAP.linkedin className="h-4 w-4" />
                    )}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
