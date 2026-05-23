import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Bebas_Neue, DM_Sans, Hind_Siliguri } from 'next/font/google';
import { ReactNode } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ChatBot from './components/ChatBot';
import { SITE } from '../lib/site-data';

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bebas',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-dm-sans',
});

const bangla = Hind_Siliguri({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['bengali'],
  display: 'swap',
  variable: '--font-bangla',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0A0A0F',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline_en} in Bangladesh`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.shortDesc,
  keywords: [
    'AI video marketing agency Bangladesh',
    'video marketing agency Dhaka',
    'AI video ads Bangladesh',
    'cinematic video production',
    'YouTube shorts agency',
    'TikTok video ads',
    'Meta video ads',
    'ভিডিও মার্কেটিং এজেন্সি',
    'এআই ভিডিও অ্যাড',
    'Creavix',
    'Creavix IT Solution',
    'Creavixit',
  ],
  authors: [{ name: SITE.founder.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: SITE.url },
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png', sizes: '500x500' }],
    apple: [{ url: '/apple-icon.png', sizes: '500x500', type: 'image/png' }],
    shortcut: ['/icon.png'],
  },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline_en}`,
    description: SITE.shortDesc,
    url: SITE.url,
    locale: 'en_US',
    alternateLocale: 'bn_BD',
    images: [
      {
        url: '/opengraph-image.png',
        width: 500,
        height: 500,
        alt: `${SITE.name} — ${SITE.tagline_en}`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@creavixit',
    creator: '@creavixit',
    title: `${SITE.name} — ${SITE.tagline_en}`,
    description: SITE.shortDesc,
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  category: 'Video Marketing',
  // verification: { google: 'PASTE_YOUR_GSC_CODE_HERE' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const fontVars = [bebas.variable, dmSans.variable, bangla.variable].join(' ');

  // Organization JSON-LD for SEO
  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    legalName: SITE.brand,
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    foundingDate: String(SITE.servingSince),
    founder: { '@type': 'Person', name: SITE.founder.name },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE.hotline,
        contactType: 'customer service',
        areaServed: 'BD',
        availableLanguage: ['English', 'Bengali'],
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Hemayetpur',
      addressLocality: 'Savar',
      addressRegion: 'Dhaka',
      postalCode: '1340',
      addressCountry: 'BD',
    },
    sameAs: [
      'https://www.facebook.com/CreavixITSolution',
      'https://www.instagram.com/creavixitsolution',
      'https://www.youtube.com/@CreavixiTsolution',
      'https://www.tiktok.com/@creavixitsolution',
      'https://www.linkedin.com/in/creavix-it-solution',
      'https://x.com/creavixit',
    ],
  };

  return (
    <html lang="en" className={fontVars} suppressHydrationWarning>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="grain">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <ChatBot />
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
      </body>
    </html>
  );
}
