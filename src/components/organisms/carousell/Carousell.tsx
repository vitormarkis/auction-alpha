import { HTMLAttributes, useState } from "react"
import { cn } from "@/lib/utils"
import { PostSession } from "@/requests/get-posts/getPosts"

interface Props extends HTMLAttributes<HTMLDivElement> {
  postMedias: PostSession["post_media"]
}

export function Carousell({ postMedias, className, ...rest }: Props) {
  const [image, setImage] = useState(postMedias[0].media)

  return (
    <div
      className={`flex mdx:flex-row flex-col-reverse gap-5 mdx:gap-0 ${className}`}
      {...rest}
    >
      <div className="flex mdx:flex-col gap-2 p-2 px-7 mdx:px-2">
        {postMedias.map(({ id: img_id, media }) => (
          <img
            key={img_id}
            src={media ?? ""}
            alt=""
            onClick={() => setImage(media)}
            className={cn(
              "w-12 cursor-pointer aspect-square bg-neutral-200 object-contain rounded-lg",
              {
                "outline-1 outline outline-offset-2 outline-blue-500": image === media,
              }
            )}
          />
        ))}
      </div>
      <div className="py-2 grow px-6 md:px-0 mdx:px-7">
        <div className="relative md:min-h-[1rem] md:w-full aspect-square bg-neutral-200 overflow-hidden flex justify-center rounded-lg grow">
          {image ? (
            <img
              src={image}
              alt=""
              className="absolute top-0 bottom-0 w-full h-full object-contain"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-300 animate-pulse" />
          )}
        </div>
      </div>
    </div>
  )
}
