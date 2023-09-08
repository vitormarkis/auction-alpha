import { PrismaClient } from "@prisma/client"
import { DeleteBidAPIBody } from "@/actions/delete-bid/schema-body-api"

export type DeleteBidPayload = DeleteBidAPIBody

export async function deleteBid(payload: DeleteBidPayload, prisma: PrismaClient) {
  await prisma.bids.delete({
    where: {
      id: payload.bidId,
    },
  })
}

export type DeleteBid = Awaited<ReturnType<typeof deleteBid>>
