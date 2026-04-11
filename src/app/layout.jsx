import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import '@/styles/tailwind.css'

export const metadata = {
  metadataBase: new URL('https://totallyradchristmas.com'),
  title: {
    template: '%s - Totally Rad Christmas!',
    default: 'Totally Rad Christmas! - Christmas in the \'80s to the Max',
  },
  description:
    'A podcast about Christmas in the \'80s to the max! Covering toys, movies, specials, music, books, games, comics, decorations, food, fashion, and fads from that era. Hosted by Gerry D.',
  keywords: [
    'Totally Rad Christmas',
    '80s Christmas',
    'Christmas podcast',
    'retro Christmas',
    '1980s',
    'Christmas toys',
    'Christmas movies',
    'Christmas specials',
    'nostalgia',
    'Gerry D',
    'vintage Christmas',
    '80s nostalgia',
    'Christmas cartoons',
    'holiday podcast',
  ],
  authors: [{ name: 'Gerry D' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://totallyradchristmas.com',
    siteName: 'Totally Rad Christmas!',
    title: 'Totally Rad Christmas! - Christmas in the \'80s to the Max',
    description:
      'A podcast about Christmas in the \'80s to the max! Covering toys, movies, specials, music, books, games, comics, decorations, food, fashion, and fads.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1400,
        height: 1400,
        alt: 'Totally Rad Christmas! Podcast Cover Art',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@radchristmas',
    creator: '@radchristmas',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://totallyradchristmas.com',
    types: {
      'application/rss+xml': 'https://rss.buzzsprout.com/840331.rss',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-white antialiased">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.bunny.net"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.bunny.net/css?family=satoshi:300,400,500,700&display=swap"
        />
      </head>
      <body className="flex min-h-full">
        {children}
        <Analytics />
        <Script
          src="https://kit.fontawesome.com/8e56931674.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
