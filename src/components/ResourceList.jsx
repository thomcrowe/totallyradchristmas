'use client'

import { useState } from 'react'
import Link from 'next/link'
import { RESOURCE_CATEGORIES } from '@/lib/resources'

function AmazonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705c-.209.189-.512.201-.745.074-1.047-.872-1.234-1.276-1.814-2.106-1.734 1.767-2.962 2.297-5.209 2.297-2.66 0-4.731-1.641-4.731-4.925 0-2.565 1.391-4.309 3.37-5.164 1.715-.754 4.11-.891 5.942-1.095v-.41c0-.753.06-1.642-.383-2.294-.385-.579-1.124-.817-1.776-.817-1.209 0-2.284.62-2.548 1.906-.054.285-.264.567-.549.582l-3.076-.333c-.259-.056-.547-.266-.472-.66C5.972 2.816 8.906 2 11.52 2c1.334 0 3.078.356 4.129 1.365C16.98 4.639 16.949 6.376 16.949 8.23v4.492c0 1.352.561 1.948 1.089 2.679.186.259.226.569-.01.762-.591.494-1.639 1.412-2.217 1.926l-.667-.294zm4.91 1.989c-2.874 2.178-7.043 3.338-10.63 3.338-5.025 0-9.554-1.861-12.978-4.955-.269-.244-.028-.576.296-.387 3.695 2.153 8.265 3.451 12.98 3.451 3.184 0 6.685-.66 9.907-2.027.487-.206.895.32.425.58zm1.208-1.368c-.368-.471-2.431-.222-3.358-.112-.282.034-.326-.211-.072-.388 1.644-1.157 4.342-.824 4.659-.436.318.39-.083 3.095-1.623 4.385-.237.199-.463.093-.357-.169.346-.866 1.119-2.808.751-3.28z"/>
    </svg>
  )
}

function ResourceCard({ resource }) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-700">
          {resource.category}
        </span>
        {resource.year && (
          <span className="text-xs text-slate-400">{resource.year}</span>
        )}
      </div>

      <h2 className="mt-3 text-lg font-bold leading-snug text-slate-900">
        {resource.title}
      </h2>

      <p className="mt-1 text-sm font-medium text-slate-500">
        by {resource.author}
      </p>

      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
        {resource.description}
      </p>

      <Link
        href={resource.amazonUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 self-start rounded-full bg-amber-400 px-5 py-2 text-sm font-bold text-slate-900 hover:bg-amber-500 transition-colors"
      >
        <AmazonIcon className="h-4 w-4" />
        Find on Amazon
      </Link>
    </div>
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
      {/* Filters & Sort bar */}
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
        Showing {filtered.length} resource{filtered.length !== 1 ? 's' : ''}
        {activeCategory !== 'All' ? ` in "${activeCategory}"` : ''}
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {filtered.length > 0 ? (
          filtered.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))
        ) : (
          <p className="col-span-2 py-12 text-center text-slate-500">
            No resources in this category yet.
          </p>
        )}
      </div>
    </div>
  )
}
