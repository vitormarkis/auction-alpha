import { Session } from "next-auth"
import { headers } from "next/headers"
import { getSession } from "@/components/Header"
import { Post } from "@/components/Post"
import { api } from "@/requests/api"

export async function PostsSection({}: { session?: Session }) {
  const session = await getSession(headers().get("cookie") ?? "")
  const { posts } = await api.getPosts()

  const user = session?.user ?? null

  return (
    <>
      {posts.map(post => (
        <Post
          post={post}
          key={post.id}
          user={user}
        />
      ))}
    </>
  )
}
