import { userRegisterSchema } from "@/schemas/users"
import { prisma } from "@/services/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { getSession } from "next-auth/react"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { email, name, password } = userRegisterSchema.parse(req.body)

      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      })

      if (user) {
        return res.status(404).json({ msg: "Email já cadastrado." })
      }

      const salt = bcrypt.genSaltSync(10)
      const hashedPassword = bcrypt.hashSync(password, salt)

      const registeredUser = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
        select: {
          id: true,
          email: true,
          image: true,
          name: true,
        },
      })

      const accessToken = jwt.sign({}, process.env.SERVER_SECRET as string, {
        subject: registeredUser.id,
      })

      return res.setHeader("Authorization", accessToken).status(201).json({
        accessToken,
        user: registeredUser,
      })
    } catch (error) {
      return res.status(400).json(error)
    }
  } else if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions)

    if (!session || !session.user?.sub) return res.status(400).send("Sem sessão.")

    const sub = session.user.sub

    // if (!req.headers.authorization) return res.status(401).json({ message: "Usuário não autorizado." })
    // const [type, token] = req.headers.authorization.split(" ")

    // if (type.toLowerCase() !== "bearer") return res.status(401).json({ message: "Tipo de token inválido." })

    // const { sub } = jwt.verify(token, process.env.SERVER_SECRET as string)

    const user = await prisma.user.findFirst({
      where: {
        id: String(sub),
      },
    })

    return res.status(200).json([user])
  } else {
    return res.status(404).json({ msg: "Nao existe endpoint" })
  }
}
