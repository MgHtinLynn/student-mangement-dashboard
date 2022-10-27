/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    SPACES_KEY: process.env.SPACES_KEY,
    SPACES_SECRET: process.env.SPACES_SECRET
  },
  images: {
    domains: ['images.unsplash.com', 'genius.sgp1.digitaloceanspaces.com']
  }
}

module.exports = nextConfig
