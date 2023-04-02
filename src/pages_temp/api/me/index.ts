import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      return res.json({ vitorToken: Math.random().toString(35).substring(2, 9) })
    } catch (error) {
      return res.json(error)
    }
  }
}
