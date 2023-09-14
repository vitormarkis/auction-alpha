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
import { CreatedPost } from "@/actions/create-post/database-operation"
import { CreatePostVariables } from "@/actions/create-post/mutation-variables"
import { CreatePostAPIBody } from "@/actions/create-post/schema-body-api"
import { DeleteBidVariables } from "@/actions/delete-bid/mutation-variables"
import { DeleteBidAPIBody } from "@/actions/delete-bid/schema-body-api"
import { CreatedBid } from "@/actions/make-bid/database-operation"
import { MakeBidVariables } from "@/actions/make-bid/mutation-variables"
import { MakeBidAPIBody } from "@/actions/make-bid/schema-body-api"
import { DeleteBidResponse } from "@/pages/api/posts/bids"
import { PostPage } from "@/requests/get-post/getPost"
import { PostSession } from "@/requests/get-posts/getPosts"

export interface IPostsContext {
  postsQuery: UseQueryResult<PostSession[]>
  getPostPageQuery: (slug: string, options?: UseQueryOptions<PostPage>) => UseQueryResult<PostPage>
  getMakeBidMutation: (
    options?: UseMutationOptions<CreatedBid, unknown, MakeBidVariables>
  ) => UseMutationResult<CreatedBid, unknown, MakeBidVariables>
  getDeleteBidMutation: (
    options?: UseMutationOptions<DeleteBidResponse, unknown, DeleteBidVariables>
  ) => UseMutationResult<DeleteBidResponse, unknown, DeleteBidVariables>
  getCreatePostMutation: (
    options?: UseMutationOptions<CreatedPost, unknown, CreatePostVariables>
  ) => UseMutationResult<CreatedPost, unknown, CreatePostVariables>
}

export const PostsContext = createContext({} as IPostsContext)

export function PostsProvider(props: { children: React.ReactNode }) {
  const getCreatePostMutation = useCallback(
    (options?: UseMutationOptions<CreatedPost, unknown, CreatePostVariables>) => {
      const { ...mutationsOptions } = options ?? {}

      return useMutation<CreatedPost, unknown, CreatePostVariables>({
        mutationFn: async ({ form }) => {
          const { announcement_date, medias_url, price, text, title } = form
          const response = await fetch(`/api/posts`, {
            method: "POST",
            body: JSON.stringify({
              announcement_date,
              medias_url,
              price,
              text,
              title,
            } satisfies CreatePostAPIBody),
          })
          if (!response.ok) throw new Error()
          const data = (await response.json()) as CreatedPost
          return data
        },
        ...mutationsOptions,
      })
    },
    []
  )

  const getDeleteBidMutation = useCallback(
    (options?: UseMutationOptions<DeleteBidResponse, unknown, DeleteBidVariables>) => {
      const { ...mutationsOptions } = options ?? {}

      return useMutation<DeleteBidResponse, unknown, DeleteBidVariables>({
        mutationFn: async ({ subject }) => {
          const response = await fetch(`/api/posts/bids`, {
            method: "DELETE",
            body: JSON.stringify({
              bidId: subject.bidId,
            } satisfies DeleteBidAPIBody),
          })
          if (!response.ok) throw new Error()
          const data = (await response.json()) as DeleteBidResponse
          return data
        },
        ...mutationsOptions,
      })
    },
    []
  )

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
            } satisfies MakeBidAPIBody),
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
        getDeleteBidMutation,
        getCreatePostMutation,
      }}
    >
      {props.children}
    </PostsContext.Provider>
  )
}

export const usePosts = () => useContext(PostsContext)
