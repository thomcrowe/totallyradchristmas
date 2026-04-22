import { getAllEpisodes } from '@/lib/episodes'

const SITE_URL = 'https://totallyradchristmas.com'

const STATIC_PAGES = [
  { url: SITE_URL, priority: 1.0, changeFrequency: 'daily' },
  { url: `${SITE_URL}/about`, priority: 0.8, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/raddies`, priority: 0.8, changeFrequency: 'yearly' },
  { url: `${SITE_URL}/recipes`, priority: 0.7, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/resources`, priority: 0.7, changeFrequency: 'monthly' },
  { url: `${SITE_URL}/merch`, priority: 0.6, changeFrequency: 'monthly' },
]

export default async function sitemap() {
  const episodes = await getAllEpisodes()

  const episodeEntries = episodes.map((episode) => ({
    url: `${SITE_URL}/${episode.id}`,
    lastModified: new Date(episode.published),
    changeFrequency: 'never',
    priority: 0.6,
  }))

  return [...STATIC_PAGES, ...episodeEntries]
}

export const revalidate = 3600
