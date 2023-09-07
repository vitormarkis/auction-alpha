import { z } from "zod"

export const postsSessionSchema = z.object({
  id: z.string(),
  created_at: z.string(),
  title: z.string(),
  text: z.string(),
  slug: z.string(),
  price: z.number(),
  announcement_date: z.string(),
  author_id: z.string(),
  _count: z.object({
    bids: z.number(),
  }),
  author: z.object({
    name: z.string(),
    role: z.enum(["USER", "ADMIN"]),
    image: z.string().nullable(),
  }),
  post_media: z.array(
    z.object({
      id: z.string(),
      media: z.string(),
    })
  ),
  bids: z.array(
    z.object({
      id: z.string(),
      created_at: z.string(),
      value: z.number(),
      post_id: z.string(),
      user: z.object({
        id: z.string(),
        image: z.string(),
        name: z.string(),
      }),
    })
  ),
})

export const bidSchema = z.object({
  post_id: z.string(),
  value: z.coerce.number(),
})

export type IBidBody = z.infer<typeof bidSchema>
export type PostSession = z.infer<typeof postsSessionSchema>
