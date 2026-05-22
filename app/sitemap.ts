import type { MetadataRoute } from 'next';
import { SITE } from '../lib/site-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE.url}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE.url}/services`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE.url}/portfolio`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE.url}/about`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE.url}/pricing`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/reviews`, lastModified, changeFrequency: 'daily', priority: 0.7 },
    { url: `${SITE.url}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
  ];
}
