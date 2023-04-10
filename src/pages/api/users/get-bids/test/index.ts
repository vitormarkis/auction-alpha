import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const session = await getServerSession(req, res, authOptions)
      // if (!session || !session.user || !session.user.id) {
      //   return res.json({ redirect: { path: "/signin" } })
      // }
      return res.status(200).json(session)
    } catch (error) {
      return res.status(400).json(error)
    }
  }
}
