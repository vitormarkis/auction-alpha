import NextAuth from "next-auth/next"

import { sessionUserSchema } from "@/schemas/users"
import { api } from "@/services/api"
import { prisma } from "@/services/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
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
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@mail.com" },
        password: { label: "Password", type: "password" },
      },
      type: "credentials",
      // The name to display on the sign in form (e.g. 'Sign in with...')
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      async authorize(credentials, req) {
        const reqValidation = z.object({
          user: sessionUserSchema,
          token: z.string(),
        })

        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        // const user = await api.post("/login", credentials).then(res => res.data)

        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        })
        const user = await res.json()

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }

        // if (user) {
        //   return user
        // }
        // Return null if user data could not be retrieved
        return null

        // try {
        //   const { email, password } = userLoginSchema.parse(credentials)

        //   const { csrfToken } = await api.get("/auth/csrf").then(res => res.data)

        //   console.log("csrfToken?", csrfToken)

        //   // const { token, user } = await api
        //   //   .post(
        //   //     "/login",
        //   //     { email, password },
        //   //     {
        //   //       headers: {
        //   //         "X-CSRF-TOKEN": csrfToken,
        //   //       },
        //   //     }
        //   //   )
        //   //   .then(res => reqValidation.parse(res.data))

        //   const response = await fetch("http://localhost:3000/api/login", {
        //     body: JSON.stringify({
        //       email,
        //       password,
        //     }),
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //       "X-CSRF-Token": csrfToken,
        //     },
        //   }).then(res => res.json())

        //   console.log("response", response)

        //   return null

        //   return {
        //     ...user,
        //     repos_amount: null,
        //   }
        // } catch (error) {
        //   throw error
        // }
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
      return { ...token, ...user }
    },

    session({ session, token }) {
      session.user = token

      return session
    },
  },
  pages: {
    newUser: "/testing",
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
}

export default NextAuth(authOptions)
