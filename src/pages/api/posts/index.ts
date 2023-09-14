import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { z } from "zod"
import { ownerId } from "@/CONSTANTS"
import { createPost } from "@/actions/create-post/database-operation"
import { createPostAPIBodySchema } from "@/actions/create-post/schema-body-api"
import { getPosts } from "@/requests/get-posts/getPosts"
import { prisma } from "@/services/prisma"
import { createPostSlug } from "@/utils/create-post-slug/createPostSlug"
import { payloadParser } from "@/utils/payloadParser"
import { authOptions } from "../auth/[...nextauth]"

const payloadSchema_POST = z.object({
  body: createPostAPIBodySchema,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { posts } = await getPosts(prisma)

    return res.json(posts)
  }

  if (req.method === "POST") {
    try {
      const session = await getServerSession(req, res, authOptions)
      if (!session || !session.user || !session.user.sub) {
        return res.status(401).send("Usuário não autenticado.")
      }

      const payloadParsed = payloadParser(req, payloadSchema_POST)
      if (!payloadParsed.parse.success) return res.status(400).json(payloadParsed.json)

      const { body } = payloadParsed.parse.data
      const { announcement_date, medias_url, price, text, title } = body
      const { slug } = createPostSlug(title)

      const createdPost = createPost(
        {
          announcement_date,
          medias_url,
          price,
          text,
          title,
          slug,
          author_id: session.user.sub,
        },
        prisma
      )

      return res.status(201).json(createdPost)
    } catch (error) {
      return res.status(500).json(error)
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
