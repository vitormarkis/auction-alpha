import { postFeedSchema } from "@/schemas/posts"
import { Carousell } from "./Carousell"

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const post = await fetch(`http://localhost:3000/api/posts/single?post_slug=${slug}`).then(async res =>
    postFeedSchema.parse(await res.json())
  )

  return (
    <div className="w-full max-w-[560px] h-full bg-white border-x border-x-neutral-400 mx-auto">
      <div className="p-6 border-b border-neutral-400">
        <Carousell postMedias={post.post_media} />
      </div>
      <div className="p-6 overflow-y-auto">
        <pre>{JSON.stringify(post, null, 2)}</pre>
      </div>
    </div>
  )
}
