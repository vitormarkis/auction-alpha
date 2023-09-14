import { createUploadthing, type FileRouter } from "uploadthing/next-legacy"

const f = createUploadthing()

// const auth = (req: NextApiRequest, res: NextApiResponse) => ({ id: "fakeId" })

export const ourFileRouter = {
  newPostMedias: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // .middleware(async ({ req, res }) => {
    //   const user = await auth(req, res)
    //   if (!user) throw new Error("Unauthorized")
    //   return { userId: user.id }
    // })
    .onUploadComplete(async ({ metadata, file }) => {
      // console.log("Upload complete for userId:", metadata.userId)
      // console.log("file url", file.url)
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
