import { Container } from '@/components/Container'
import { ResourceList } from '@/components/ResourceList'
import { resources as staticResources } from '@/lib/resources'

const SITE_URL = 'https://totallyradchristmas.com'

export const metadata = {
  title: 'Resources',
  description:
    "Books, toys, and more for the serious '80s Christmas enthusiast — recommended by Gerry D.",
  openGraph: {
    title: 'Resources - Totally Rad Christmas!',
    description:
      "Books, toys, and more for the serious '80s Christmas enthusiast — recommended by Gerry D.",
    images: [{ url: '/og-image.jpg', width: 1400, height: 1400 }],
  },
}

function buildJsonLd(resources) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: "Totally Rad Christmas! '80s Christmas Resources",
    description:
      "Books, toys, music, and more for the serious '80s Christmas enthusiast — curated by Gerry D.",
    url: `${SITE_URL}/resources`,
    numberOfItems: resources.length,
    itemListElement: resources.map((resource, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': resource.type === 'book' ? 'Book' : 'Product',
        name: resource.title,
        ...(resource.description ? { description: resource.description } : {}),
        ...(resource.image ? { image: resource.image } : {}),
        ...(resource.url ? { url: resource.url } : {}),
      },
    })),
  }
}

export const revalidate = 60

async function getResources() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return staticResources
  }
  try {
    const { getAllResources } = await import('@/sanity/lib/queries')
    const data = await getAllResources()
    return data?.length ? data : staticResources
  } catch {
    return staticResources
  }
}

export default async function ResourcesPage() {
  const resources = await getResources()
  const jsonLd = buildJsonLd(resources)

  return (
    <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <div className="mb-10">
          <h1 className="text-2xl/7 font-bold text-slate-900">Resources</h1>
          <p className="mt-2 text-base leading-7 text-slate-600">
            Books, toys, music, and more — curated by Gerry D. Click any item
            to see the full details and Gerry&apos;s take. 🎄
          </p>
        </div>
        <ResourceList resources={resources} />
      </Container>
    </div>
  )
}
