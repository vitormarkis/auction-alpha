import { useSession } from "next-auth/react"
import { Post } from "@/components/Post"
import { HomeLayout } from "@/components/layouts/home-layout/HomeLayout"
import { PostSkeleton } from "@/components/molecules/skeleton-post/PostSkeleton"
import { usePosts } from "@/hooks/use-posts/usePosts"

export default function HomePage() {
  const { user } = useSession().data ?? {}
  const { postsQuery } = usePosts()
  const { data: posts, isLoading: postsLoading } = postsQuery

  // const postsLoading = true

  return (
    <HomeLayout>
      <div className="grow h-[calc(100dvh_-_52px)]">
        <div className="w-full max-w-[560px] h-full bg-white mx-auto overflow-y-scroll scroll-thin">
          <div className="flex flex-col">
            {postsLoading || !posts ? (
              <PostSkeleton quantity={4} />
            ) : (
              posts.map(post => (
                <Post
                  post={post}
                  key={post.id}
                  user={user!}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <div className="hidden sm:flex basis-[64px] lg:basis-[240px] shrink-[999]" />
    </HomeLayout>
  )
}
