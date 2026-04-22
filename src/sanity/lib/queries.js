import { client } from './client'

// ── Resources ──────────────────────────────────────────────────────────────

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

// ── Raddies ────────────────────────────────────────────────────────────────

export async function getAllRaddiesCeremonies() {
  return client.fetch(
    `*[_type == "raddiesCeremony"] | order(year desc) {
      year,
      edition,
      ordinal,
      president,
      honorary,
      awards[] {
        category,
        winner,
        episode,
        special,
      }
    }`
  )
}

// ── Recipes ────────────────────────────────────────────────────────────────

export async function getAllRecipes() {
  return client.fetch(
    `*[_type == "recipe"] | order(_createdAt desc) {
      "id": slug.current,
      title,
      category,
      year,
      servings,
      "image": image.asset->url,
      tagline,
      description,
      ingredients,
      steps,
      notes,
      contributor,
    }`
  )
}

export async function getRecipe(slug) {
  return client.fetch(
    `*[_type == "recipe" && slug.current == $slug][0] {
      "id": slug.current,
      title,
      category,
      year,
      servings,
      "image": image.asset->url,
      tagline,
      description,
      ingredients,
      steps,
      notes,
      contributor,
    }`,
    { slug }
  )
}

export async function getAllRecipeSlugs() {
  return client.fetch(
    `*[_type == "recipe"] { "slug": slug.current }`
  )
}
