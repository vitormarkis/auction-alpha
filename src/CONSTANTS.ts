export type IEnvironmentApiUrl = "PRODUCTION" | "DEVELOPMENT"

export const api_urls: Record<IEnvironmentApiUrl, string> = {
  PRODUCTION: "https://auction-alpha.vercel.app",
  DEVELOPMENT: "http://localhost:3000",
}

export const api_endpoint = api_urls[process.env.ENVIRONMENT_SET as IEnvironmentApiUrl]
