export const api_urls = {
  PRODUCTION: "https://auction-alpha.vercel.app",
  DEVELOPMENT: "http://localhost:3000",
}
export type IEnvironmentApiUrl = keyof typeof api_urls

export const api_endpoint = api_urls[process.env.ENVIRONMENT_SET as IEnvironmentApiUrl]

export const owner = "vitormarkis2369@gmail.com"
export const ownerId = process.env.OWNER_ID
