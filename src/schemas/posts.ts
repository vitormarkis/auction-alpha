import { z } from "zod"

export const postFeedSchema = z.object({
  id: z.string(),
  created_at: z.string(),
  title: z.string(),
  text: z.string(),
  price: z.number(),
  author_id: z.string(),
  author: z.object({
    name: z.string(),
    image: z.string(),
  }),
  post_media: z.array(
    z.object({
      id: z.string(),
      media: z.string(),
    })
  ),
})

export type IPostFeed = z.infer<typeof postFeedSchema>
