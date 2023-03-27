import NextAuth from "next-auth/next"
import { z } from "zod"

import { prisma } from "@/services/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions, Session } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider, { GithubProfile } from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

const usersDatabase = [
  {
    id: "iw7h289h2",
    username: "vitormarkis",
    password: "vitor123",
    name: "Vitor Markis",
    accessToken: "ms89h2098nier89h389n4fh9rgn389ngr89",
  },
  {
    id: "wm8h2n40fn",
    username: "kauanbarts",
    password: "kauan123",
    name: "Kauan Barts",
    accessToken: "08hh38jr8n9f3j23r3h9fj39rbg039hj384",
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
      profile(profile: GithubProfile, tokens) {
        console.log({
          where: "github profile callback",
          content: {
            profile,
            tokens,
          },
        })

        // const repos: string[] = await api.get(profile.repos_url).then((res) => res.data)

        const sessionUser = {
          id: profile.id.toString(),
          image: profile.avatar_url,
          // repos_amount: repos.length,
        }

        console.log({ image: profile.avatar_url })

        return { id: "hf8he8", name: profile.avatar_url, image: profile.avatar_url, repos_amount: 127, }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXT_SECRET,
  callbacks: {
    session({ session, token, user }) {
      console.log("user?", user)

      if (token?.accessToken) {
        session = {
          ...session,
          accessToken: token.accessToken,
        }
      }

      const newSession = {
        ...session,
        user: {
          ...session.user,
          ...user,
        },
        // otherToken: "heh83h489",
      } as Session

      return newSession
    },
  },
  // pages: {
  //   signIn: "/auth/login",
  //   newUser: "/auth/register",
  // },
}

export default NextAuth(authOptions)
