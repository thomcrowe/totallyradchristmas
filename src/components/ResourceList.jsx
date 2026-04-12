'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { RESOURCE_CATEGORIES } from '@/lib/resources'

function ResourceCard({ resource }) {
  return (
    <Link
      href={`/resources/${resource.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Cover image */}
      <div className="relative flex h-64 w-full items-center justify-center overflow-hidden bg-slate-100">
        {resource.image ? (
          <Image
            src={resource.image}
            alt={resource.title}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-xs">No image yet</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-red-100 px-3 py-0.5 text-xs font-semibold uppercase tracking-wide text-red-700">
            {resource.category}
          </span>
          {resource.year && (
            <span className="text-xs text-slate-400">{resource.year}</span>
          )}
        </div>

        <h2 className="mt-2 text-base font-bold leading-snug text-slate-900 group-hover:text-red-700 line-clamp-2">
          {resource.title}
        </h2>

        <p className="mt-0.5 text-sm text-slate-500">
          {resource.creditLabel}: {resource.credit}
        </p>

        <p className="mt-2 flex-1 text-sm leading-6 text-slate-600 line-clamp-3">
          {resource.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-red-600 group-hover:underline">
            {resource.review ? "See Gerry's review →" : 'View details →'}
          </span>
        </div>
      </div>
    </Link>
  )
}

export function ResourceList({ resources }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [sort, setSort] = useState('default')

  const filtered = resources
    .filter((r) => activeCategory === 'All' || r.category === activeCategory)
    .sort((a, b) => {
      if (sort === 'az') return a.title.localeCompare(b.title)
      if (sort === 'za') return b.title.localeCompare(a.title)
      if (sort === 'newest') return (b.year || 0) - (a.year || 0)
      if (sort === 'oldest') return (a.year || 0) - (b.year || 0)
      return 0
    })

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {RESOURCE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                activeCategory === cat
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="default">Sort: Default</option>
          <option value="az">Title A–Z</option>
          <option value="za">Title Z–A</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {filtered.length} item{filtered.length !== 1 ? 's' : ''}
        {activeCategory !== 'All' ? ` in "${activeCategory}"` : ''}
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.length > 0 ? (
          filtered.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))
        ) : (
          <p className="col-span-4 py-12 text-center text-slate-500">
            Nothing in this category yet — check back soon!
          </p>
        )}
      </div>
    </div>
  )
}
