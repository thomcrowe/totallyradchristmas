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
    // Shared non-CSP security headers applied to every route
    const baseHeaders = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'X-XSS-Protection', value: '1; mode=block' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
      { key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' },
    ]

    // Strict CSP for all public-facing pages (no unsafe-eval)
    const publicCsp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://kit.fontawesome.com https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.bunny.net https://ka-f.fontawesome.com",
      "font-src 'self' https://fonts.bunny.net https://ka-f.fontawesome.com",
      "img-src 'self' data: blob: https://storage.buzzsprout.com https://cdn.sanity.io https://cdn.raster.app https://covers.openlibrary.org https://images.teepublic.com",
      "media-src 'self' https://*.buzzsprout.com https://www.buzzsprout.com",
      "connect-src 'self' https://*.sanity.io https://va.vercel-scripts.com https://vitals.vercel-insights.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join('; ')

    // Loose CSP for Sanity Studio — requires unsafe-eval for its React runtime
    const studioCsp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.sanity.io https://kit.fontawesome.com",
      "style-src 'self' 'unsafe-inline' https://fonts.bunny.net https://ka-f.fontawesome.com",
      "font-src 'self' https://fonts.bunny.net https://ka-f.fontawesome.com https://*.sanity.io",
      "img-src 'self' data: blob: https://cdn.sanity.io https://cdn.raster.app",
      "connect-src 'self' https://*.sanity.io wss://*.sanity.io",
      "frame-src 'self' https://*.sanity.io",
      "object-src 'none'",
      "base-uri 'self'",
    ].join('; ')

    return [
      {
        // Strict headers for all public routes
        source: '/((?!studio).*)',
        headers: [
          ...baseHeaders,
          { key: 'Content-Security-Policy', value: publicCsp },
        ],
      },
      {
        // Relaxed headers for Sanity Studio
        source: '/studio(.*)',
        headers: [
          ...baseHeaders,
          { key: 'Content-Security-Policy', value: studioCsp },
        ],
      },
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
