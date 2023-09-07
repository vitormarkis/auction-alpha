import axios from "axios"
import { api_endpoint } from "@/CONSTANTS"

export const api = axios.create({
  baseURL: [api_endpoint, "/api"].join(""),
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
