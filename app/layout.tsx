import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Bebas_Neue, DM_Sans, Hind_Siliguri } from 'next/font/google';
import { ReactNode } from 'react';
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // ✅ FIX: userScalable false হলে Google mobile SEO score কমে যায়
  // maximumScale 5 রাখলে zoom করা যাবে, Google happy থাকবে
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0A0A0F',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — AI Video Marketing Agency Bangladesh | Cinematic Ads`,
    template: `%s | ${SITE.name} — AI Video Agency BD`,
  },
  description:
    "বাংলাদেশের #১ AI ভিডিও মার্কেটিং এজেন্সি। Meta, YouTube ও TikTok-এর জন্য সিনেম্যাটিক ভিডিও অ্যাড। ২০১৪ থেকে ৪,৩০০+ প্রজেক্ট সম্পন্ন। ২৪ ঘণ্টায় ডেলিভারি।",
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
  alternates: { canonical: SITE.url },
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png', sizes: '500x500' }],
    apple: [{ url: '/apple-icon.png', sizes: '500x500', type: 'image/png' }],
    shortcut: ['/icon.png'],
  },
  openGraph: {
    type: 'website',
    siteName: `${SITE.name} IT Solution`,
    title: `${SITE.name} — AI Video Marketing Agency | Cinematic Ads Bangladesh`,
    description:
      "Bangladesh's #1 AI-powered video marketing agency. Cinematic ads for Meta, YouTube & TikTok. 4,300+ projects since 2014. 24h delivery.",
    url: SITE.url,
    locale: 'en_US',
    alternateLocale: 'bn_BD',
    images: [
      {
        url: '/opengraph-image.png',
        // ✅ FIX: OG image 1200x630 হওয়া উচিত — Facebook/LinkedIn এর জন্য standard
        width: 1200,
        height: 630,
        alt: `${SITE.name} — AI Video Marketing Agency Bangladesh`,
        type: 'image/png',
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
  // ✅ Google Search Console verify করতে নিচের লাইনের comment সরিয়ে আপনার code বসান:
  // verification: { google: 'YOUR_GOOGLE_SITE_VERIFICATION_CODE' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const fontVars = [bebas.variable, dmSans.variable, bangla.variable].join(' ');

  // ✅ IMPROVED: Organization + LocalBusiness + WebSite JSON-LD একসাথে
  const orgLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'LocalBusiness'],
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
        image: `${SITE.url}/opengraph-image.png`,
        description:
          "Bangladesh's premier AI-powered video marketing studio. Cinematic ads for Meta, YouTube and TikTok.",
        foundingDate: String(SITE.servingSince),
        founder: {
          '@type': 'Person',
          name: SITE.founder.name,
        },
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
          latitude: '23.8759',
          longitude: '90.2674',
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
        publisher: {
          '@id': `${SITE.url}/#organization`,
        },
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
        {/* ✅ DNS prefetch — YouTube thumbnail দ্রুত লোড হবে */}
        <link rel="dns-prefetch" href="//i.ytimg.com" />
        <link rel="dns-prefetch" href="//www.youtube.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
      </body>
    </html>
  );
}
