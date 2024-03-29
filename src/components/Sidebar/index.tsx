import Image from "next/image"
import Link from "next/link"
import { HTMLAttributes } from "react"
import { ProfilePictureIcon } from "@/components/atoms"
import { useHeaders } from "@/factories/headers"
import { createUser } from "@/factories/user"
import { getSession } from "../Header"
import { Icon } from "../Icon"

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default async function ({ className, ...rest }: Props) {
  const { headers, cookie } = useHeaders()

  const session = await getSession(cookie ?? "")
  const user = session?.user ?? null

  const User = createUser(user)
  const { userBids } = await User.getUserBids().fetchUserBids("/api/users/get-bids", headers)
  const { userActiveBids } = User.getUserBids().getUserActiveBids(userBids)

  return (
    <>
      <aside
        className={`flex-col text-base lg:w-60 shrink-0 text-stone-500 whitespace-nowrap ${className}`}
        {...rest}
      >
        <div className="pt-6 lg:pb-6 px-3.5">
          <div className="flex flex-col lg:items-stretch items-center border-b border-stone-300 pb-6 lg:pb-0 lg:border-none">
            {user && (
              <div className="items-center flex leading-none mb-2 gap-2 text-stone-800">
                <ProfilePictureIcon
                  userName={user.name}
                  photoUrl={user.image}
                />
                <p className="hidden lg:block font-semibold text-base">{user.name}</p>
              </div>
            )}
            <div className="flex flex-col gap-2 lg:items-stretch items-center">
              <Link
                href="/post/new"
                className="lg:py-1.5 h-9 w-9 lg:w-auto p-2 rounded-lg bg-black text-white flex justify-center items-center"
              >
                <Icon
                  icon="Feather"
                  width={18}
                  height={18}
                  color="#FFF"
                  className="block lg:hidden"
                />
                <p className="hidden lg:block">Novo post</p>
              </Link>
              <Link
                href="/post/new"
                className="lg:py-1.5 p-2 h-9 w-9 lg:w-auto rounded-lg bg-white text-neutral-500 border border-stone-300 shadow-lg flex justify-center items-center"
              >
                <Icon
                  icon="User"
                  width={18}
                  height={18}
                  className="block lg:hidden"
                />
                <p className="hidden lg:block">Ver perfil</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="py-6 px-3.5">
          <ul className="flex flex-col lg:items-stretch items-center">
            <li className="lg:px-3 lg:py-1.5 grow flex w-9 justify-center lg:justify-start lg:w-auto h-9 rounded-lg bg-blue-600 text-white font-medium ">
              <Link
                href="/"
                className="flex items-center gap-2"
              >
                <Icon
                  icon="Home"
                  width={16}
                  height={16}
                />
                <span className="hidden lg:inline-block">Início</span>
              </Link>
            </li>
            <li className="lg:px-3 lg:py-1.5 grow flex w-9 justify-center lg:justify-start lg:w-auto h-9 rounded-lg text-zinc-800 transition-all duration-200 hover:bg-zinc-200 cursor-pointer">
              <Link
                href="/"
                className="flex items-center gap-2"
              >
                <Icon
                  icon="Payment"
                  width={16}
                  height={16}
                />
                <span className="hidden lg:inline-block">Minhas compras</span>
              </Link>
            </li>
            <li className="lg:px-3 lg:py-1.5 grow flex w-9 justify-center lg:justify-start lg:w-auto h-9 rounded-lg text-zinc-800 transition-all duration-200 hover:bg-zinc-200 cursor-pointer">
              <Link
                href="/"
                className="flex items-center gap-2"
              >
                <Icon
                  icon="Feed"
                  width={16}
                  height={16}
                />
                <span className="hidden lg:inline-block">Meus posts</span>
              </Link>
            </li>
            <li className="lg:px-3 lg:py-1.5 grow flex w-9 justify-center lg:justify-start lg:w-auto h-9 rounded-lg text-zinc-800 transition-all duration-200 hover:bg-zinc-200 cursor-pointer">
              <Link
                href="/"
                className="flex items-center gap-2"
              >
                <Icon
                  icon="Notifications"
                  width={16}
                  height={16}
                />
                <span className="hidden lg:inline-block">Notificações</span>
              </Link>
            </li>
            <li className="lg:px-3 lg:py-1.5 grow flex w-9 justify-center lg:justify-start lg:w-auto h-9 rounded-lg text-zinc-800 transition-all duration-200 hover:bg-zinc-200 cursor-pointer">
              <Link
                href="/"
                className="flex items-center gap-2"
              >
                <Icon
                  icon="AutoGraph"
                  width={16}
                  height={16}
                />
                <span className="hidden lg:inline-block">Lances</span>
                {user && userActiveBids && userActiveBids.length !== 0 ? (
                  <p className="p-[3px] rounded-full text-[10px] text-white min-w-[1rem] h-4 leading-none text-center ml-auto bg-rose-500 font-medium">
                    {userActiveBids.length}
                  </p>
                ) : null}
              </Link>
            </li>
            <li className="lg:px-3 lg:py-1.5 grow flex w-9 justify-center lg:justify-start lg:w-auto h-9 rounded-lg text-zinc-800 transition-all duration-200 hover:bg-zinc-200 cursor-pointer">
              <Link
                href="/"
                className="flex items-center gap-2"
              >
                <Icon
                  icon="BookmarkBorder"
                  width={16}
                  height={16}
                />
                <span className="hidden lg:inline-block">Salvos</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-auto py-6 px-3.5 ">
          <button className="lg:px-3 lg:py-1.5 grow flex justify-center lg:justify-start lg:w-auto h-9 rounded-lg text-zinc-800 transition-all duration-200 hover:bg-zinc-200 cursor-pointer w-full">
            <div className="flex items-center gap-2">
              <Icon
                icon="Settings"
                width={16}
                height={16}
              />
              <span className="hidden lg:inline-block">Configuração</span>
            </div>
          </button>
        </div>
      </aside>
    </>
  )
}
