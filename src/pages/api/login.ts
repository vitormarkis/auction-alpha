import { userLoginSchema } from "@/schemas/users"
import { prisma } from "@/services/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { email, password } = userLoginSchema.parse(req.body)

      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      })

      if (!user) throw new Error("E-mail não cadastrado.")
      if (!user.password)
        throw new Error("Não é possível fazer login com essa conta, faça login com seu provedor.")

      const passwordMatches = bcrypt.compareSync(user.password, password)
      if (!passwordMatches) throw new Error("E-mail ou senha incorretos.")

      const accessToken = jwt.sign({}, process.env.SERVER_SECRET as string, {
        subject: user.id,
      })

      const { emailVerified, password: desPassword, repos_amount, ...sessionUser } = user

      return res.setHeader("Authorization", accessToken).status(201).json({
        accessToken,
        user: sessionUser,
      })
    } catch (error) {
      return res.status(400).json(error)
    }
  }
}
