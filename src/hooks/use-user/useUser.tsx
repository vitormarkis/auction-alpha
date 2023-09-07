import { useSession } from "next-auth/react"
import React, { createContext, useCallback, useContext } from "react"
import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query"
import { api_endpoint } from "@/CONSTANTS"
import { UserBid } from "@/utils/get-user-bids/getUserBids"

export interface IUserContext {
  getUserBidsQuery: (options?: UseQueryOptions<UserBid[]>) => UseQueryResult<UserBid[]>
  userBidsQuery: UseQueryResult<UserBid[]>
}

export const UserContext = createContext({} as IUserContext)

export function UserProvider(props: { children: React.ReactNode }) {
  const { data } = useSession()
  const { user } = data ?? {}

  const getUserBidsQuery = useCallback(
    (options?: UseQueryOptions<UserBid[]>) => {
      const { queryHash, queryFn, ...queryOptions } = options ?? {}

      return useQuery<UserBid[]>({
        queryKey: ["userBids", user?.id],
        queryFn: async () => {
          const response = await fetch(`${api_endpoint}/api/users/get-bids`)
          if (!response.ok) throw new Error()
          const data = (await response.json()) as UserBid[]
          return data
        },
        ...queryOptions,
      })
    },
    [user?.id]
  )

  const userBidsQuery = getUserBidsQuery()

  return (
    <UserContext.Provider
      value={{
        getUserBidsQuery,
        userBidsQuery,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
