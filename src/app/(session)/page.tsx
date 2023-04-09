import Link from "next/link"
import { PostsSection } from "./PostsSection"
import { Suspense } from "react"

export default async function () {
  return (
    <div className="grow">
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
          <Suspense fallback={<h1 className="text-center mx-auto">Carregando...</h1>}>
            {/* @ts-expect-error */}
            <PostsSection />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
