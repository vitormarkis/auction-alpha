import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { prisma } from "@/services/prisma"
import { authOptions } from "../../auth/[...nextauth]"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const session = await getServerSession(req, res, authOptions)
      if (!session || !session.user || !session.user.id) {
        return res.json({ redirect: { path: "/signin" } })
      }

      const { Bids: user_bids } = await prisma.user.findFirstOrThrow({
        where: {
          id: session.user.id,
          // id: "clg8nt53b0004ve4fft0ktsvf",
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

      if (!user_bids) {
        return res.status(400).json({ message: "Usuário ainda não fez nenhum lance." })
      }

      return res.status(200).json(user_bids)
    } catch (error) {
      return res.status(400).json(error)
    }
  } else {
    return res.status(404).end()
  }
}
