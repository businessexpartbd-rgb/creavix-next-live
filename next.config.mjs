/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },

  images: {
    // ✅ AVIF first — সবচেয়ে ছোট file size, তারপর WebP fallback
    formats: ['image/avif', 'image/webp'],
    // ✅ Mobile-first device sizes — Bangladesh-এ mobile user বেশি
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // ✅ Image quality 75 → 80 (ভালো দেখাবে, size খুব বেশি বাড়বে না)
    quality: 80,
    // ✅ Minimum cache TTL 30 দিন
    minimumCacheTTL: 2592000,
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },

  // ✅ Experimental: faster builds + better CSS
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
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      },
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://*.youtube.com https://www.google.com",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "img-src 'self' data: blob: https: http:",
          "font-src 'self' https://fonts.gstatic.com data:",
          "frame-src 'self' https://*.youtube.com https://www.google.com https://www.google.com/maps",
          "connect-src 'self' https://*.youtube.com https://www.google.com https://api.anthropic.com https://api.resend.com",
          "media-src 'self' https:",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "frame-ancestors 'self'",
          "upgrade-insecure-requests",
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
      // ✅ Images — ৩০ দিন cache
      {
        source: '/_next/image/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' },
        ],
      },
      // ✅ Public files (logo, icons, OG images) — ৭ দিন cache
      {
        source: '/(:path(.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|avif|woff2|woff)))',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' },
        ],
      },
      // ✅ Sitemap + robots — ১ দিন cache
      {
        source: '/:path(sitemap\\.xml|robots\\.txt)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400' },
        ],
      },
      // ✅ HTML pages — stale-while-revalidate ব্যবহার করব (no-store এর চেয়ে ভালো)
      // পেজ দ্রুত লোড হবে, নতুন deploy-এও ঠিক থাকবে
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
