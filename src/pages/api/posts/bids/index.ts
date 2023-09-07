import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { bidSchema } from "@/schemas/posts"
import { prisma } from "@/services/prisma"
import { authOptions } from "../../auth/[...nextauth]"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const session = await getServerSession(req, res, authOptions)
      if (!session || !session.user || !session.user.id)
        return res.status(401).send("Usuário não autenticado.")

      const { post_id, value } = bidSchema.parse(req.body)

      await prisma.bids.create({
        data: {
          post_id,
          value,
          user_id: session.user.id,
        },
      })

      return res.json({
        msg: "Lance criado com sucesso",
      })
    } catch (error) {
      return res.json(error)
    }
  }
}
