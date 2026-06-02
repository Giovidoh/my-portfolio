import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // SVG imports are converted to React components via SVGR.
  // Turbopack (default in Next 16) runs the @svgr/webpack loader through this rule.
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  experimental: {
    // Recommended by Sanity to avoid SanityLive prefetch/request overages on Next 16.
    prefetchInlining: true,
  },

  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
