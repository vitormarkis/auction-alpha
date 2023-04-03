"use client"

import { FeedInfo } from "@/components/FeedInfo"
import { Post } from "@/components/Post"
import { IPostFeed, postFeedSchema } from "@/schemas/posts"
import { api } from "@/services/api"
import { SaveCopy } from "@styled-icons/fluentui-system-regular"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { z } from "zod"

export default function () {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery(["posts"], () => api.get("/posts").then(res => z.array(postFeedSchema).parse(res.data)), {
    refetchOnWindowFocus: true,
    staleTime: 1000 * 10, // 10 seconds
  })

  // const posts = [] as IPostFeed[]
  // const error = false
  // const isLoading = true

  if (error) return <p className="text-center font-bold">Aconteceu um erro...</p>
  if (!isLoading && !posts) return <p className="text-center font-bold">Algo de errado aconteceu...</p>

  return (
    <div>
      <div className="w-full max-w-[560px] h-full bg-white border-x border-x-neutral-400 mx-auto">
        <div className="flex flex-col">
          <div className="p-6 border-b border-neutral-400 flex items-center justify-center">
            <Link href="/post/new">
              <button className="rounded-lg bg-black text-white px-8 py-2 font-semibold flex items-center gap-2">
                <span>Fazer uma publicação</span>
                <SaveCopy
                  width={22}
                  height={22}
                />
              </button>
            </Link>
          </div>
          {isLoading ? (
            <FeedInfo>
              <p className="text-center font-bold">Carregando...</p>
            </FeedInfo>
          ) : posts.length > 0 ? (
            <div>
              {posts.map(post => (
                <Post
                  postProps={post}
                  key={post.id}
                />
              ))}
            </div>
          ) : (
            <FeedInfo>
              <p className="text-center">Nao há posts por aqui...</p>
            </FeedInfo>
          )}
        </div>
      </div>
    </div>
  )
}
