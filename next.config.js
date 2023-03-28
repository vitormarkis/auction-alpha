/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // env: {
  //   NEXTAUTH_URL: process.env.NEXTAUTH_URL
  // }
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
