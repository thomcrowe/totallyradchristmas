'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CATEGORIES } from '@/lib/recipes'

function RecipeCard({ recipe }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {recipe.image && (
        <div className="relative h-64 w-full overflow-hidden bg-slate-100">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-700">
              {recipe.category}
            </span>
            {recipe.year && (
              <span className="ml-2 text-xs text-slate-400">{recipe.year}</span>
            )}
          </div>
          <span className="text-sm text-slate-500">{recipe.servings} servings</span>
        </div>

        <h2 className="mt-3 text-xl font-bold text-slate-900">{recipe.title}</h2>

        {recipe.tagline && (
          <p className="mt-1 text-base font-medium text-red-600">{recipe.tagline}</p>
        )}

        <p className="mt-2 text-sm leading-6 text-slate-600">{recipe.description}</p>

        <button
          onClick={() => setOpen(!open)}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2 text-sm font-bold text-white hover:bg-red-800 transition-colors"
        >
          {open ? 'Hide Recipe' : 'View Full Recipe'}
          <svg
            className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {open && (
          <div className="mt-6 border-t border-slate-100 pt-6">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="font-mono text-sm font-semibold uppercase tracking-wide text-slate-900">
                  Ingredients
                </h3>
                <ul className="mt-3 space-y-2">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-mono text-sm font-semibold uppercase tracking-wide text-slate-900">
                  Instructions
                </h3>
                <ol className="mt-3 space-y-4">
                  {recipe.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-700">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      <span className="leading-6">{step}</span>
                    </li>
                  ))}
                </ol>
                {recipe.notes && (
                  <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-800">
                    📝 {recipe.notes}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function RecipeList({ recipes }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [sort, setSort] = useState('default')

  const filtered = recipes
    .filter((r) => activeCategory === 'All' || r.category === activeCategory)
    .sort((a, b) => {
      if (sort === 'az') return a.title.localeCompare(b.title)
      if (sort === 'za') return b.title.localeCompare(a.title)
      if (sort === 'newest') return (b.year || 0) > (a.year || 0) ? 1 : -1
      if (sort === 'oldest') return (a.year || 0) > (b.year || 0) ? 1 : -1
      return 0
    })

  return (
    <div>
      {/* Filters & Sort bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
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

        {/* Sort dropdown */}
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

      {/* Count */}
      <p className="mt-4 text-sm text-slate-500">
        Showing {filtered.length} recipe{filtered.length !== 1 ? 's' : ''}
        {activeCategory !== 'All' ? ` in "${activeCategory}"` : ''}
      </p>

      {/* Recipe grid */}
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        {filtered.length > 0 ? (
          filtered.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
        ) : (
          <p className="col-span-2 py-12 text-center text-slate-500">
            No recipes in this category yet — check back soon!
          </p>
        )}
      </div>
    </div>
  )
}
