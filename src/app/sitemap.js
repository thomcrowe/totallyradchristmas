import { getAllEpisodes } from '@/lib/episodes'

const SITE_URL = 'https://totallyradchristmas.com'

export default async function sitemap() {
  const episodes = await getAllEpisodes()

  const episodeUrls = episodes.map((episode) => ({
    url: `${SITE_URL}/${episode.id}`,
    lastModified: new Date(episode.published),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...episodeUrls,
  ]
}
