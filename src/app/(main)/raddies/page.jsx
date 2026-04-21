import { Container } from '@/components/Container'
import { RaddiesList } from '@/components/RaddiesList'

export const metadata = {
  title: 'The Raddies',
  description:
    "The Raddies — Gerry D's annual awards celebrating the raddest guests, episodes, and moments from Totally Rad Christmas!",
  openGraph: {
    title: 'The Raddies - Totally Rad Christmas!',
    description:
      "The Raddies — Gerry D's annual awards celebrating the raddest guests, episodes, and moments from Totally Rad Christmas!",
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default function RaddiesPage() {
  return (
    <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
      <Container>
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <span className="text-4xl" role="img" aria-label="trophy">🏆</span>
            <div>
              <h1 className="text-2xl/7 font-bold text-slate-900">The Raddies</h1>
              <p className="mt-1 text-sm font-mono text-red-600 font-semibold uppercase tracking-widest">
                Gerry D&apos;s Annual Award Show
              </p>
            </div>
          </div>
          <p className="mt-4 text-base leading-7 text-slate-600 max-w-2xl">
            Each year, Gerry D and the Totally Rad Christmas! Academy honor the raddest guests,
            funniest moments, best beards, and most gnarly episodes from the past year. Select a
            year below to see the winners.
          </p>
        </div>
        <RaddiesList />
      </Container>
    </div>
  )
}
