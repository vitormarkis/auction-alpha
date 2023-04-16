import Link from "next/link"
import { PostsSection } from "./PostsSection"
import { Suspense } from "react"
import Sidebar from "@/components/Sidebar"

export default async function () {
  return (
    <>
      <div className="grow h-[calc(100dvh_-_52px)]">
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
              <PostsSection />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="hidden sm:flex basis-[64px] lg:basis-[240px] shrink-[999]" />
    </>
  )
}
