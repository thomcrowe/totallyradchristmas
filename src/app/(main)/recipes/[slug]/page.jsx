import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/Container'
import { recipes } from '@/lib/recipes'

export async function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.id }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const recipe = recipes.find((r) => r.id === slug)
  if (!recipe) return {}
  return {
    title: recipe.title,
    description: recipe.description,
    openGraph: {
      title: `${recipe.title} - Totally Rad Christmas!`,
      description: recipe.description,
      images: recipe.image ? [{ url: recipe.image }] : [{ url: '/og-image.jpg' }],
    },
  }
}

export default async function RecipePage({ params }) {
  const { slug } = await params
  const recipe = recipes.find((r) => r.id === slug)
  if (!recipe) notFound()

  return (
    <div className="pt-16 pb-24 lg:pt-12">
      <Container>
        {/* Back link */}
        <Link
          href="/recipes"
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-red-600"
        >
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
          All Recipes
        </Link>

        <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Left column: image + meta */}
          <div>
            {recipe.image && (
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-100 shadow-lg">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  priority
                />
              </div>
            )}

            {/* Meta box */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="font-mono font-semibold uppercase tracking-wide text-slate-500">
                    Category
                  </dt>
                  <dd className="mt-1 font-medium text-slate-900">{recipe.category}</dd>
                </div>
                {recipe.servings && (
                  <div>
                    <dt className="font-mono font-semibold uppercase tracking-wide text-slate-500">
                      Servings
                    </dt>
                    <dd className="mt-1 font-medium text-slate-900">{recipe.servings}</dd>
                  </div>
                )}
                {recipe.year && (
                  <div>
                    <dt className="font-mono font-semibold uppercase tracking-wide text-slate-500">
                      Era
                    </dt>
                    <dd className="mt-1 font-medium text-slate-900">{recipe.year}</dd>
                  </div>
                )}
                {recipe.contributor && (
                  <div>
                    <dt className="font-mono font-semibold uppercase tracking-wide text-slate-500">
                      Contributor
                    </dt>
                    <dd className="mt-1 font-medium text-slate-900">
                      <Link
                        href={recipe.contributor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:underline"
                      >
                        {recipe.contributor.name}
                      </Link>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          {/* Right column: title + ingredients + steps */}
          <div className="mt-10 lg:mt-0">
            <div>
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-700">
                {recipe.category}
              </span>
            </div>
            <h1 className="mt-3 text-3xl font-bold text-slate-900 lg:text-4xl">
              {recipe.title}
            </h1>
            {recipe.tagline && (
              <p className="mt-2 text-lg font-medium text-red-600">{recipe.tagline}</p>
            )}
            <p className="mt-4 text-base leading-7 text-slate-600">{recipe.description}</p>

            {/* Ingredients */}
            <div className="mt-10">
              <h2 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-wide text-slate-900">
                <span className="h-px flex-1 bg-slate-200" />
                Ingredients
                <span className="h-px flex-1 bg-slate-200" />
              </h2>
              <ul className="mt-4 space-y-2">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="mt-10">
              <h2 className="flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-wide text-slate-900">
                <span className="h-px flex-1 bg-slate-200" />
                Instructions
                <span className="h-px flex-1 bg-slate-200" />
              </h2>
              <ol className="mt-4 space-y-5">
                {recipe.steps.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <p className="mt-0.5 text-sm leading-7 text-slate-700">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Notes */}
            {recipe.notes && (
              <div className="mt-8 rounded-xl bg-red-50 p-4 text-sm text-red-800">
                📝 <span className="font-medium">{recipe.notes}</span>
              </div>
            )}

            {/* Contributor credit */}
            {recipe.contributor && (
              <p className="mt-8 text-sm text-slate-500">
                Recipe shared by{' '}
                <Link
                  href={recipe.contributor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-red-600 hover:underline"
                >
                  {recipe.contributor.name}
                </Link>
              </p>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
