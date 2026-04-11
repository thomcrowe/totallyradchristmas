import { cache } from 'react'
import { notFound } from 'next/navigation'

import { Container } from '@/components/Container'
import { EpisodePlayButton } from '@/components/EpisodePlayButton'
import { FormattedDate } from '@/components/FormattedDate'
import { PauseIcon } from '@/components/PauseIcon'
import { PlayIcon } from '@/components/PlayIcon'
import { getAllEpisodes } from '@/lib/episodes'

const SITE_URL = 'https://totallyradchristmas.com'

function stripHtml(html) {
  return html?.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim() ?? ''
}

const getEpisode = cache(async (id) => {
  let allEpisodes = await getAllEpisodes()
  let episode = allEpisodes.find((episode) => episode.id === id)

  if (!episode) {
    notFound()
  }

  return episode
})

export async function generateMetadata({ params }) {
  let { episode: episodeId } = await params
  let episode = await getEpisode(episodeId)

  let plainDescription = stripHtml(episode.description).slice(0, 160)
  let episodeUrl = `${SITE_URL}/${episode.id}`

  return {
    title: episode.title,
    description: plainDescription,
    alternates: {
      canonical: episodeUrl,
    },
    openGraph: {
      type: 'music.song',
      title: episode.title,
      description: plainDescription,
      url: episodeUrl,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: episode.title }],
      audio: episode.audio?.src,
      publishedTime: new Date(episode.published).toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: episode.title,
      description: plainDescription,
      images: ['/og-image.jpg'],
    },
  }
}

export async function generateStaticParams() {
  let episodes = await getAllEpisodes()
  return episodes.map((episode) => ({
    episode: episode.id,
  }))
}

export default async function Episode({ params }) {
  let { episode: episodeId } = await params
  let episode = await getEpisode(episodeId)
  let date = new Date(episode.published)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    url: `${SITE_URL}/${episode.id}`,
    name: episode.title,
    datePublished: new Date(episode.published).toISOString(),
    description: stripHtml(episode.description),
    associatedMedia: {
      '@type': 'MediaObject',
      contentUrl: episode.audio?.src,
      encodingFormat: episode.audio?.type,
    },
    partOfSeries: {
      '@type': 'PodcastSeries',
      name: 'Totally Rad Christmas!',
      url: SITE_URL,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="py-16 lg:py-36">
        <Container>
          <header className="flex flex-col">
            <div className="flex items-center gap-6">
              <EpisodePlayButton
                episode={episode}
                className="group relative flex h-18 w-18 shrink-0 items-center justify-center rounded-full bg-red-700 hover:bg-red-900 focus:outline-hidden"
                playing={
                  <PauseIcon className="h-9 w-9 fill-white group-active:fill-white/80" />
                }
                paused={
                  <PlayIcon className="h-9 w-9 fill-white group-active:fill-white/80" />
                }
              />
              <div className="flex flex-col">
                <h1 className="mt-2 text-4xl font-bold text-slate-900">
                  {episode.title}
                </h1>
                <FormattedDate
                  date={date}
                  className="order-first font-mono text-sm leading-7 text-slate-500"
                />
              </div>
            </div>
          </header>
          <hr className="my-12 border-gray-200" />
          <div
            className="prose prose-slate mt-14 [&>h2]:mt-12 [&>h2]:flex [&>h2]:items-center [&>h2]:font-mono [&>h2]:text-sm [&>h2]:font-medium [&>h2]:leading-7 [&>h2]:text-slate-900 [&>h2]:before:mr-3 [&>h2]:before:h-3 [&>h2]:before:w-1.5 [&>h2]:before:rounded-r-full [&>h2]:before:bg-red-200 [&>ul]:mt-6 [&>ul]:list-['\2013\20'] [&>ul]:pl-5 [&>h2:nth-of-type(3n+2)]:before:bg-red-100 [&>h2:nth-of-type(3n)]:before:bg-orange-200"
            dangerouslySetInnerHTML={{ __html: episode.content }}
          />
        </Container>
      </article>
    </>
  )
}

export const revalidate = 3600
