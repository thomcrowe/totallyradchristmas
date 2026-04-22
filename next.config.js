/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'cdn.raster.app',
      },
      // Buzzsprout images now route through /api/episode-image proxy,
      // but keep this in case any direct references remain
      {
        protocol: 'https',
        hostname: 'storage.buzzsprout.com',
      },
      {
        protocol: 'https',
        hostname: 'covers.openlibrary.org',
      },
      {
        protocol: 'https',
        hostname: 'images.teepublic.com',
      },
    ],
  },

  async headers() {
    // Security headers and CSP are handled in src/middleware.js so
    // they can include per-request nonces. Only cache headers remain here.
    return [
      {
        // Long-term cache for Next.js static assets (hashed filenames)
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache favicons and public images for a week
        source: '/(favicon\\.ico|favicon-.*\\.png|apple-touch-icon\\.png|og-image\\.jpg|icon-.*\\.png)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
