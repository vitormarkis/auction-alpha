import { z } from "zod"
import { Suspense } from "react"
import { Post } from "@/components/Post"
import { postFeedSchema } from "@/schemas/posts"
import { api_endpoint } from "../../CONSTANTS"
import { getSession } from "@/components/Header"
import { headers } from "next/headers"

export async function PostsSection() {
  const [session, posts] = await Promise.all([
    getSession(headers().get("cookie") ?? ""),
    fetch(`${api_endpoint}/api/posts`, {
      cache: "no-store",
      next: { revalidate: 10 },
    }).then(async r => z.array(postFeedSchema).parse(await r.json())),
  ])

  const user = session?.user ?? null

  return (
    <>
      {posts.map(post => (
        <Post
          postProps={post}
          key={post.id}
          user={user}
        />
      ))}
    </>
  )
}
