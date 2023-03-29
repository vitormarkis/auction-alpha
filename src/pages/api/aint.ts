import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const session = await getSession({ req })

    if (!session) return res.status(400).send("Não existe sessão.")

    return res.status(200).json(session)
  } else {
    return res.status(404).json({ msg: "Nao existe endpoint" })
  }
}
