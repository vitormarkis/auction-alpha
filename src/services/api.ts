import { api_url } from "@/CONSTANTS"
import axios from "axios"
import { getSession } from "next-auth/react"

export const api = axios.create({
  baseURL: `${api_url}/api`,
})

// api.interceptors.request.use(async config => {
//   const session = await getSession()
//   if (!session) return config

//   if (session.user?.accessToken) {
//     const accessToken = session.user.accessToken
//     config.headers.setAuthorization(`Bearer ${accessToken}`)
//   }
//   console.log(config)

//   return config
// })
