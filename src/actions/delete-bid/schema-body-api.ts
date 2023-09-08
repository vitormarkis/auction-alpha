import { z } from "zod"

export const deleteBidAPIBodySchema = z.object({
  bidId: z.string(),
})

export type DeleteBidAPIBody = z.infer<typeof deleteBidAPIBodySchema>
