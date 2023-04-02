"use client"

import { Post } from "@/components/Post"
import { SaveCopy } from "@styled-icons/fluentui-system-regular"

import { postFeedSchema } from "@/schemas/posts"
import { api } from "@/services/api"
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

  if (isLoading) return <p className="text-center font-bold">Carregando...</p>
  if (error) return <p className="text-center font-bold">Aconteceu um erro...</p>
  if (!posts) return <p className="text-center font-bold">Algo de errado aconteceu...</p>
  if (posts.length === 0) return <p className="text-center font-bold">Não há nada por aqui...</p>

  return (
    <div className="bg-neutral-200">
      <div className="w-full max-w-[560px] h-full bg-neutral-100 border-x border-x-neutral-500 mx-auto">
        <div className="">
          <div className="p-6 border-b border-black flex items-center justify-center">
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
          <div>
            {posts.map(post => (
              <Post
                postProps={post}
                key={post.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
