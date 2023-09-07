import React, { createContext, useCallback, useContext } from "react"
import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query"
import { api_endpoint } from "@/CONSTANTS"
import { PostSession } from "@/requests/get-posts/getPosts"

export interface IPostsContext {
  postsQuery: UseQueryResult<PostSession[]>
}

export const PostsContext = createContext({} as IPostsContext)

export function PostsProvider(props: { children: React.ReactNode }) {
  const getPostsQuery = useCallback((options?: UseQueryOptions<PostSession[]>) => {
    const { queryHash, queryFn, ...queryOptions } = options ?? {}

    return useQuery<PostSession[]>({
      queryKey: ["posts"],
      queryFn: async () => {
        const response = await fetch(`${api_endpoint}/api/posts`)
        if (!response.ok) throw new Error()
        const data = (await response.json()) as PostSession[]
        return data
      },
      ...queryOptions,
    })
  }, [])

  const postsQuery = getPostsQuery()

  return (
    <PostsContext.Provider
      value={{
        postsQuery,
      }}
    >
      {props.children}
    </PostsContext.Provider>
  )
}

export const usePosts = () => useContext(PostsContext)
