import { PrismaClient } from "@prisma/client"
import { CreatePostAPIBody } from "@/actions/create-post/schema-body-api"

export type CreatePostPayload = CreatePostAPIBody & {
  slug: string
  author_id: string
  medias_url: string[]
}

export async function createPost(payload: CreatePostPayload, prisma: PrismaClient) {
  const { price, text, slug, title, author_id, medias_url } = payload

  const createdPost = await prisma.post.create({
    data: {
      announcement_date: payload.announcement_date,
      price,
      text,
      slug,
      title,
      author_id,
      post_media: {
        create: medias_url.map(media => ({
          media,
        })),
      },
    },
  })

  return createdPost
}

export type CreatedPost = Awaited<ReturnType<typeof createPost>>
