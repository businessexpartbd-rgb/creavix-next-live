import './globals.css';
import { Playfair_Display, DM_Sans, Hind_Siliguri } from 'next/font/google';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { SITE } from '../data/site-data';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-playfair',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-dm-sans',
});

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-hind-siliguri',
});

export const metadata = {
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
    'Creavixit',
    'Creavix IT',
  ],
  authors: [{ name: SITE.founder.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: SITE.url },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline_en}`,
    description: SITE.shortDesc,
    url: SITE.url,
    locale: 'en_US',
    alternateLocale: 'bn_BD',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@creavixit',
    creator: '@creavixit',
    title: `${SITE.name} — ${SITE.tagline_en}`,
    description: SITE.shortDesc,
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
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050505',
};

export default function RootLayout({ children }) {
  const fontVars = [playfair.variable, dmSans.variable, hindSiliguri.variable].join(' ');

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
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-gold-400 focus:px-4 focus:py-2 focus:text-ink-950"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="bg-grain">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
      </body>
    </html>
  );
}
