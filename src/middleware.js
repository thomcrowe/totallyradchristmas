import { NextResponse } from 'next/server'

export function middleware(request) {
  // Generate a fresh nonce per request
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  // Strict CSP using nonce + strict-dynamic (no unsafe-inline for scripts)
  const csp = [
    `default-src 'self'`,
    // nonce covers Next.js inline scripts; strict-dynamic trusts scripts
    // they load (GA, FontAwesome kit, etc.) without explicit allowlisting
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

  // Studio needs unsafe-eval for Sanity's React runtime — give it a looser policy
  const studioCsp = [
    `default-src 'self'`,
    `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.sanity.io`,
    `style-src 'self' 'unsafe-inline' https://fonts.bunny.net https://ka-f.fontawesome.com`,
    `font-src 'self' https://fonts.bunny.net https://ka-f.fontawesome.com https://*.sanity.io`,
    `img-src 'self' data: blob: https://cdn.sanity.io https://cdn.raster.app`,
    `connect-src 'self' https://*.sanity.io wss://*.sanity.io`,
    `frame-src 'self' https://*.sanity.io`,
    `object-src 'none'`,
    `base-uri 'self'`,
  ].join('; ')

  const isStudio = request.nextUrl.pathname.startsWith('/studio')

  // Pass nonce to the layout via a request header
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)

  const response = NextResponse.next({ request: { headers: requestHeaders } })

  // Set security headers
  response.headers.set(
    'Content-Security-Policy',
    isStudio ? studioCsp : csp,
  )
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups')

  return response
}

export const config = {
  matcher: [
    // Apply to all routes except static files and images
    '/((?!_next/static|_next/image|favicon|.*\\.(?:png|jpg|ico|svg|webp|woff2?)).*)',
  ],
}
