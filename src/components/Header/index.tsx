import { Session } from "next-auth"
import { useSession } from "next-auth/react"
import { Josefin_Sans } from "next/font/google"
import Link from "next/link"
import React from "react"
import { cn } from "@/lib/utils"
import { ProfileAvatarPicture } from "@/components/atoms/avatar-picture-profile/ProfileAvatarPicture"
import { api_endpoint } from "@/CONSTANTS"
import AuthButton from "../AuthButton"
import { Icon } from "../Icon"
import LogoutButton from "../LogoutButton"
import SidebarMenu from "../SidebarMenu"

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

export type HeaderProps = React.ComponentPropsWithoutRef<"div"> & {}

export const Header = React.forwardRef<React.ElementRef<"div">, HeaderProps>(
  function HeaderComponent({ ...props }, ref) {
    const { data, status } = useSession()
    const { user } = data ?? {}

    return (
      <header className="sticky top-0 h-[3.25rem] justify-center bg-white shadow-lg shadow-black/10 flex flex-col">
        <div
          {...props}
          className={cn(
            "flex items-center max-w-[1280px] w-full justify-between px-4 py-2 mx-auto",
            props.className
          )}
          ref={ref}
        >
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
                <h1 className={`font-bold translate-y-[1px] text-xl ${josefins_sans.className}`}>
                  Auction.
                </h1>
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
                <h1 className={`font-bold translate-y-[1px] text-xl ${josefins_sans.className}`}>
                  Auction.
                </h1>
              </Link>
            </div>
          </div>
          <div className="leading-none flex sm:hidden">
            <SidebarMenu user={user} />
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
                {status === "authenticated" && (
                  <ProfileAvatarPicture
                    size="small"
                    src={user?.image}
                  />
                )}
              </div>

              <div>
                {status === "loading" ? (
                  <div className="h-9 w-[5.8rem] rounded-md bg-gray-400 animate-pulse" />
                ) : status === "authenticated" ? (
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
        </div>
      </header>
    )
  }
)

Header.displayName = "Header"
