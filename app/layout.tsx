import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Bebas_Neue, DM_Sans, Hind_Siliguri } from 'next/font/google';
import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { SITE } from '../lib/site-data';

// ✅ ChatBot lazy-loaded → ~10KB JS savings on initial page load.
//    Bundle goes into a separate chunk that loads after FCP.
const ChatBot = dynamic(() => import('./components/ChatBot'), {
  loading: () => null,
});

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bebas',
  preload: true,
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-dm-sans',
  preload: true,
});

const bangla = Hind_Siliguri({
  weight: ['400', '500', '600'],
  subsets: ['bengali'],
  display: 'swap',
  variable: '--font-bangla',
  preload: false,
});

// ✅ Mobile zoom DISABLED by default — desktop mode চালু করলে browser নিজেই
// viewport meta ignore করে, তখন zoom আবার কাজ করবে। App-like premium UX।
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#FAFAFA' },
    { media: '(prefers-color-scheme: light)', color: '#FAFAFA' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — AI Video Marketing Agency Bangladesh | Cinematic Ads`,
    template: `%s | ${SITE.name} — AI Video Agency BD`,
  },
  description:
    'বাংলাদেশের #১ AI ভিডিও মার্কেটিং এজেন্সি। Meta, YouTube ও TikTok-এর জন্য সিনেম্যাটিক ভিডিও অ্যাড। ২০১৪ থেকে ৪,৩০০+ প্রজেক্ট সম্পন্ন। ২৪ ঘণ্টায় ডেলিভারি।',
  applicationName: SITE.brand,
  keywords: [
    'AI video marketing agency Bangladesh',
    'video marketing agency Dhaka',
    'AI video ads Bangladesh',
    'cinematic video production Bangladesh',
    'YouTube shorts agency Bangladesh',
    'TikTok video ads Bangladesh',
    'Meta video ads Bangladesh',
    'Facebook video ad agency BD',
    'video production agency Savar Dhaka',
    'AI video ad agency 2024',
    'ভিডিও মার্কেটিং এজেন্সি বাংলাদেশ',
    'এআই ভিডিও অ্যাড ঢাকা',
    'সিনেম্যাটিক ভিডিও প্রোডাকশন',
    'Creavix',
    'Creavix IT Solution',
    'Creavixit',
    'Hannan Khan',
  ],
  authors: [{ name: SITE.founder.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  // ✅ Hreflang — Google-কে BN/EN audience signal
  alternates: {
    canonical: SITE.url,
    languages: {
      'en-US': SITE.url,
      'bn-BD': SITE.url,
      'x-default': SITE.url,
    },
  },
  // ✅ PWA manifest reference
  manifest: '/manifest.webmanifest',
  // ✅ Favicons:
  //  - favicon.ico (multi-res 16/32/48) → Google Search results + WhatsApp link
  //    preview thumbnail (the small icon next to the domain).
  //  - icon.png (96×96) → Google's recommended size for high-DPI search.
  //  - icon-192/512 → PWA + Android home screen.
  //  - apple-icon (180×180, padded with brand bg) → iOS home screen.
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '96x96' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: [{ url: '/favicon.ico' }],
  },
  openGraph: {
    type: 'website',
    siteName: `${SITE.name} IT Solution`,
    title: `${SITE.name} — AI Video Marketing Agency | Cinematic Ads Bangladesh`,
    description:
      "Bangladesh's #1 AI-powered video marketing agency. Cinematic ads for Meta, YouTube & TikTok. 4,300+ projects since 2014. 24h delivery.",
    url: SITE.url,
    locale: 'en_US',
    alternateLocale: ['bn_BD'],
    // ✅ Cache-bust filename: og-share.png (new URL → FB/WhatsApp/Twitter
    //    must re-fetch, ignoring all old caches automatically).
    images: [
      {
        url: '/share-card.jpg',
        width: 1200,
        height: 630,
        alt: `${SITE.name} — AI Video Marketing Agency Bangladesh`,
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@creavixit',
    creator: '@creavixit',
    title: `${SITE.name} — AI Video Marketing Agency Bangladesh`,
    description:
      "Bangladesh's premier AI-powered video studio. Cinematic ads for Meta, YouTube & TikTok. 4,300+ projects since 2014.",
    images: [
      {
        url: '/share-card.jpg',
        width: 1200,
        height: 630,
        alt: `${SITE.name} — AI Video Marketing Agency Bangladesh`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  category: 'Video Marketing',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  // ✅ Google Search Console verify করতে নিচের লাইনের comment সরিয়ে আপনার code বসান:
  // verification: { google: 'YOUR_GOOGLE_SITE_VERIFICATION_CODE' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const fontVars = [bebas.variable, dmSans.variable, bangla.variable].join(' ');

  // ✅ Organization + LocalBusiness + WebSite JSON-LD একসাথে (rich snippets)
  const orgLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
        '@id': `${SITE.url}/#organization`,
        name: SITE.name,
        legalName: SITE.brand,
        url: SITE.url,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE.url}/logo.png`,
          width: 500,
          height: 500,
        },
        image: `${SITE.url}/share-card.jpg`,
        description:
          "Bangladesh's premier AI-powered video marketing studio. Cinematic ads for Meta, YouTube and TikTok.",
        slogan: SITE.tagline_en,
        foundingDate: String(SITE.servingSince),
        founder: {
          '@type': 'Person',
          name: SITE.founder.name,
          jobTitle: SITE.founder.role_en,
        },
        knowsLanguage: ['en', 'bn'],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: SITE.hotline,
            contactType: 'customer service',
            areaServed: 'BD',
            availableLanguage: ['English', 'Bengali'],
          },
          {
            '@type': 'ContactPoint',
            telephone: SITE.whatsapp,
            contactType: 'sales',
            contactOption: 'TollFree',
            areaServed: 'BD',
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
        geo: {
          '@type': 'GeoCoordinates',
          latitude: String(SITE.geo.lat),
          longitude: String(SITE.geo.lng),
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
            opens: '10:00',
            closes: '20:00',
          },
        ],
        priceRange: '৳৳',
        currenciesAccepted: 'BDT',
        paymentAccepted: 'Cash, bKash, Nagad, Bank Transfer',
        areaServed: {
          '@type': 'Country',
          name: 'Bangladesh',
        },
        sameAs: [
          'https://www.facebook.com/CreavixITSolution',
          'https://www.instagram.com/creavixitsolution',
          'https://www.youtube.com/@CreavixiTsolution',
          'https://www.tiktok.com/@creavixitsolution',
          'https://www.linkedin.com/in/creavix-it-solution',
          'https://x.com/creavixit',
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '6',
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        url: SITE.url,
        name: `${SITE.name} — AI Video Marketing Agency`,
        description:
          "Bangladesh's #1 AI video marketing agency. Cinematic ads for Meta, YouTube & TikTok.",
        publisher: { '@id': `${SITE.url}/#organization` },
        inLanguage: ['en-US', 'bn-BD'],
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE.url}/?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <html lang="en" className={fontVars} suppressHydrationWarning>
      <head>
        {/* ✅ Performance: DNS prefetch + preconnect for third-party origins */}
        <link rel="dns-prefetch" href="//i.ytimg.com" />
        <link rel="dns-prefetch" href="//www.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* ✅ Hreflang explicit links (some crawlers prefer link-rel over header) */}
        <link rel="alternate" hrefLang="en-US" href={SITE.url} />
        <link rel="alternate" hrefLang="bn-BD" href={SITE.url} />
        <link rel="alternate" hrefLang="x-default" href={SITE.url} />
      </head>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-ash-50"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <ChatBot />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
      </body>
    </html>
  );
}
