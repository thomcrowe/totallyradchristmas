/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.raster.app',
      },
      {
        protocol: 'https',
        hostname: 'storage.buzzsprout.com',
      },
    ],
  },
}

module.exports = nextConfig
