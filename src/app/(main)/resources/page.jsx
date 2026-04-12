import { Container } from '@/components/Container'
import { ResourceList } from '@/components/ResourceList'
import { resources } from '@/lib/resources'

export const metadata = {
  title: 'Resources',
  description:
    "Books, guides, and references for the serious '80s Christmas enthusiast — recommended by Totally Rad Christmas!",
  openGraph: {
    title: 'Resources - Totally Rad Christmas!',
    description:
      "Books, guides, and references for the serious '80s Christmas enthusiast.",
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default function ResourcesPage() {
  return (
    <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
      <Container>
        <div className="mb-10">
          <h1 className="text-2xl/7 font-bold text-slate-900">Resources</h1>
          <p className="mt-2 text-base leading-7 text-slate-600">
            Books, guides, and references that every serious &apos;80s Christmas
            enthusiast should have on their shelf. Links go to Amazon — happy shopping! 🎁
          </p>
        </div>
        <ResourceList resources={resources} />
      </Container>
    </div>
  )
}
