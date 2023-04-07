import { Inter } from "next/font/google"
import { Session } from "next-auth"
import Image from "next/image"
import Link from "next/link"
import AuthButton from "../AuthButton"
import { headers } from "next/headers"
import { Logout } from "@styled-icons/material/Logout"
import LogoutButton from "../LogoutButton"
import { api_url } from "@/CONSTANTS"

const inter = Inter({
  subsets: ["latin"],
})

export async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(`${api_url}/api/auth/session`, {
    headers: {
      cookie,
    },
  })
  const session = await response.json()
  return Object.keys(session).length > 0 ? session : null
}

export default async function () {
  const session = await getSession(headers().get("cookie") ?? "")

  // const session = true

  const { user } = session ?? {}

  // const user = {
  //   id: "clg03hdf00000vec83vahr4q4",
  //   name: "Vitor Markis",
  //   email: "vitormarkis2369@gmail.com",
  //   emailVerified: null,
  //   password: null,
  //   image: "https://avatars.githubusercontent.com/u/121525239?v=4",
  //   repos_amount: 30,
  //   role: "USER",
  //   picture: "https://avatars.githubusercontent.com/u/121525239?v=4",
  //   sub: "clg03hdf00000vec83vahr4q4",
  //   iat: 1680490398,
  //   exp: 1683082398,
  //   jti: "32cf6be2-1ec4-4b77-82c6-2a6dc2ff3d3d",
  // }

  return (
    <div
      className={`flex sticky top-0 justify-center border-b border-b-neutral-400 bg-white ${inter.className}`}
    >
      <header className="flex items-center max-w-[1280px] w-full justify-between px-4 py-2">
        <div>
          <div>
            <Link href="/">
              <h1 className="font-bold text-xl">Auction</h1>
            </Link>
          </div>
        </div>
        <div>
          <div className="flex gap-2 items-center font-semibold">
            <p>{user?.name}</p>
            {session && (
              <div>
                <Image
                  src={user?.image ?? ""}
                  alt={`Imagem de perfil de ${user?.name}`}
                  width={36}
                  height={36}
                  className="rounded-full"
                />
              </div>
            )}
            <div>
              {session ? (
                <>
                  {/* <AuthButton action="sign_out" /> */}
                  <LogoutButton />
                </>
              ) : (
                <AuthButton action="sign_in" />
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
