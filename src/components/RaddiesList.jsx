'use client'

import { useState } from 'react'
import { raddiesData } from '@/lib/raddies'

function TrophyIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11 17.938A8.001 8.001 0 0 1 4 10V3h16v7a8.001 8.001 0 0 1-7 7.938V19h3a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2h3v-1.062ZM6 5v5a6 6 0 1 0 12 0V5H6ZM3 5H1a1 1 0 0 0-1 1v2a4 4 0 0 0 3.46 3.953A8.04 8.04 0 0 1 3 10V5Zm18 0v5c0 .685-.086 1.35-.246 1.984A4 4 0 0 0 24 8V6a1 1 0 0 0-1-1h-2Z" />
    </svg>
  )
}

function StarIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

export function RaddiesList() {
  const [activeYear, setActiveYear] = useState(raddiesData[0].year)

  const activeData = raddiesData.find((d) => d.year === activeYear)

  return (
    <div>
      {/* Year tab bar */}
      <div className="flex flex-wrap gap-2 mb-8">
        {raddiesData.map((item) => {
          const isActive = item.year === activeYear
          return (
            <button
              key={item.year}
              onClick={() => setActiveYear(item.year)}
              className={[
                'px-4 py-2 rounded-full font-mono text-sm font-semibold transition-all border-2',
                isActive
                  ? 'bg-red-600 border-red-600 text-white shadow-md scale-105'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-red-300 hover:text-red-600',
              ].join(' ')}
            >
              <span className="hidden sm:inline">{item.edition} Annual · </span>
              {item.year}
            </button>
          )
        })}
      </div>

      {/* Ceremony header */}
      {activeData && (
        <div key={activeYear}>
          <div className="flex items-center gap-3 mb-2">
            <TrophyIcon className="h-8 w-8 text-amber-500 shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                The {activeData.edition} Annual Raddies
              </h2>
              <p className="text-sm text-slate-500 font-mono">{activeData.year}</p>
            </div>
          </div>

          {activeData.president && (
            <p className="mt-1 mb-6 text-sm text-slate-500">
              Academy President:{' '}
              <span className="font-semibold text-slate-700">{activeData.president}</span>
            </p>
          )}

          {/* Award cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeData.awards.map((award) => (
              <div
                key={award.category}
                className={[
                  'rounded-xl border px-4 py-3 flex gap-3 items-start',
                  award.special
                    ? 'border-amber-300 bg-amber-50'
                    : 'border-slate-100 bg-slate-50 hover:border-red-200 hover:bg-red-50 transition-colors',
                ].join(' ')}
              >
                {award.special ? (
                  <StarIcon className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                ) : (
                  <TrophyIcon className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                )}
                <div className="min-w-0">
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-wide leading-tight">
                    {award.category}
                  </p>
                  <p className="mt-0.5 font-bold text-slate-900 text-sm leading-snug">
                    {award.winner}
                  </p>
                  {award.episode && (
                    <p className="mt-0.5 text-xs text-slate-500 italic">
                      {award.episode}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Honorary Raddies */}
          {activeData.honorary?.length > 0 && (
            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide font-mono mb-3">
                Honorary Raddies
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeData.honorary.map((name) => (
                  <span
                    key={name}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-3 py-1 text-sm font-medium text-slate-700"
                  >
                    <StarIcon className="h-3 w-3 text-amber-400" />
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
