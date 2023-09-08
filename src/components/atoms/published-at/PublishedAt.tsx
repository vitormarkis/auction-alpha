import moment from "moment"
import React from "react"
import { cn } from "@/lib/utils"
import { usePost } from "@/hooks/use-post/usePost"

export type PublishedAtProps = React.ComponentPropsWithoutRef<"p"> & {}

export const PublishedAt = React.forwardRef<React.ElementRef<"p">, PublishedAtProps>(
  function PublishedAtComponent({ ...props }, ref) {
    const { post } = usePost()

    return (
      <p
        {...props}
        className={cn("mb-3 text-xs text-neutral-400", props.className)}
        ref={ref}
      >
        <span>Publicado </span>
        {post ? (
          <span className="font-semibold">{moment(post.created_at).locale("pt-br").fromNow()}</span>
        ) : (
          <span className="inline-block h-3 w-[4.5rem] translate-y-[2px] rounded-sm bg-gray-300 animate-pulse" />
        )}
        {" - encerra em "}
        <span className="font-semibold inline-block px-1.5 py-0.5 rounded-lg bg-indigo-100 text-indigo-500">
          {post ? (
            moment(post.announcement_date).locale("pt-br").toNow(true)
          ) : (
            <span className="inline-block h-3 w-[2.5rem] translate-y-[2px] rounded-sm bg-indigo-300 animate-pulse" />
          )}
        </span>
      </p>
    )
  }
)

PublishedAt.displayName = "PublishedAt"
