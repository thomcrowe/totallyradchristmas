import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { EpisodePlayButton } from '@/components/EpisodePlayButton'
import { FormattedDate } from '@/components/FormattedDate'
import { getAllEpisodes } from '@/lib/episodes'

const SITE_URL = 'https://totallyradchristmas.com'

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

function EpisodeEntry({ episode }) {
  let date = new Date(episode.published)

  return (
    <article
      aria-labelledby={`episode-${episode.id}-title`}
      className="py-10 sm:py-12"
    >
      <Container>
        <div className="flex items-start gap-6">
          {episode.image && (
            <Link href={`/${episode.id}`} className="shrink-0" tabIndex={-1} aria-hidden="true">
              <Image
                src={episode.image}
                alt=""
                width={112}
                height={112}
                className="w-20 h-20 sm:w-28 sm:h-28 rounded-lg object-cover shadow-md"
                unoptimized
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
              dangerouslySetInnerHTML={{ __html: episode.description }}
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

export default async function Home() {
  let episodes = await getAllEpisodes()

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
          {episodes.map((episode) => (
            <EpisodeEntry key={episode.id} episode={episode} />
          ))}
        </div>
      </div>
    </>
  )
}

export const revalidate = 3600
