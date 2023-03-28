import NextAuth from "next-auth/next"
import { z } from "zod"

import { userLoginSchema, userSchema } from "@/schemas/users"
import { api } from "@/services/api"
import { prisma } from "@/services/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider, { GithubProfile } from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

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
      async authorize(credentials) {
        try {
          const { email, password } = userLoginSchema.parse(credentials)

          const reqValidation = z.object({
            user: userSchema,
            token: z.string(),
          })

          const { token, user } = await api
            .post("/auth/login", { email, password })
            .then((res) => reqValidation.parse(res.data))

          return {
            ...user,
            repos_amount: null,
          }
        } catch (error) {
          throw error
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      async profile(profile: GithubProfile) {
        const repos: string[] = await api.get(profile.repos_url).then((res) => res.data)

        /** Não enviar o ID, deixar o prisma criar o ID */
        return Promise.resolve({
          id: profile.id.toString(),
          image: profile.avatar_url,
          email: profile.email,
          name: profile.name,
          repos_amount: repos.length,
        })
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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
