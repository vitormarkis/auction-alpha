import { PrismaClient } from "@prisma/client"

export async function getPost(slug: string, prisma: PrismaClient) {
  const post = await prisma.post.findUniqueOrThrow({
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
      slug,
    },
  })

  return { post }
}

export type PostPage = Awaited<ReturnType<typeof getPost>>["post"]
