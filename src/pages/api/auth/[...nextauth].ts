import { sessionUserSchema, userLoginSchema } from "@/schemas/users"
import { api } from "@/services/api"
import { prisma } from "@/services/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider, { GithubProfile } from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { z } from "zod"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {},
      type: "credentials",
      async authorize(credentials, req) {
        const reqValidation = z.object({
          user: sessionUserSchema,
          accessToken: z.string(),
        })

        try {
          const { email, password } = userLoginSchema.parse(credentials)

          const { user, accessToken } = await api
            .post("/login", { email, password })
            .then(res => reqValidation.parse(res.data))

          return {
            ...user,
            accessToken,
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
        const repos: string[] = await api.get(profile.repos_url).then(res => res.data)

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
    jwt({ token, user }) {
      return { ...user, ...token }
    },

    session({ session, token }) {
      session.user = token

      return session
    },
  },
  pages: {
    newUser: "/",
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
}

export default NextAuth(authOptions)
