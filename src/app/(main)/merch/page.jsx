import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { products, STORE_URL } from '@/lib/merch'

export const metadata = {
  title: 'Merch',
  description:
    "Totally Rad Christmas! gear — T-shirts, hoodies, and more from the '80s Christmas podcast.",
  openGraph: {
    title: 'Merch - Totally Rad Christmas!',
    description:
      "Totally Rad Christmas! gear — T-shirts, hoodies, and more from the '80s Christmas podcast.",
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

function ShoppingBagIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z"
      />
    </svg>
  )
}

function ExternalLinkIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default function MerchPage() {
  return (
    <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
      <Container>
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl/7 font-bold text-slate-900">Merch</h1>
          <p className="mt-2 text-base leading-7 text-slate-600">
            Wear your love for &apos;80s Christmas loud and proud — shirts, hoodies,
            stickers, and more. All designs on TeePublic. 🎄
          </p>

          {/* CTA banner */}
          <div className="mt-6 flex items-center gap-4 rounded-2xl bg-red-50 px-6 py-4 ring-1 ring-red-100">
            <ShoppingBagIcon className="h-8 w-8 shrink-0 text-red-600" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900">Shop the full store on TeePublic</p>
              <p className="text-sm text-slate-600">Each design is available as a tee, hoodie, mug, sticker, and more.</p>
            </div>
            <Link
              href={STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-700 transition-colors"
            >
              Shop Now
              <ExternalLinkIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Product grid */}
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
        >
          {products.map((product) => (
            <li key={product.id}>
              <Link
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                {/* Product image */}
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200 transition-all group-hover:ring-red-400 group-hover:shadow-lg group-hover:shadow-red-100">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    unoptimized
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100 p-4">
                    <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-900">
                      <ShoppingBagIcon className="h-3.5 w-3.5" />
                      Shop on TeePublic
                    </span>
                  </div>
                </div>

                {/* Product title */}
                <p className="mt-3 text-sm font-semibold text-slate-900 group-hover:text-red-600 transition-colors leading-tight">
                  {product.title}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">T-shirt & more</p>
              </Link>
            </li>
          ))}
        </ul>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-sm text-slate-500 mb-4">
            Don&apos;t see what you&apos;re looking for? Browse the full catalog on TeePublic.
          </p>
          <Link
            href={STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-700 transition-colors"
          >
            Visit the Full Store
            <ExternalLinkIcon className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </div>
  )
}
