"use client"

import clsx from "clsx"
import { useState } from "react"

export function Carousell({
  postMedias,
}: {
  postMedias: {
    id: string
    media: string
  }[]
}) {
  const [image, setImage] = useState(postMedias[0].media)

  return (
    <div>
      <div className="p-2">
        <img
          src={image}
          alt=""
          className="w-full aspect-square bg-neutral-300 object-cover rounded-lg border border-neutral-800"
        />
      </div>
      <div className="flex gap-2 p-2">
        {postMedias.map(({ id: img_id, media }) => (
          <img
            key={img_id}
            src={media}
            alt=""
            onClick={() => setImage(media)}
            className={clsx(
              "w-12 cursor-pointer aspect-square bg-neutral-300 object-cover rounded-lg border border-neutral-800",
              {
                "outline-2 outline-double outline-offset-2": image === media,
              }
            )}
          />
        ))}
      </div>
    </div>
  )
}
