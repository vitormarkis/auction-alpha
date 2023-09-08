import React, { createContext, useCallback, useContext } from "react"
import {
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query"
import { api_endpoint } from "@/CONSTANTS"
import { CreatedBid } from "@/actions/make-bid/database-operation"
import { MakeBidVariables } from "@/actions/make-bid/mutation-variables"
import { PostPage } from "@/requests/get-post/getPost"
import { PostSession } from "@/requests/get-posts/getPosts"

export interface IPostsContext {
  postsQuery: UseQueryResult<PostSession[]>
  getPostPageQuery: (slug: string, options?: UseQueryOptions<PostPage>) => UseQueryResult<PostPage>
  getMakeBidMutation: (
    options?: UseMutationOptions<CreatedBid, unknown, MakeBidVariables>
  ) => UseMutationResult<CreatedBid, unknown, MakeBidVariables>
}

export const PostsContext = createContext({} as IPostsContext)

export function PostsProvider(props: { children: React.ReactNode }) {
  const getMakeBidMutation = useCallback(
    (options?: UseMutationOptions<CreatedBid, unknown, MakeBidVariables>) => {
      const { ...mutationsOptions } = options ?? {}

      return useMutation<CreatedBid, unknown, MakeBidVariables>({
        mutationFn: async ({ form, subject }) => {
          const response = await fetch(`/api/posts/bids`, {
            method: "POST",
            body: JSON.stringify({
              post_id: subject.postId,
              value: form.value,
            }),
          })
          if (!response.ok) throw new Error()
          const data = (await response.json()) as CreatedBid
          return data
        },
        ...mutationsOptions,
      })
    },
    []
  )

  const getPostPageQuery = useCallback((slug: string, options?: UseQueryOptions<PostPage>) => {
    const { queryHash, queryFn, ...queryOptions } = options ?? {}

    return useQuery<PostPage>({
      queryKey: ["post", slug],
      queryFn: async () => {
        const response = await fetch(`${api_endpoint}/api/posts/${slug}`)
        if (!response.ok) throw new Error()
        const data = (await response.json()) as PostPage
        return data
      },
      ...queryOptions,
    })
  }, [])

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
        getPostPageQuery,
        getMakeBidMutation,
      }}
    >
      {props.children}
    </PostsContext.Provider>
  )
}

export const usePosts = () => useContext(PostsContext)
