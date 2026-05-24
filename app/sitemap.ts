import type { MetadataRoute } from 'next';
import { SITE } from '../lib/site-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ✅ আলাদা আলাদা lastModified — Google-কে বুঝতে সাহায্য করে কোন পেজ কতটা fresh
  return [
    {
      url: `${SITE.url}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE.url}/services`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${SITE.url}/pricing`,
      lastModified: now,
      changeFrequency: 'weekly',
      // ✅ Pricing পেজ বেশি important — সরাসরি conversion
      priority: 0.95,
    },
    {
      url: `${SITE.url}/portfolio`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE.url}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      // ✅ Contact পেজ high priority — lead generation
      priority: 0.9,
    },
    {
      url: `${SITE.url}/reviews`,
      lastModified: now,
      // ✅ Reviews প্রতিদিন আসে তাই daily
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${SITE.url}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
