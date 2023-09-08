import { useSession } from "next-auth/react"
import React from "react"
import { cn } from "@/lib/utils"
import { usePost } from "@/hooks/use-post/usePost"

export type BidsQuantityIndicatorProps = React.ComponentPropsWithoutRef<"p"> & {}

export const BidsQuantityIndicator = React.forwardRef<
  React.ElementRef<"p">,
  BidsQuantityIndicatorProps
>(function BidsQuantityIndicatorComponent({ ...props }, ref) {
  const { user } = useSession().data ?? {}
  const { post } = usePost()

  const isAuthor = post?.author_id === user?.id
  const hasBids = post ? post._count.bids > 0 : false

  return (
    <p
      {...props}
      className={cn(
        "py-1 px-1.5 text-sm rounded-lg",
        {
          "bg-orange-300 text-black": (!isAuthor && hasBids) || (isAuthor && !hasBids),
          "bg-indigo-100 text-indigo-500": (isAuthor && hasBids) || (!isAuthor && !hasBids),
        },
        props.className
      )}
      ref={ref}
    >
      {hasBids
        ? `${post?._count.bids} lance${post ? (post._count.bids > 1 ? "s" : "") : ""} no momento`
        : "Sem lances no momento"}
    </p>
  )
})

BidsQuantityIndicator.displayName = "BidsQuantityIndicator"
