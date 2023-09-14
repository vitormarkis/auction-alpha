/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com"],
  },
  esmExternals: false,
  env: {
    ENVIRONMENT_SET: process.env.ENVIRONMENT_SET,
  },
  // webpack(config) {
  //   config.infrastructureLogging = { debug: /PackFileCache/ }
  //   return config
  // },
}

module.exports = nextConfig
