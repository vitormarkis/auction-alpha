import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { NextApiRequest, NextApiResponse } from "next"
import { sessionUserSchema, userLoginSchema } from "@/schemas/users"
import { prisma } from "@/services/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { email, password } = userLoginSchema.parse(req.body)

      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      })

      if (!user) {
        return res.status(400).json("E-mail não cadastrado.")
      }
      if (!user.password) {
        return res
          .status(400)
          .json("Não é possível fazer login com essa conta, faça login com seu provedor.")
      }

      const passwordMatches = bcrypt.compareSync(password, user.password)
      if (!passwordMatches) {
        return res.status(400).json("E-mail ou senha incorretos.")
      }

      const accessToken = jwt.sign({}, process.env.SERVER_SECRET as string, {
        subject: user.id,
      })

      const sessionUser = sessionUserSchema.parse(user)

      // const { emailVerified, password: desPassword, repos_amount, ...sessionUser } = user

      return res.setHeader("Authorization", `Bearer ${accessToken}`).status(201).json({
        accessToken,
        user: sessionUser,
      })
    } catch (error) {
      return res.status(400).json(error)
    }
  }
}
