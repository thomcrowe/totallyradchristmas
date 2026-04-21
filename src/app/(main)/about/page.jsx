import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/Container'
import gerryImage from '@/images/gerry.png'

export const metadata = {
  title: 'About',
  description:
    "Learn about Totally Rad Christmas! and host Gerry D — the podcast dedicated to Christmas in the '80s to the max.",
  openGraph: {
    title: 'About - Totally Rad Christmas!',
    description:
      "Learn about Totally Rad Christmas! and host Gerry D — the podcast dedicated to Christmas in the '80s to the max.",
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

function SocialLink({ href, icon, label }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-red-100 hover:text-red-700 transition-colors"
      aria-label={label}
    >
      <i className={`${icon} text-lg`} />
    </Link>
  )
}

export default function About() {
  return (
    <Container className="py-16 lg:py-36">
      <div className="prose prose-slate max-w-none">
        <h1 className="text-4xl font-bold text-slate-900">About the Show</h1>

        <p className="mt-6 text-lg leading-8 text-slate-700">
          <strong>Totally Rad Christmas!</strong> is a podcast dedicated to all things Christmas
          in the &apos;80s — to the max! Each episode dives deep into the toys, movies, TV specials,
          music, books, games, comics, decorations, food, fashion, and fads that made the holidays
          of that era so unforgettable.
        </p>

        <p className="mt-4 text-lg leading-8 text-slate-700">
          Whether you grew up racing to the TV to catch your favorite Christmas special, hunting for
          the hottest toy under the tree, or just want to relive the magic of an &apos;80s Christmas,
          this show is for you.
        </p>

        <hr className="my-12 border-slate-200" />

        <h2 className="text-2xl font-bold text-slate-900">Your Host</h2>

        <div className="mt-8 flex flex-col sm:flex-row gap-8 not-prose">
          <div className="shrink-0">
            <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg ring-2 ring-red-200">
              <Image
                src={gerryImage}
                alt="Gerry D"
                className="w-full h-full object-cover"
                sizes="128px"
              />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Gerry D</h3>
            <p className="mt-3 text-base leading-7 text-slate-700">
              Gerry D is the creator and host of Totally Rad Christmas!, bringing his passion for
              &apos;80s nostalgia and Christmas culture together in one radical show. With hundreds
              of episodes covering everything from vintage toy commercials to classic holiday specials,
              Gerry has built one of the most comprehensive archives of &apos;80s Christmas content
              available anywhere.
            </p>
            <p className="mt-3 text-base leading-7 text-slate-700">
              Each week Gerry is joined by guest hosts and fellow enthusiasts to explore a different
              corner of &apos;80s Christmas history — from the biggest blockbuster movies to the
              most obscure Saturday morning cartoon holiday episodes.
            </p>
            <div className="mt-4 flex gap-3">
              <SocialLink
                href="https://twitter.com/radchristmas"
                icon="fa-brands fa-x-twitter"
                label="Gerry D on X (Twitter)"
              />
              <SocialLink
                href="https://www.instagram.com/totallyradchristmas"
                icon="fa-brands fa-instagram"
                label="Totally Rad Christmas on Instagram"
              />
              <SocialLink
                href="https://www.facebook.com/totallyradchristmas"
                icon="fa-brands fa-facebook"
                label="Totally Rad Christmas on Facebook"
              />
            </div>
          </div>
        </div>

        <hr className="my-12 border-slate-200" />

        <h2 className="text-2xl font-bold text-slate-900">Listen &amp; Subscribe</h2>
        <p className="mt-4 text-base leading-7 text-slate-700">
          Find Totally Rad Christmas! on all major podcast platforms:
        </p>
        <ul className="mt-4 space-y-2">
          <li>
            <Link
              href="https://open.spotify.com/show/0qICAW7PgbFNsDq00eMzpV"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Spotify
            </Link>
          </li>
          <li>
            <Link
              href="https://podcasts.apple.com/us/podcast/totally-rad-christmas/id1508004549"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Apple Podcasts
            </Link>
          </li>
          <li>
            <Link
              href="https://rss.buzzsprout.com/840331.rss"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-800 font-medium"
            >
              RSS Feed
            </Link>
          </li>
          <li>
            <Link
              href="https://linktr.ee/TotallyRadChristmas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-800 font-medium"
            >
              All Platforms (Linktree)
            </Link>
          </li>
        </ul>

        <hr className="my-12 border-slate-200" />

        <h2 className="text-2xl font-bold text-slate-900">Merch</h2>
        <p className="mt-4 text-base leading-7 text-slate-700">
          Grab some Totally Rad Christmas! gear at our{' '}
          <Link
            href="https://www.teepublic.com/user/totally-rad-christmas"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:text-red-800 font-medium"
          >
            TeePublic store
          </Link>
          .
        </p>
      </div>
    </Container>
  )
}
