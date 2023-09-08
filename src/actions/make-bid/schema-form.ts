import { z } from "zod"

export const makeBidFormSchema = z.object({
  value: z.coerce.number(),
})

export type MakeBidForm = z.infer<typeof makeBidFormSchema>
