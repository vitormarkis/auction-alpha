/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com", "utfs.io"],
  },
  experimental: {
    esmExternals: false,
  },
  env: {
    ENVIRONMENT_SET: process.env.ENVIRONMENT_SET,
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
  },
  // webpack(config) {
  //   config.infrastructureLogging = { debug: /PackFileCache/ }
  //   return config
  // },
}

module.exports = nextConfig
