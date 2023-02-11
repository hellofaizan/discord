/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  reactStrictMode: true, 
  images: {
    domains: ['cdn.discordapp.com'],
    env: {
      WEEBHOOK_URL: process.env.WEEBHOOK_URL,
    },
  },
}
