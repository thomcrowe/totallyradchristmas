import { client } from './client'

export async function getAllResources() {
  return client.fetch(
    `*[_type == "resource"] | order(_createdAt desc) {
      "id": slug.current,
      title,
      credit,
      creditLabel,
      category,
      year,
      image,
      description,
      review,
      buyUrl,
      buyLabel,
    }`
  )
}

export async function getResource(slug) {
  return client.fetch(
    `*[_type == "resource" && slug.current == $slug][0] {
      "id": slug.current,
      title,
      credit,
      creditLabel,
      category,
      year,
      image,
      description,
      review,
      buyUrl,
      buyLabel,
    }`,
    { slug }
  )
}

export async function getAllResourceSlugs() {
  return client.fetch(
    `*[_type == "resource"] { "slug": slug.current }`
  )
}
