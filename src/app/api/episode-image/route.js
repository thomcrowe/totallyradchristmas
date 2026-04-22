import { NextResponse } from 'next/server'
import sharp from 'sharp'

// Proxy + resize Buzzsprout episode artwork.
//
// Why a proxy? Buzzsprout requires the "?.jpg" suffix in the URL or returns
// a 403. Next.js Image optimizer strips query strings, causing every image
// to 404. Using unoptimized + this proxy gives us full control:
//   1. Fetch the full 1400×1400 JPEG from Buzzsprout (with correct URL)
//   2. Resize to the requested width with sharp
//   3. Return as WebP with long-lived cache headers
//
// The Image components use unoptimized={true} so the browser fetches this
// route directly — no double-proxy through /_next/image.

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const imageUrl = searchParams.get('url')
  const rawW = parseInt(searchParams.get('w') || '224', 10)
  // Cap at 640px — no need to serve larger than 2× the biggest display size
  const width = Math.min(Math.max(rawW, 40), 640)

  if (!imageUrl) {
    return new NextResponse('Missing url parameter', { status: 400 })
  }

  // Only proxy known Buzzsprout storage URLs
  if (!imageUrl.startsWith('https://storage.buzzsprout.com/')) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  try {
    const upstream = await fetch(imageUrl, {
      headers: { 'User-Agent': 'TotallyRadChristmas/1.0' },
      // Cache the upstream fetch at the Next.js data cache layer for 24 h
      next: { revalidate: 86400 },
    })

    if (!upstream.ok) {
      return new NextResponse('Image fetch failed', { status: upstream.status })
    }

    const buffer = Buffer.from(await upstream.arrayBuffer())

    // Resize and convert to WebP — dramatically smaller than the source JPEG
    const resized = await sharp(buffer)
      .resize(width, width, { fit: 'cover', position: 'centre' })
      .webp({ quality: 82 })
      .toBuffer()

    return new NextResponse(resized, {
      status: 200,
      headers: {
        'Content-Type': 'image/webp',
        // Cache at CDN/browser for 7 days, serve stale for 1 extra day
        'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
        'Vary': 'Accept',
      },
    })
  } catch (err) {
    console.error('[episode-image proxy]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
