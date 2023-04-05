import { Post } from "@/components/Post"
import { postFeedSchema } from "@/schemas/posts"
import { SaveCopy } from "@styled-icons/fluentui-system-regular/SaveCopy"
import Link from "next/link"
import { z } from "zod"

export default async function () {
  const posts = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
    next: { revalidate: 10 },
  }).then(async r => z.array(postFeedSchema).parse(await r.json()))

  return (
    <div>
      <div className="w-full max-w-[560px] h-full bg-white border-x border-x-neutral-400 mx-auto">
        <div className="flex flex-col">
          <div className="p-6 border-b border-neutral-400 flex items-center justify-center">
            <Link href="/post/new">
              <button className="rounded-lg bg-black text-white px-8 py-2 font-semibold flex items-center gap-2">
                <span>Fazer uma publicação</span>
                {/* <SaveCopy
                  width={22}
                  height={22}
                /> */}
              </button>
            </Link>
          </div>
          {posts.map(post => (
            <Post
              postProps={post}
              key={post.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
