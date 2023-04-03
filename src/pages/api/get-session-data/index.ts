import { prisma } from "@/services/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await prisma.user.deleteMany()
    return res.send("Deletado.")
  } catch (error) {
    return res.send(error)
  }
}
