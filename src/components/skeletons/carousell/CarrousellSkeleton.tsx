import React from "react"
import { cn } from "@/lib/utils"

export type CarrousellSkeletonProps = React.ComponentPropsWithoutRef<"div"> & {
  quantity?: number
}

export const CarrousellSkeleton = React.forwardRef<
  React.ElementRef<"div">,
  CarrousellSkeletonProps
>(function CarrousellSkeletonComponent({ quantity: quantities = 1, ...props }, ref) {
  return (
    <div
      {...props}
      className={cn("flex mdx:flex-row flex-col-reverse gap-5 mdx:gap-0", props.className)}
      ref={ref}
    >
      <div className="flex mdx:flex-col gap-2 p-2 px-7 mdx:px-2">
        {Array.from({ length: quantities }).map((_, key) => (
          <div
            key={key}
            className={cn("w-12 aspect-square bg-gray-300 animate-pulse rounded-lg")}
          />
        ))}
      </div>
      <div className="py-2 grow px-6 md:px-6 mdx:px-7">
        <div className="relative md:min-h-[1rem] md:w-full aspect-square bg-neutral-200 overflow-hidden flex justify-center rounded-lg grow">
          <div className="absolute inset-0 bg-gray-300 animate-pulse" />
        </div>
      </div>
    </div>
  )
})

CarrousellSkeleton.displayName = "CarrousellSkeleton"
