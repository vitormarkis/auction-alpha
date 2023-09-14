import { createPostFormSchema } from "@/actions/create-post/schema-form"
import { z } from "zod"

export const createPostAPIBodySchema = 
  createPostFormSchema
    .omit({ medias_url: true })
    .merge(z.object({
      medias_url: z.array(z.string()).min(1)
    }))

export type CreatePostAPIBody = z.output<typeof createPostAPIBodySchema>
