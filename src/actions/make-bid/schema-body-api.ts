import { z } from "zod"

export const makeBidAPIBodySchema = z.object({
  post_id: z.string(),
  value: z.number(),
})

export type MakeBidAPIBody = z.infer<typeof makeBidAPIBodySchema>
