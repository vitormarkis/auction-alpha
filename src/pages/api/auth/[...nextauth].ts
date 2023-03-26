import NextAuth from "next-auth/next";
import { z } from "zod";

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
];

export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          accessToken: user.accessToken,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      session = {
        ...session,
        accessToken: token.accessToken,
      };

      return session;
    },
  },
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
            .parse(credentials);

          const user = usersDatabase.find((user) => user.username === username);
          if (!user) throw new Error("Esse usuário não foi registrado.");

          const passwordMatches = user.password === password;
          if (!passwordMatches) throw new Error("Usuário ou senha inválidos.");

          const { password: dbUserPassword, ...sessionUser } = user;

          // return Promise.resolve({
          //   ...sessionUser,
          //   accessToken: "AUTHORIZATION HEADER!!",
          // });

          return {
            ...sessionUser,
            accessToken: "newToken",
          };
          /** */
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXT_SECRET,
  // pages: {
  //   signIn: "/auth/login",
  //   newUser: "/auth/register",
  // },
};

export default NextAuth(authOptions);
