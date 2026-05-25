import type { MetadataRoute } from 'next';
import { SITE } from '../lib/site-data';

// ✅ PWA manifest — installability + better SEO score on Lighthouse
// Generates /manifest.webmanifest at build time
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — AI Video Marketing Agency Bangladesh`,
    short_name: SITE.name,
    description:
      "Bangladesh's #1 AI-powered video marketing agency. Cinematic ads for Meta, YouTube & TikTok.",
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#0A0A0F',
    theme_color: '#0A0A0F',
    lang: 'en-US',
    dir: 'ltr',
    categories: ['business', 'productivity', 'marketing'],
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
