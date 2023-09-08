import { Poll } from "@styled-icons/fluentui-system-regular/Poll"

export type PostSkeletonProps = {
  quantity?: number
}

export function PostSkeleton({ quantity = 1 }: PostSkeletonProps) {
  return (
    <>
      {Array.from({ length: quantity }).map((_, key) => (
        <div
          key={`post-skeleton-${key}`}
          className="p-6 whitespace-nowrap"
        >
          <div className="flex mb-3.5">
            <div>
              <div className="w-14 h-14 rounded-full bg-gray-300 animate-pulse" />
            </div>
            <div className="flex flex-col justify-center gap-2 ml-3">
              <div className="h-5 w-[6rem] rounded-md bg-gray-300 animate-pulse" />
              <div className="h-4 w-[4.5rem] rounded-md bg-gray-300 animate-pulse" />
            </div>
            <div className="ml-auto flex">
              <div className="h-6 w-6 rounded-md m-2 bg-gray-300 animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="h-5 w-full rounded-md bg-gray-300 animate-pulse" />
            <div className="h-5 w-[15rem] rounded-md bg-gray-300 animate-pulse" />
          </div>
          <div className="mt-3 rounded-lg flex flex-col border border-black overflow-hidden cursor-pointer">
            <div className="flex">
              <div className="w-full h-72 bg-gray-300 animate-pulse" />
            </div>
            <div className="p-2 bg-black">
              <div className="h-5 w-[9rem] rounded-md bg-gray-800 animate-pulse" />
            </div>
            <div className="px-4 py-3 flex items-center">
              <div>
                <div className="flex items-center gap-1 font-semibold text-2xl">
                  <span>R$</span>
                  <span className="inline-block h-6 w-[5rem] rounded-md bg-gray-300 animate-pulse" />
                </div>
              </div>
              <div className="bg-neutral-400 h-5 w-[1px] mx-3" />
              <div className="hidden whitespace-normal sm:flex items-center text-sm">
                <div className="h-4 w-full max-w-[8.5rem] rounded-md bg-gray-300 animate-pulse" />
              </div>
              <div className="ml-auto">
                <button className="py-1.5 rounded-lg pr-6 pl-4 bg-black text-white flex items-center">
                  <Poll
                    width={16}
                    height={16}
                  />
                  <p className="ml-2">Ver mais</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
