import { NextApiRequest, NextApiResponse } from "next"
import { getPost } from "@/requests/get-post/getPost"
import { prisma } from "@/services/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const { slug } = req.query as { slug: string }
      const { post } = await getPost(slug, prisma)
      return res.status(200).json(post)
    } catch (error) {
      return res.status(507).json({
        message: "Something went wrong, try again later.",
        error,
      })
    }
  }
}
