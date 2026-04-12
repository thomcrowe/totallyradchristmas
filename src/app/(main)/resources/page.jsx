import { Container } from '@/components/Container'
import { ResourceList } from '@/components/ResourceList'
import { resources as staticResources } from '@/lib/resources'

export const metadata = {
  title: 'Resources',
  description:
    "Books, toys, and more for the serious '80s Christmas enthusiast — recommended by Gerry D.",
  openGraph: {
    title: 'Resources - Totally Rad Christmas!',
    description:
      "Books, toys, and more for the serious '80s Christmas enthusiast.",
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
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

  return (
    <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
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
