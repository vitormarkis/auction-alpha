import { Inter } from "next/font/google"
import { Session } from "next-auth"
import Image from "next/image"
import Link from "next/link"
import AuthButton from "../AuthButton"
import { headers } from "next/headers"
import LogoutButton from "../LogoutButton"
import { api_endpoint } from "@/CONSTANTS"
import { Icon } from "../Icon"
import { Josefin_Sans } from "next/font/google"

const josefins_sans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
})

export async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(`${api_endpoint}/api/auth/session`, {
    headers: {
      cookie,
    },
  })
  const session = await response.json()
  return Object.keys(session).length > 0 ? session : null
}

export default async function () {
  const session = await getSession(headers().get("cookie") ?? "")

  const { user } = session ?? {}

  return (
    <div className="flex sticky top-0 justify-center bg-white shadow-lg shadow-black/10">
      <header className="flex items-center max-w-[1280px] w-full justify-between px-4 py-2">
        <div>
          <div className="leading-none">
            <Link
              href="/"
              className="flex gap-[3px] items-center"
            >
              <Icon
                icon="Grain"
                width={28}
                height={28}
                className="text-cyan-500"
              />
              <h1 className={`font-bold translate-y-[1px] text-xl ${josefins_sans.className}`}>Auction.</h1>
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
