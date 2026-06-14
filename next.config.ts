import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Enable React strict mode for better debugging
  reactStrictMode: true,

  // Optimize fonts
  optimizeFonts: true,

  // Compress generated files
  compress: true,

  // PoweredByHeader: Remove the X-Powered-By header
  poweredByHeader: false,

  // Enable SWR for static pages
  staticPageGenerationTimeout: 120,

  // Optimize production builds
  productionBrowserSourceMaps: false,
  swcMinify: true,

  // Webpack optimization
  webpack: (config, { isServer }) => {
    // Minimize main bundle
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            // Separate vendor chunks
            default: false,
            vendors: false,
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            common: {
              minChunks: 2,
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      };
    }
    return config;
  },

  // Headers for performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Redirects (example)
  async redirects() {
    return [];
  },
};

export default nextConfig;
