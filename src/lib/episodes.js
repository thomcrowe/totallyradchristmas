import { parse as parseFeed } from 'rss-to-json'

function extractSlug(link) {
  if (!link) return null
  // Buzzsprout links: https://www.buzzsprout.com/840331/episodes/12345678-slug-here
  // or website links: https://totallyradchristmas.com/episode-slug/
  try {
    const url = new URL(link)
    const parts = url.pathname.replace(/\/+$/, '').split('/')
    const last = parts[parts.length - 1]
    return last || null
  } catch {
    return link.replace(/\/+$/, '').split('/').pop() || null
  }
}

export async function getAllEpisodes() {
  let feed = await parseFeed('https://rss.buzzsprout.com/840331.rss')
  return feed.items
    .map(({ title, description, content, enclosures, published, link, guid, itunes_episode, itunes_season, itunes_image }) => {
      const slug = extractSlug(link) || extractSlug(guid) || String(published)
      const epNum = itunes_episode ?? null
      const season = itunes_season ?? null
      const label = epNum
        ? season
          ? `S${season}E${epNum}`
          : `Ep. ${epNum}`
        : 'Bonus'

      return {
        id: slug,
        title: `${label}: ${title}`,
        published: new Date(published),
        description: description || content,
        content: content || description,
        audio: enclosures?.map((e) => ({ src: e.url, type: e.type }))[0] ?? null,
        image: itunes_image?.href ?? null,
        link,
      }
    })
    .filter((ep) => ep.id && ep.audio)
}

export async function getEpisode(id) {
  const episodes = await getAllEpisodes()
  return episodes.find((ep) => ep.id === id) ?? null
}
