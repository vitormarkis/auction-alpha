import { prisma } from "@/services/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const session = await getSession({ req })

    if (!session || !session.user) return res.status(400).send("Não existe sessão.")

    const userRole = await prisma.user.findFirst({
      where: {
        email: session.user.email,
      },
      select: {
        role: true,
      },
    })

    if (!userRole) return res.status(500).send("Não foi encontrado role para esse user.")

    const { role } = userRole

    return res.status(200).json(role)
  } else {
    return res.status(404).json({ msg: "Nao existe endpoint" })
  }
}
