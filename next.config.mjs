/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },

  // ✅ SEO & Speed: production build-এ console.log strip — error/warn রাখা হবে
  // privacy: PII ভুল করে log হলেও production-এ যাবে না
  compiler: {
    removeConsole: { exclude: ['error', 'warn'] },
  },

  images: {
    // ✅ AVIF first — সবচেয়ে ছোট file size, তারপর WebP fallback
    formats: ['image/avif', 'image/webp'],
    // ✅ Mobile-first device sizes — Bangladesh-এ mobile user বেশি
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // ✅ Minimum cache TTL 30 দিন
    minimumCacheTTL: 2592000,
    // ✅ Quality is set per <Image quality={...}/> — Next 15-এ root option valid না
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },

  // ✅ Experimental: faster builds + better CSS (critters package required)
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  },

  async headers() {
    const security = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-DNS-Prefetch-Control', value: 'on' },
      { key: 'X-Robots-Tag', value: 'index, follow' },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      },
      // ✅ Anti-blocking + isolation:
      // COOP/CORP help with cross-origin isolation; X-XSS legacy header
      { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
      { key: 'X-XSS-Protection', value: '1; mode=block' },
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          // YouTube, Google Maps script support
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://*.youtube.com https://www.google.com",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          // ✅ Tightened: http:// removed; whitelist only known image hosts
          "img-src 'self' data: blob: https://i.ytimg.com https://img.youtube.com https://images.unsplash.com https://www.google.com https://*.googleusercontent.com",
          "font-src 'self' https://fonts.gstatic.com data:",
          "frame-src 'self' https://*.youtube.com https://www.google.com https://www.google.com/maps",
          "connect-src 'self' https://*.youtube.com https://www.google.com https://api.anthropic.com https://api.resend.com https://challenges.cloudflare.com",
          "media-src 'self' https:",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "frame-ancestors 'self'",
          'upgrade-insecure-requests',
        ].join('; '),
      },
    ];

    return [
      // ✅ Static assets (JS/CSS/fonts) — ১ বছর cache, hash আছে তাই safe
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // ✅ Optimized images — ৩০ দিন cache + SWR
      {
        source: '/_next/image/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' },
        ],
      },
      // ✅ Public files (logo, OG, favicon) — ৭ দিন cache
      // Next.js path-to-regexp doesn't allow non-capturing groups, so we list extensions individually.
      ...['png', 'jpg', 'jpeg', 'gif', 'svg', 'ico', 'webp', 'avif', 'woff2', 'woff'].map(
        (ext) => ({
          source: `/:path*.${ext}`,
          headers: [
            { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' },
          ],
        }),
      ),
      // ✅ Sitemap + robots — ১ দিন cache
      {
        source: '/:path(sitemap\\.xml|robots\\.txt|manifest\\.webmanifest)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400' },
        ],
      },
      // ✅ HTML pages — must-revalidate to ensure fresh content after deploy
      {
        source: '/:path*',
        headers: [
          ...security,
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
