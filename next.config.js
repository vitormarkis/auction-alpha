/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com"],
  },
  // env: {
  //   NEXTAUTH_URL: process.env.NEXTAUTH_URL
  // }
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
