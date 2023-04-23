import { api_endpoint } from "@/CONSTANTS"
import { IUserBid, IUserSession, userBidsSchema } from "@/schemas/users"
import { z } from "zod"
import { getUserActiveBids as getUserActiveBidsFunction } from "../components/Sidebar/getActiveUserBids"
import { User } from "@/types/interfaces"

export function createUser(user: User | null) {
  function getUserBids() {
    let userBids: IUserBid[] | null = []
    const fetchUserBids = (endpoint: string, headers: Headers) => {
      return fetch(api_endpoint + endpoint, { cache: "no-store", headers })
        .then(res => {
          if (res.ok) {
            return res.json()
          }
        })
        .then(async data => {
          const parseUserBids = await z.array(userBidsSchema).safeParseAsync(data)

          userBids = parseUserBids.success ? parseUserBids.data : null
          return userBids
        })
    }

    const getUserActiveBids = (): Promise<{ userActiveBids: IUserBid[] }> => new Promise((resolve, reject) => {
      if(userBids) return resolve({ userActiveBids: getUserActiveBidsFunction(userBids) })
      return reject(null)
    })

    return { fetchUserBids, getUserActiveBids }
  }

  return {
    getUserBids,
  }
}
