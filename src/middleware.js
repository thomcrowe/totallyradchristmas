import { NextResponse } from 'next/server'

export function middleware(request) {
  // Skip middleware entirely for the Sanity Studio — it manages its own
  // security and our headers interfere with iframes + unsafe-eval it needs.
  if (request.nextUrl.pathname.startsWith('/studio')) {
    return NextResponse.next()
  }

  // Generate a fresh nonce per request
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  // Strict CSP for public pages
  const csp = [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    `style-src 'self' 'unsafe-inline' https://fonts.bunny.net https://ka-f.fontawesome.com`,
    `font-src 'self' https://fonts.bunny.net https://ka-f.fontawesome.com`,
    `img-src 'self' data: blob: https://storage.buzzsprout.com https://cdn.sanity.io https://cdn.raster.app https://covers.openlibrary.org https://images.teepublic.com`,
    `media-src 'self' https://*.buzzsprout.com https://www.buzzsprout.com`,
    `connect-src 'self' https://*.sanity.io https://va.vercel-scripts.com https://vitals.vercel-insights.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com`,
    `frame-src 'none'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `upgrade-insecure-requests`,
  ].join('; ')

  // Pass nonce to the layout via a request header
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)

  const response = NextResponse.next({ request: { headers: requestHeaders } })

  response.headers.set('Content-Security-Policy', csp)
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups')

  return response
}

export const config = {
  matcher: [
    // Apply to all routes except static files, images, and the Sanity studio
    '/((?!_next/static|_next/image|favicon|studio|.*\\.(?:png|jpg|ico|svg|webp|woff2?)).*)',
  ],
}
