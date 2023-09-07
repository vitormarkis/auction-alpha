/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com"],
  },
  experimental: {
    serverActions: true,
  },
  // env: {
  //   NEXTAUTH_URL: process.env.NEXTAUTH_URL
  // }
  experimental: {
    appDir: true,
  },
  // webpack(config) {
  //   config.infrastructureLogging = { debug: /PackFileCache/ }
  //   return config
  // },
}

module.exports = nextConfig
