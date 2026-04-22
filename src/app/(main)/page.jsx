import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { EpisodePlayButton } from '@/components/EpisodePlayButton'
import { FormattedDate } from '@/components/FormattedDate'
import { getAllEpisodes } from '@/lib/episodes'

const SITE_URL = 'https://totallyradchristmas.com'
const PAGE_SIZE = 20

// Strip anchor tags from RSS description HTML so Lighthouse doesn't flag
// generic link text ("here", "click here", etc.) from Buzzsprout show notes.
function stripLinks(html) {
  return html?.replace(/<a\b[^>]*>(.*?)<\/a>/gi, '$1') ?? ''
}

// Route Buzzsprout images through our sharp-powered proxy.
// We pass w=224 (2× the 112px display size for retina) so the proxy resizes
// the 1400×1400 source down to a ~5 KB WebP instead of ~170 KB JPEG.
// Image components use unoptimized={true} so the browser hits the proxy
// directly — no double-proxying through /_next/image.
function proxyImage(url, w = 224) {
  if (!url) return null
  if (url.includes('storage.buzzsprout.com')) {
    return `/api/episode-image?url=${encodeURIComponent(url)}&w=${w}`
  }
  return url
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'PodcastSeries',
  name: 'Totally Rad Christmas!',
  url: SITE_URL,
  description:
    "A podcast about Christmas in the '80s to the max! Covering toys, movies, specials, music, books, games, comics, decorations, food, fashion, and fads from that era.",
  image: `${SITE_URL}/og-image.jpg`,
  webFeed: 'https://rss.buzzsprout.com/840331.rss',
  author: [{ '@type': 'Person', name: 'Gerry D' }],
  sameAs: [
    'https://open.spotify.com/show/0qICAW7PgbFNsDq00eMzpV',
    'https://podcasts.apple.com/us/podcast/totally-rad-christmas/id1508004549',
  ],
}

function PauseIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.496 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H2.68a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H1.496Zm5.82 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H8.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7.316Z"
      />
    </svg>
  )
}

function PlayIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" {...props}>
      <path d="M8.25 4.567a.5.5 0 0 1 0 .866l-7.5 4.33A.5.5 0 0 1 0 9.33V.67A.5.5 0 0 1 .75.237l7.5 4.33Z" />
    </svg>
  )
}

function EpisodeEntry({ episode, priority }) {
  let date = new Date(episode.published)
  const proxied = proxyImage(episode.image, 224)

  return (
    <article
      aria-labelledby={`episode-${episode.id}-title`}
      className="py-10 sm:py-12"
    >
      <Container>
        <div className="flex items-start gap-6">
          {proxied && (
            <Link href={`/${episode.id}`} className="shrink-0" tabIndex={-1}>
              <Image
                src={proxied}
                alt={episode.title}
                width={112}
                height={112}
                className="w-20 h-20 sm:w-28 sm:h-28 rounded-lg object-cover shadow-md"
                unoptimized
                priority={priority}
                loading={priority ? undefined : 'lazy'}
              />
            </Link>
          )}
          <div className="flex flex-col items-start min-w-0">
            <h2
              id={`episode-${episode.id}-title`}
              className="mt-2 text-lg font-bold text-slate-900"
            >
              <Link href={`/${episode.id}`}>{episode.title}</Link>
            </h2>
            <FormattedDate
              date={date}
              className="order-first font-mono text-sm leading-7 text-slate-500"
            />
            <div
              className="mt-1 text-base leading-7 text-slate-700 [&>p+p]:mt-2"
              dangerouslySetInnerHTML={{ __html: stripLinks(episode.description) }}
            />
            <div className="mt-4 flex items-center gap-4">
              <EpisodePlayButton
                episode={episode}
                className="flex items-center gap-x-3 text-sm/6 font-bold text-red-600 hover:text-red-800 active:text-red-900"
                playing={
                  <>
                    <PauseIcon className="h-2.5 w-2.5 fill-current" />
                    <span aria-hidden="true">Listen</span>
                  </>
                }
                paused={
                  <>
                    <PlayIcon className="h-2.5 w-2.5 fill-current" />
                    <span aria-hidden="true">Listen</span>
                  </>
                }
              />
              <span aria-hidden="true" className="text-sm font-bold text-slate-400">
                /
              </span>
              <Link
                href={`/${episode.id}`}
                className="flex items-center text-sm/6 font-bold text-red-600 hover:text-red-800 active:text-red-900"
                aria-label={`Show notes for episode ${episode.title}`}
              >
                Show notes
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </article>
  )
}

function Pagination({ page, totalPages }) {
  return (
    <Container>
      <nav
        aria-label="Episode pagination"
        className="flex items-center justify-between border-t border-slate-100 py-8"
      >
        <div>
          {page > 1 ? (
            <Link
              href={page === 2 ? '/' : `/?page=${page - 1}`}
              className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-red-50 hover:text-red-700 transition-colors"
            >
              ← Newer episodes
            </Link>
          ) : (
            <span />
          )}
        </div>

        <p className="text-sm text-slate-500">
          Page {page} of {totalPages}
        </p>

        <div>
          {page < totalPages ? (
            <Link
              href={`/?page=${page + 1}`}
              className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-red-50 hover:text-red-700 transition-colors"
            >
              Older episodes →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </nav>
    </Container>
  )
}

export default async function Home({ searchParams }) {
  const params = await searchParams
  const page = Math.max(1, Number(params?.page) || 1)

  let allEpisodes = await getAllEpisodes()
  const totalPages = Math.ceil(allEpisodes.length / PAGE_SIZE)
  const clampedPage = Math.min(page, totalPages)
  const episodes = allEpisodes.slice(
    (clampedPage - 1) * PAGE_SIZE,
    clampedPage * PAGE_SIZE,
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
        <Container>
          <h1 className="text-2xl/7 font-bold text-slate-900">Episodes</h1>
        </Container>
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
          {episodes.map((episode, i) => (
            <EpisodeEntry
              key={episode.id}
              episode={episode}
              priority={i < 3}
            />
          ))}
        </div>
        {totalPages > 1 && (
          <Pagination page={clampedPage} totalPages={totalPages} />
        )}
      </div>
    </>
  )
}

export const revalidate = 3600
