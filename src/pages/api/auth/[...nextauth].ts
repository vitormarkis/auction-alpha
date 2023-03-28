import NextAuth from "next-auth/next"
import { z } from "zod"

import { api } from "@/services/api"
import { prisma } from "@/services/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions, Session, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider, { GithubProfile } from "next-auth/providers/github"
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google"

interface DatabaseUser extends User {
  username: string
  password: string
}

const usersDatabase: DatabaseUser[] = [
  {
    id: "iubgyh938489h3",
    username: "vitormarkis",
    password: "vitor123",
    name: "Vitor Markis",
    accessToken: "ms89h2098nier89h389n4fh9rgn389ngr89",
    image:
      "https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/Reuters_Direct_Media/BrazilOnlineReportEntertainmentNews/tagreuters.com2022binary_LYNXMPEIA70TS-FILEDIMAGE.jpg?w=940",
    repos_amount: 237,
    email: "vitormarkis@gmail.com",
  },
  {
    id: "in8h398nr9g3n9",
    username: "kauanbarts",
    password: "kauan123",
    name: "Kauan Barts",
    accessToken: "08hh38jr8n9f3j23r3h9fj39rbg039hj384",
    image:
      "https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/Reuters_Direct_Media/BrazilOnlineReportEntertainmentNews/tagreuters.com2022binary_LYNXMPEIA70TS-FILEDIMAGE.jpg?w=940",
    repos_amount: 129,
    email: "kauanbarts@gmail.com",
  },
]

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: "credentials",
      credentials: {
        username: { label: "Username:", placeholder: "vitormarkis", type: "text" },
        password: { label: "Senha:", placeholder: "Sua senha aqui...", type: "password" },
      },
      name: "Autenticação própria.",
      type: "credentials",
      authorize(credentials) {
        try {
          const { username, password } = z
            .object({ username: z.string(), password: z.string() })
            .parse(credentials)

          const user = usersDatabase.find((user) => user.username === username)
          if (!user) throw new Error("Esse usuário não foi registrado.")

          const passwordMatches = user.password === password
          if (!passwordMatches) throw new Error("Usuário ou senha inválidos.")

          const { password: dbUserPassword, ...sessionUser } = user

          // return Promise.resolve({
          //   ...sessionUser,
          //   accessToken: "AUTHORIZATION HEADER!!",
          // });

          return {
            ...sessionUser,
            accessToken: "newToken",
          }
          /** */
        } catch (error) {
          throw error
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      async profile(profile: GithubProfile, tokens) {
        console.log({
          where: "github profile callback",
          content: {
            profile,
            tokens,
          },
        })

        const repos: string[] = await api.get(profile.repos_url).then((res) => res.data)

        /** Não enviar o ID, deixar o prisma criar o ID */
        return Promise.resolve({
          id: profile.id.toString(),
          image: profile.avatar_url,
          name: profile.name,
          repos_amount: repos.length,
        })
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile: GoogleProfile) {

        profile = {
          /**
           * Esse objeto será salvo no banco de dados.
           * Você pode resgatar ele nas funções callbacks, através do user
           */
        }
        
        return profile
      }
    }),
  ],
  secret: process.env.NEXT_SECRET,
  callbacks: {
    session({ session, user }) {

      const newSession = {
        ...session,
        user: {
          ...session.user,
          repos_amount: user.repos_amount,
        },
      }

      return newSession
    },
  },
  pages: {
    // signIn: "/auth/register",
    newUser: "/testing",
  },
}

export default NextAuth(authOptions)
