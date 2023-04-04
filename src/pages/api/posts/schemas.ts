import { z } from "zod"

export const mediasPostSchema = z.array(z.string())

export const newPostSchema = z.object({
  title: z.string(),
  text: z.string(),
  medias_url: mediasPostSchema,
  price: z.string(),
})

export type TNewPostBody = z.input<typeof newPostSchema>
