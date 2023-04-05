import { NextApiRequest, NextApiResponse } from "next"
import slugify from "react-slugify"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { content, two } = req.body

    const random = () => parseInt(String(Math.random() * 10 ** 10))

    return res.json({
      slug: `${slugify(content)}-${random()}`,
      slug1: `${slugify(content)}-${random()}`,
      slug2: `${slugify(two)}-${random()}`,
    })
  }
}
