import Link from "next/link"
import { PostsSection } from "./PostsSection"
import { Suspense } from "react"

export default async function () {
  return (
    <div className="grow h-[calc(100vh_-_52px)]">
      <div className="w-full max-w-[560px] min-w-[500px] h-full bg-white mx-auto overflow-y-scroll scroll-thin">
        <div className="flex flex-col">
          <Suspense
            fallback={
              <div className="p-6">
                <h1 className="text-center mx-auto">Carregando...</h1>
              </div>
            }
          >
            {/* @ts-expect-error */}
            <PostsSection />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
