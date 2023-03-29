import { userRegisterSchema } from "@/schemas/users"
import { prisma } from "@/services/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { NextApiRequest, NextApiResponse } from "next"

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
    return res.status(200).json([{ id: "jerheg8", name: "gast" }])
  } else {
    return res.status(404).json({ msg: "Nao existe endpoint" })
  }
}
