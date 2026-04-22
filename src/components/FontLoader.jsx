'use client'

import { useEffect } from 'react'

// Loads the Satoshi font stylesheet asynchronously after hydration.
// We can't use onLoad="..." on <link> in React (it expects a function, not
// a string) and Server Components can't attach event handlers at all, so
// this tiny client component injects the stylesheet via useEffect instead.
export function FontLoader() {
  useEffect(() => {
    const existing = document.querySelector(
      'link[href*="fonts.bunny.net/css"]',
    )
    if (existing) return // already loaded

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href =
      'https://fonts.bunny.net/css?family=satoshi:300,400,500,700&display=swap'
    document.head.appendChild(link)
  }, [])

  return null
}
