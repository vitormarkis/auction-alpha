"use client"

import clsx from "clsx"
import { HTMLAttributes, useState } from "react"

interface Props extends HTMLAttributes<HTMLDivElement> {
  postMedias: {
    id: string
    media: string
  }[]
}

export function Carousell({ postMedias, className, ...rest }: Props) {
  const [image, setImage] = useState(postMedias[0].media)

  return (
    <div
      className={`flex ${className}`}
      {...rest}
    >
      <div className="flex flex-col gap-2 p-2">
        {postMedias.map(({ id: img_id, media }) => (
          <img
            key={img_id}
            src={media}
            alt=""
            onClick={() => setImage(media)}
            className={clsx("w-12 cursor-pointer aspect-square bg-neutral-300 object-cover rounded-lg", {
              "outline-1 outline outline-offset-2 outline-blue-500": image === media,
            })}
          />
        ))}
      </div>
      <div className="p-2 flex justify-center grow">
        <img
          src={image}
          alt=""
          className="w-[420px] aspect-square bg-neutral-300 object-cover rounded-lg shadow-md shadow-black/40"
        />
      </div>
    </div>
  )
}
