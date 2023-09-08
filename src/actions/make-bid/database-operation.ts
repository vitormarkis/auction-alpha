import { PrismaClient } from "@prisma/client"
import { MakeBidAPIBody } from "@/actions/make-bid/schema-body-api"

export type CreateBidPayload = MakeBidAPIBody & {
  user_id: string
}

export async function createBid(payload: CreateBidPayload, prisma: PrismaClient) {
  const createdBid = await prisma.bids.create({
    data: payload,
  })

  return createdBid
}

export type CreatedBid = Awaited<ReturnType<typeof createBid>>
