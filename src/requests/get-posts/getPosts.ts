import { prisma } from "@/services/prisma"

export async function getPosts() {
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

  return { posts }
}

export type PostSession = Awaited<ReturnType<typeof getPosts>>["posts"][number]
