import { NextResponse } from 'next/server'

// Proxy Buzzsprout episode artwork so Next.js Image can optimize it.
// Buzzsprout requires the exact URL including "?.jpg" suffix — stripping
// the query string causes a 403, so we can't use the built-in optimizer
// directly. This route fetches the image and re-serves it from our domain
// with long-lived cache headers, enabling full Next.js optimization.

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const imageUrl = searchParams.get('url')

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
      next: { revalidate: 86400 }, // cache upstream fetch for 24 h
    })

    if (!upstream.ok) {
      return new NextResponse('Image fetch failed', { status: upstream.status })
    }

    const contentType = upstream.headers.get('content-type') ?? 'image/jpeg'
    const body = await upstream.arrayBuffer()

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        // Cache at the edge for 7 days, stale-while-revalidate for 1 day
        'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
      },
    })
  } catch {
    return new NextResponse('Internal error', { status: 500 })
  }
}
