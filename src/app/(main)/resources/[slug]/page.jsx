import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/Container'
import { resources as staticResources } from '@/lib/resources'

export const revalidate = 60

async function getResource(slug) {
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const { getResource } = await import('@/sanity/lib/queries')
      const data = await getResource(slug)
      if (data) return { resource: data, fromSanity: true }
    } catch {}
  }
  const resource = staticResources.find((r) => r.id === slug)
  return { resource: resource || null, fromSanity: false }
}

function resolveImageUrl(resource, fromSanity) {
  if (!fromSanity) return resource.image ?? null
  if (!resource.image) return null
  try {
    const { urlFor } = require('@/sanity/lib/image')
    return urlFor(resource.image).width(800).url()
  } catch {
    return null
  }
}

export async function generateStaticParams() {
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const { getAllResourceSlugs } = await import('@/sanity/lib/queries')
      const slugs = await getAllResourceSlugs()
      return slugs.map((s) => ({ slug: s.slug }))
    } catch {}
  }
  return staticResources.map((r) => ({ slug: r.id }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const { resource } = await getResource(slug)
  if (!resource) return {}
  return {
    title: resource.title,
    description: resource.description,
    openGraph: {
      title: `${resource.title} - Totally Rad Christmas!`,
      description: resource.description,
    },
  }
}

export default async function ResourcePage({ params }) {
  const { slug } = await params
  const { resource, fromSanity } = await getResource(slug)
  if (!resource) notFound()

  const imageUrl = resolveImageUrl(resource, fromSanity)

  return (
    <div className="pt-16 pb-24 lg:pt-12">
      <Container>
        {/* Back link */}
        <Link
          href="/resources"
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-red-600"
        >
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
          All Resources
        </Link>

        <div className="mt-8 lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Left: cover + buy + meta */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="relative w-56 overflow-hidden rounded-xl bg-slate-100 shadow-lg lg:w-full">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={resource.title}
                  width={400}
                  height={560}
                  className="w-full object-contain"
                  priority
                  unoptimized={fromSanity}
                />
              ) : (
                <div className="flex aspect-[2/3] w-full items-center justify-center text-slate-400">
                  <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              )}
            </div>

            <Link
              href={resource.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-56 items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-slate-900 hover:bg-amber-500 transition-colors lg:w-full"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705c-.209.189-.512.201-.745.074-1.047-.872-1.234-1.276-1.814-2.106-1.734 1.767-2.962 2.297-5.209 2.297-2.66 0-4.731-1.641-4.731-4.925 0-2.565 1.391-4.309 3.37-5.164 1.715-.754 4.11-.891 5.942-1.095v-.41c0-.753.06-1.642-.383-2.294-.385-.579-1.124-.817-1.776-.817-1.209 0-2.284.62-2.548 1.906-.054.285-.264.567-.549.582l-3.076-.333c-.259-.056-.547-.266-.472-.66C5.972 2.816 8.906 2 11.52 2c1.334 0 3.078.356 4.129 1.365C16.98 4.639 16.949 6.376 16.949 8.23v4.492c0 1.352.561 1.948 1.089 2.679.186.259.226.569-.01.762-.591.494-1.639 1.412-2.217 1.926l-.667-.294zm4.91 1.989c-2.874 2.178-7.043 3.338-10.63 3.338-5.025 0-9.554-1.861-12.978-4.955-.269-.244-.028-.576.296-.387 3.695 2.153 8.265 3.451 12.98 3.451 3.184 0 6.685-.66 9.907-2.027.487-.206.895.32.425.58zm1.208-1.368c-.368-.471-2.431-.222-3.358-.112-.282.034-.326-.211-.072-.388 1.644-1.157 4.342-.824 4.659-.436.318.39-.083 3.095-1.623 4.385-.237.199-.463.093-.357-.169.346-.866 1.119-2.808.751-3.28z"/>
              </svg>
              {resource.buyLabel || 'Buy on Amazon'}
            </Link>

            <div className="mt-6 w-56 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm lg:w-full">
              <dl className="space-y-3">
                <div>
                  <dt className="font-mono text-xs font-semibold uppercase tracking-wide text-slate-500">Category</dt>
                  <dd className="mt-0.5 font-medium text-slate-900">{resource.category}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs font-semibold uppercase tracking-wide text-slate-500">{resource.creditLabel}</dt>
                  <dd className="mt-0.5 font-medium text-slate-900">{resource.credit}</dd>
                </div>
                {resource.year && (
                  <div>
                    <dt className="font-mono text-xs font-semibold uppercase tracking-wide text-slate-500">Year</dt>
                    <dd className="mt-0.5 font-medium text-slate-900">{resource.year}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          {/* Right: title + description + Gerry's review */}
          <div className="col-span-2 mt-10 lg:mt-0">
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-700">
              {resource.category}
            </span>

            <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 lg:text-4xl">
              {resource.title}
            </h1>
            <p className="mt-1 text-base font-medium text-slate-500">
              {resource.creditLabel}: {resource.credit}
            </p>

            <p className="mt-6 text-base leading-8 text-slate-700">{resource.description}</p>

            <hr className="my-10 border-slate-200" />

            <div>
              <h2 className="flex items-center gap-3 font-mono text-sm font-semibold uppercase tracking-wide text-slate-900">
                <span className="h-px flex-1 bg-slate-200" />
                Gerry&apos;s Take
                <span className="h-px flex-1 bg-slate-200" />
              </h2>

              {resource.review ? (
                <div className="mt-6 rounded-2xl bg-red-50 p-6">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 text-lg font-bold text-white">
                      G
                    </div>
                    <blockquote className="text-base leading-8 text-slate-800 italic">
                      &ldquo;{resource.review}&rdquo;
                    </blockquote>
                  </div>
                  <p className="mt-4 text-sm font-semibold text-red-700">— Gerry D, Totally Rad Christmas!</p>
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
                  <p className="text-sm">Gerry&apos;s review coming soon — check back!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
