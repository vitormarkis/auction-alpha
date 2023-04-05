import { prisma } from "@/services/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import { newPostSchema } from "./schemas"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import slugify from "react-slugify"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const posts = await prisma.post.findMany({
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
            post_id: true,
            id: true,
            created_at: true,
            value: true,
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
      orderBy: {
        created_at: "desc",
      },
    })

    return res.json(posts)
  }

  if (req.method === "POST") {
    try {
      const session = await getServerSession(req, res, authOptions)
      if (!session || !session.user || !session.user.sub) return res.status(401).send("Usuário não autenticado.")
      const { announcement_date, medias_url, price, text, title } = newPostSchema.parse(req.body)

      const random = () => parseInt(String(Math.random() * 10 ** 10))

      const uniqueSlug = `${slugify(title)}-${random()}`

      await prisma.post.create({
        data: {
          announcement_date,
          price,
          text,
          slug: uniqueSlug,
          title,
          author_id: session.user.sub,
          // author_id: "clg2w56uw0000venkgevzab52",
          post_media: {
            create: medias_url.map(media => ({
              media,
            })),
          },
        },
      })

      return res.json({
        msg: "Post criado com sucesso",
      })
    } catch (error) {
      return res.json(error)
    }
  }
}