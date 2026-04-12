'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CATEGORIES } from '@/lib/recipes'

function RecipeCard({ recipe }) {
  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      {recipe.image && (
        <div className="relative h-52 w-full overflow-hidden bg-slate-100">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-red-100 px-3 py-0.5 text-xs font-semibold uppercase tracking-wide text-red-700">
            {recipe.category}
          </span>
          {recipe.year && (
            <span className="text-xs text-slate-400">{recipe.year}</span>
          )}
        </div>
        <h2 className="mt-2 text-lg font-bold leading-snug text-slate-900 group-hover:text-red-700">
          {recipe.title}
        </h2>
        {recipe.tagline && (
          <p className="mt-1 text-sm text-red-600">{recipe.tagline}</p>
        )}
        <p className="mt-2 flex-1 text-sm leading-6 text-slate-600 line-clamp-3">
          {recipe.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          {recipe.contributor ? (
            <span className="text-xs text-slate-500">
              By {recipe.contributor.name}
            </span>
          ) : (
            <span />
          )}
          <span className="text-xs font-semibold text-red-600 group-hover:underline">
            View recipe →
          </span>
        </div>
      </div>
    </Link>
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
      return 0
    })

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="default">Sort: Default</option>
          <option value="az">Title A–Z</option>
          <option value="za">Title Z–A</option>
        </select>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {filtered.length} recipe{filtered.length !== 1 ? 's' : ''}
        {activeCategory !== 'All' ? ` in "${activeCategory}"` : ''}
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <p className="col-span-3 py-12 text-center text-slate-500">
            No recipes in this category yet — check back soon!
          </p>
        )}
      </div>
    </div>
  )
}
