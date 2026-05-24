import type { MetadataRoute } from 'next';
import { SITE } from '../lib/site-data';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // ✅ API routes, private paths block করা হয়েছে
        disallow: ['/api/', '/_next/', '/static/'],
      },
      {
        // ✅ AI crawlers block — আপনার content যেন AI training-এ না যায়
        userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot', 'anthropic-ai', 'Claude-Web'],
        disallow: '/',
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
