import { Session } from "next-auth"
import Image from "next/image"
import Link from "next/link"
import AuthButton from "../AuthButton"
import { headers } from "next/headers"
import LogoutButton from "../LogoutButton"
import { api_endpoint } from "@/CONSTANTS"
import { Icon } from "../Icon"
import { Josefin_Sans } from "next/font/google"
import SidebarMenu from "../SidebarMenu"
import { userBidsSchema } from "@/schemas/users"
import { z } from "zod"
import { getUserActiveBids } from "../Sidebar/getActiveUserBids"

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
  const cookie = headers().get("cookie")
  const customHeaders = new Headers()
  if (cookie) customHeaders.append("cookie", cookie)

  const session = await getSession(headers().get("cookie") ?? "")

  const { user } = session ?? {}

  const [parseUserBids] = await Promise.all([
    fetch(`${api_endpoint}/api/users/get-bids`, { cache: "no-store", headers: customHeaders })
      .then(res => res.json())
      .then(data => z.array(userBidsSchema).safeParseAsync(data)),
  ])

  const userBids = parseUserBids.success ? parseUserBids.data : null
  const userActiveBids = userBids ? getUserActiveBids(userBids) : null

  return (
    <div className="sticky top-0 h-[3.25rem] justify-center bg-white shadow-lg shadow-black/10 flex flex-col">
      <header className="flex items-center max-w-[1280px] w-full justify-between px-4 py-2 mx-auto">
        <div className="hidden sm:block">
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
        <div className="sm:hidden flex"></div>
        <div className="sm:hidden flex">
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
        <div className="leading-none flex sm:hidden">
          <SidebarMenu
            user={user}
            userBids={userActiveBids}
          />
        </div>
        <div className="hidden sm:block">
          <div className="flex gap-2 items-center">
            <div>
              <div className="leading-none rounded-lg bg-neutral-100 border border-neutral-400 w-full max-w-xs flex items-center gap-2 px-2 py-1">
                <Icon
                  icon="Search"
                  width={24}
                  height={24}
                  className="text-stone-800"
                />
                <input
                  type="text"
                  placeholder="Faça uma pesquisa..."
                  className="w-full bg-transparent focus:outline-none"
                />
              </div>
            </div>
            <div className="flex gap-2 [&>button]:transition-all [&>button]:duration-200">
              <button className="p-1.5 leading-none rounded-lg hover:bg-neutral-200">
                <Icon
                  icon="NotificationsNone"
                  width={24}
                  height={24}
                  className="text-stone-800"
                />
              </button>
              {/* <button className="p-1.5 leading-none rounded-lg hover:bg-neutral-200">
                <Icon
                  icon="MoreVert"
                  width={24}
                  height={24}
                  className="text-stone-800"
                />
              </button> */}
              {session && (
                <div className="">
                  <Image
                    src={user?.image ?? ""}
                    alt={`Imagem de perfil de ${user?.name ?? "convidado"}`}
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                </div>
              )}
            </div>

            <div>
              {session ? (
                <LogoutButton />
              ) : (
                <AuthButton
                  action="sign_in"
                  background="black"
                  textColor="white"
                  border="black"
                  weight="normal"
                />
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
