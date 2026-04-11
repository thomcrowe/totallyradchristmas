import Link from 'next/link'
import { Waveform } from '@/components/Waveform'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
      <Waveform className="mb-8 h-16 w-64 opacity-40" />
      <h1 className="text-4xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-4 text-lg text-slate-600">
        Looks like this page got lost somewhere in the &apos;80s.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-red-600 px-6 py-3 text-sm font-bold text-white hover:bg-red-800"
      >
        Back to the episodes
      </Link>
    </div>
  )
}
