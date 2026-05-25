import type { MetadataRoute } from 'next';
import { SITE } from '../lib/site-data';

// ✅ Sitemap with images — Google Image Search-এ ranking improve হবে
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const ogImage = `${SITE.url}/og-share.png`;

  return [
    {
      url: `${SITE.url}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [ogImage, `${SITE.url}/logo.png`],
      alternates: {
        languages: {
          en: `${SITE.url}/`,
          bn: `${SITE.url}/`,
        },
      },
    },
    {
      url: `${SITE.url}/services`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
      images: [ogImage],
    },
    {
      url: `${SITE.url}/pricing`,
      lastModified: now,
      changeFrequency: 'weekly',
      // ✅ Pricing page = direct conversion intent
      priority: 0.95,
      images: [ogImage],
    },
    {
      url: `${SITE.url}/portfolio`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [ogImage],
    },
    {
      url: `${SITE.url}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      // ✅ Contact = lead generation
      priority: 0.9,
      images: [ogImage],
    },
    {
      url: `${SITE.url}/reviews`,
      lastModified: now,
      // ✅ Reviews update daily
      changeFrequency: 'daily',
      priority: 0.8,
      images: [ogImage],
    },
    {
      url: `${SITE.url}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      images: [ogImage],
    },
  ];
}
