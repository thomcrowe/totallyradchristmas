/**
 * Run with: node scripts/seed-sanity.mjs
 * Make sure NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN are set in .env.local
 */
import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const resources = [
  {
    _type: 'resource',
    title: 'A Christmas Story: The Book That Inspired the Hilarious Classic Film',
    slug: { _type: 'slug', current: 'a-christmas-story-book' },
    credit: 'Jean Shepherd',
    creditLabel: 'Author',
    category: 'Books',
    year: 1983,
    description:
      "Jean Shepherd's semi-autobiographical stories that became the foundation for the beloved 1983 film. Laugh-out-loud funny and deeply nostalgic — essential '80s Christmas reading.",
    buyUrl: 'https://www.amazon.com/Christmas-Story-Inspired-Hilarious-Classic/dp/0385512082',
    buyLabel: 'Buy on Amazon',
  },
  {
    _type: 'resource',
    title: 'The Autobiography of Santa Claus',
    slug: { _type: 'slug', current: 'autobiography-of-santa-claus' },
    credit: 'Jeff Guinn',
    creditLabel: 'Author',
    category: 'Books',
    year: 1994,
    description:
      "Santa Claus tells his own story — from fourth-century bishop to modern-day icon — weaving together real history with charming fiction.",
    buyUrl: 'https://www.amazon.com/Autobiography-Santa-Claus-Jeff-Guinn/dp/1585423874',
    buyLabel: 'Buy on Amazon',
  },
  {
    _type: 'resource',
    title: 'Christmas in the Crosshairs',
    slug: { _type: 'slug', current: 'christmas-in-the-crosshairs' },
    credit: 'Gerry Bowler',
    creditLabel: 'Author',
    category: 'Books',
    year: 2016,
    description:
      "A fascinating deep-dive into the two-thousand-year war over Christmas — who celebrates it, who opposes it, and why the holiday has always been contested.",
    buyUrl: 'https://www.amazon.com/Christmas-Crosshairs-Thousand-Denouncing-Defending/dp/0190233117',
    buyLabel: 'Buy on Amazon',
  },
  {
    _type: 'resource',
    title: "Encyclopedia of Christmas and New Year's Celebrations",
    slug: { _type: 'slug', current: 'encyclopedia-of-christmas' },
    credit: 'Tanya Gulevich',
    creditLabel: 'Author',
    category: 'Books',
    year: 2003,
    description:
      "Over 240 entries covering every aspect of Christmas and New Year's traditions, symbols, legends, and lore from around the world.",
    buyUrl: 'https://www.amazon.com/Encyclopedia-Christmas-New-Years-Celebrations/dp/0780803752',
    buyLabel: 'Buy on Amazon',
  },
  {
    _type: 'resource',
    title: 'The Drunken Botanist',
    slug: { _type: 'slug', current: 'drunken-botanist' },
    credit: 'Amy Stewart',
    creditLabel: 'Author',
    category: 'Food & Entertaining',
    year: 2013,
    description:
      "For those holiday party drinks — a beautifully written exploration of the botanical origins of spirits and cocktails.",
    buyUrl: 'https://www.amazon.com/Drunken-Botanist-Plants-Create-Worlds/dp/1616200464',
    buyLabel: 'Buy on Amazon',
  },
  {
    _type: 'resource',
    title: "Totally Tubular '80s Toys",
    slug: { _type: 'slug', current: 'totally-tubular-80s-toys' },
    credit: 'Bill Bruegman',
    creditLabel: 'Author',
    category: 'Toys & Games',
    year: 2005,
    description:
      "A comprehensive visual guide to the toys that defined the decade. From G.I. Joe to Cabbage Patch Kids — full of catalog photos and nostalgia.",
    buyUrl: 'https://www.amazon.com/s?k=totally+tubular+80s+toys+bruegman',
    buyLabel: 'Find on Amazon',
  },
]

async function seed() {
  console.log(`Seeding ${resources.length} resources into Sanity...`)
  for (const resource of resources) {
    const existing = await client.fetch(
      `*[_type == "resource" && slug.current == $slug][0]._id`,
      { slug: resource.slug.current }
    )
    if (existing) {
      console.log(`  ⏭  Skipping "${resource.title}" (already exists)`)
    } else {
      await client.create(resource)
      console.log(`  ✅ Created "${resource.title}"`)
    }
  }
  console.log('Done! Open /studio to add images and Gerry\'s reviews.')
}

seed().catch(console.error)
