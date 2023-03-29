import { NextApiRequest, NextApiResponse } from "next"
import { newPostSchema } from "./schemas"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
