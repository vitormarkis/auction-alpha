import React, { createContext, useContext } from "react"
import { PostPage } from "@/requests/get-post/getPost"

export interface IPostContext {
  post: PostPage | null | undefined
}

export const PostContext = createContext({} as IPostContext)

export function PostProvider(props: {
  post: PostPage | null | undefined
  children: React.ReactNode
}) {
  return (
    <PostContext.Provider
      value={{
        post: props.post,
      }}
    >
      {props.children}
    </PostContext.Provider>
  )
}

export const usePost = () => useContext(PostContext)
