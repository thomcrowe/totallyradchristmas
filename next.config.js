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
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin',
          },
          {
            // Strict CSP — allows the Sanity Studio, FontAwesome, analytics, and fonts
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // Scripts: self + FontAwesome kit + Vercel analytics + Google Analytics + Sanity Studio inline
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://kit.fontawesome.com https://va.vercel-scripts.com https://*.sanity.io https://www.googletagmanager.com https://www.google-analytics.com",
              // Styles: self + inline (Tailwind) + Bunny Fonts + FontAwesome
              "style-src 'self' 'unsafe-inline' https://fonts.bunny.net https://ka-f.fontawesome.com",
              // Fonts
              "font-src 'self' https://fonts.bunny.net https://ka-f.fontawesome.com",
              // Images: self + episode artwork + Sanity CDN + OpenGraph assets
              "img-src 'self' data: blob: https://storage.buzzsprout.com https://cdn.sanity.io https://cdn.raster.app https://covers.openlibrary.org https://images.teepublic.com",
              // Audio: Buzzsprout
              "media-src 'self' https://*.buzzsprout.com https://www.buzzsprout.com",
              // API calls: Sanity, Vercel Analytics, Google Analytics
              "connect-src 'self' https://*.sanity.io https://va.vercel-scripts.com https://vitals.vercel-insights.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com",
              // Frames: Sanity Studio embeds
              "frame-src 'self' https://*.sanity.io",
              // Block object/embed
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
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
