import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { z } from "zod"
import { createBid } from "@/actions/make-bid/database-operation"
import { makeBidAPIBodySchema } from "@/actions/make-bid/schema-body-api"
import { prisma } from "@/services/prisma"
import { payloadParser } from "@/utils/payloadParser"
import { authOptions } from "../../auth/[...nextauth]"

export const payloadSchema_POST = z.object({
  body: makeBidAPIBodySchema,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const session = await getServerSession(req, res, authOptions)
      if (!session || !session.user || !session.user.id) {
        return res.status(401).send("Usuário não autenticado.")
      }

      const payloadParsed = payloadParser(req, payloadSchema_POST)
      if (!payloadParsed.parse.success) return res.status(400).json(payloadParsed.json)

      const { body } = payloadParsed.parse.data
      const { post_id, value } = body

      const createdBid = await createBid(
        {
          post_id,
          user_id: session.user.id,
          value,
        },
        prisma
      )

      return res.status(201).json(createdBid)
    } catch (error) {
      return res.json(error)
    }
  }
}
