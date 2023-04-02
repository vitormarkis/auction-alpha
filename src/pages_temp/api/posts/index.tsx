import { NextApiRequest, NextApiResponse } from "next"
import { newPostSchema } from "./schemas"
import { prisma } from "@/services/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
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
      }
    })

    return res.json(posts)
  }
  
  if (req.method === "POST") {
    try {
      const { medias_url, price, text, title } = newPostSchema.parse(req.body)

      console.log(req)

      return res.json(req.headers)
    } catch (error) {
      return res.json(error)
    }
  }
}
