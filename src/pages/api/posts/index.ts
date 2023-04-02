import { prisma } from "@/services/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      created_at: true,
      title: true,
      text: true,
      price: true,
      author_id: true,
      author: {
        select: {
          name: true,
          image: true,
          role: true,
        },
      },
      post_media: {
        select: {
          id: true,
          media: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  })

  return res.json(posts)
}
