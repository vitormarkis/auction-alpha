import { prisma } from "@/services/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const { post_slug } = z.object({ post_slug: z.string() }).parse(req.query)

      const posts = await prisma.post.findUniqueOrThrow({
        select: {
          id: true,
          created_at: true,
          title: true,
          text: true,
          price: true,
          slug: true,
          announcement_date: true,
          _count: {
            select: {
              bids: true,
            },
          },
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
          bids: {
            select: {
              id: true,
              created_at: true,
              value: true,
              post_id: true,
              user: {
                select: {
                  id: true,
                  image: true,
                  name: true,
                },
              },
            },
          },
        },
        where: {
          slug: post_slug,
        },
      })

      return res.json(posts)
    } catch (error) {
      return res.status(500).json(error)
    }
  }
}
