import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  pages: { signIn: "/signin" },
  secret: process.env.NEXT_SECRET,
})

export const config = { matcher: [
  "/post/new",
] }
