import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import slugify from "react-slugify"
import { z } from "zod"
import { ownerId } from "@/CONSTANTS"
import { prisma } from "@/services/prisma"
import { authOptions } from "../auth/[...nextauth]"
import { newPostSchema } from "./schemas"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const session = await getServerSession(req, res, authOptions)
      if (!session || !session.user || !session.user.sub) {
        return res.status(401).send("Usuário não autenticado.")
      }

      const { announcement_date, medias_url, price, text, title } = newPostSchema.parse(req.body)

      const random = () => parseInt(String(Math.random() * 10 ** 10))
      const slug = `${slugify(title)}-${random()}`

      const db_response = await prisma.post.create({
        data: {
          announcement_date,
          price,
          text,
          slug,
          title,
          author_id: session.user.sub,
          post_media: {
            create: medias_url.map(media => ({
              media,
            })),
          },
        },
      })

      return res.status(201).json(db_response)
    } catch (error) {
      return res.json(error)
    }
  }

  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions)
    if (!session || !session.user || !session.user.id) {
      return res.status(401).json({ redirect: { path: "/signin" } })
    }

    const { postId } = z.object({ postId: z.string() }).parse(req.body)

    const userId = session.user.id

    const { author_id } = await prisma.post.findUniqueOrThrow({
      where: {
        id: postId,
      },
    })

    if (userId !== author_id && userId !== ownerId) {
      return res.status(401).json({ message: "Apenas o autor de um post pode excluí-lo." })
    }

    await prisma.post.delete({
      where: {
        id: postId,
      },
    })

    return res.status(202).json({ message: "Post excluido com sucesso." })
  }
}
