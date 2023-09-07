import { getSession } from "@/components/Header"
import { headers } from "next/headers"
import { Suspense } from "react"
import { PostsSection } from "./PostsSection"

export default async function () {
  const session = getSession(headers().get("cookie") ?? "")

  return (
    <>
      <div className="grow h-[calc(100dvh_-_52px)]">P
        <div className="w-full max-w-[560px] h-full bg-white mx-auto overflow-y-scroll scroll-thin">
          <div className="flex flex-col">
            <Suspense
              fallback={
                <div className="p-6">
                  <h1 className="mx-auto text-center">Carregando...</h1>
                </div>
              }
            >
              {/* @ts-expect-error */}
              <PostsSection session={session} />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="hidden sm:flex basis-[64px] lg:basis-[240px] shrink-[999]" />
    </>
  )
}
