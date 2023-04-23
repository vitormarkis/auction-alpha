import { api_endpoint } from "@/CONSTANTS"
import { IUserBid, userBidsSchema } from "@/schemas/users"
import { z } from "zod"
import { getUserActiveBids as getUserActiveBidsFunction } from "../components/Sidebar/getActiveUserBids"
import { User } from "@/types/interfaces"

export function createUser(user: User | null) {
  let _userBids: IUserBid[] = []
  function getUserBids() {
    const fetchUserBids = async (endpoint: string, headers: Headers) => {
      try {
        const response = await fetch(api_endpoint + endpoint, { cache: "no-store", headers })
        if (!response.ok) return { userBids: [] as IUserBid[] }
        const data = await response.json()
        const parsingUserBids = z.array(userBidsSchema).safeParse(data)
        const userBids = parsingUserBids.success ? parsingUserBids.data : ([] as IUserBid[])
        _userBids = userBids
        return { userBids }
      } catch (error) {
        console.log(error)
        return { userBids: [] as IUserBid[] }
      }
    }

    const getUserActiveBids = (userBids: IUserBid[] | null) => ({
      userActiveBids: userBids ? getUserActiveBidsFunction(userBids) : ([] as IUserBid[]),
    })

    return { fetchUserBids, getUserActiveBids }
  }

  return {
    getUserBids,
  }
}
