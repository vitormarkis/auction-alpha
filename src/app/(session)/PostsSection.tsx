import { z } from "zod"
import { Suspense } from "react"
import { Post } from "@/components/Post"
import { postFeedSchema } from "@/schemas/posts"
import { api_url } from "../../CONSTANTS"

export async function PostsSection() {
  const posts = await fetch(`${api_url}/api/posts`, {
    cache: "no-store",
    next: { revalidate: 10 },
  }).then(async r => z.array(postFeedSchema).parse(await r.json()))

  return (
    <>
      {posts.map(post => (
        <Post
          postProps={post}
          key={post.id}
        />
      ))}
    </>
  )
}
