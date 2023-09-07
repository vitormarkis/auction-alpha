import { PrismaClient } from "@prisma/client"

export async function getUserBids(userId: string, prisma: PrismaClient) {
  const { Bids } = await prisma.user.findFirstOrThrow({
    where: {
      id: userId,
    },
    select: {
      Bids: {
        select: {
          id: true,
          post_id: true,
          value: true,
          post: {
            select: {
              announcement_date: true,
            },
          },
        },
      },
    },
  })

  return { user_bids: Bids }
}

export type UserBid = Awaited<ReturnType<typeof getUserBids>>["user_bids"][number]
