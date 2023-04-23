import Link from "next/link"
import Image from "next/image"
import { Icon } from "../Icon"

import { User } from "@/types/interfaces"
import { IUserBid } from "@/schemas/users"
import { signOut } from "next-auth/react"
import AuthButton from "../AuthButton"

interface Props {
  user: User | undefined
  userBids: IUserBid[] | null
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function SidebarMenuContent({ user, userBids, setIsMenuOpen }: Props) {

  return (
    <aside className="flex flex-col grow text-base shrink-0 text-stone-500 whitespace-nowrap">
      <div className="py-6 px-3.5 ">
        <div className="flex flex-col">
          {user ? (
            <div className="items-center flex leading-none mb-2 gap-2 text-stone-800">
              <Image
                src={user.image ?? ""}
                width={32}
                height={32}
                className="rounded-full shrink-0"
                alt={`Foto de perfil de ${user.name}`}
              />
              <p className="font-semibold text-base">{user.name}</p>
            </div>
          ) : null}
          <div className="flex flex-col gap-2">
            <Link
              href="/post/new"
              onClick={() => setIsMenuOpen(false)}
              className="py-1.5 rounded-lg px-5 bg-black text-white flex justify-center items-center"
            >
              <p>Novo post</p>
            </Link>
            <Link
              href="/post/new"
              onClick={() => setIsMenuOpen(false)}
              className="py-1.5 rounded-lg bg-white text-neutral-500 border border-stone-300 shadow-lg flex justify-center items-center"
            >
              <p>Ver perfil</p>
            </Link>
            {user ? (
              <AuthButton
              action="sign_out"
              background="white"
              textColor="red"
              border="red"
              weight="medium"
              shadow
            />
            ) : (
              <AuthButton
                action="sign_in"
                background="white"
                textColor="black"
                border="black"
                weight="medium"
                shadow
              />
            )}
          </div>
        </div>
      </div>
      <div className="py-6 px-3.5">
        <ul className="flex flex-col">
          <li className="px-3 py-1.5 grow rounded-lg bg-blue-600 text-white font-medium ">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <Icon
                icon="Home"
                width={16}
                height={16}
              />
              <span>Início</span>
            </Link>
          </li>
          <li className="px-3 py-1.5 grow rounded-lg text-zinc-800 transition-all duration-200 hover:bg-zinc-200 cursor-pointer">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <Icon
                icon="Payment"
                width={16}
                height={16}
              />
              <span>Minhas compras</span>
            </Link>
          </li>
          <li className="px-3 py-1.5 grow rounded-lg text-zinc-800 transition-all duration-200 hover:bg-zinc-200 cursor-pointer">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <Icon
                icon="Feed"
                width={16}
                height={16}
              />
              <span>Meus posts</span>
            </Link>
          </li>
          <li className="px-3 py-1.5 grow rounded-lg text-zinc-800 transition-all duration-200 hover:bg-zinc-200 cursor-pointer">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <Icon
                icon="Notifications"
                width={16}
                height={16}
              />
              <span>Notificações</span>
            </Link>
          </li>
          <li className="px-3 py-1.5 grow rounded-lg text-zinc-800 transition-all duration-200 hover:bg-zinc-200 cursor-pointer">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <Icon
                icon="AutoGraph"
                width={16}
                height={16}
              />
              <span>Lances</span>
              {user && userBids && userBids.length !== 0 ? (
                <p className="p-[3px] rounded-full text-[10px] text-white min-w-[1rem] h-4 leading-none text-center ml-auto bg-rose-500 font-medium">
                  {userBids.length}
                </p>
              ) : null}
            </Link>
          </li>
          <li className="px-3 py-1.5 grow rounded-lg text-zinc-800 transition-all duration-200 hover:bg-zinc-200 cursor-pointer">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <Icon
                icon="BookmarkBorder"
                width={16}
                height={16}
              />
              <span>Salvos</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="mt-auto py-6 px-3.5 ">
        <button className="px-3 py-1.5 grow rounded-lg text-zinc-800 transition-all duration-200 hover:bg-zinc-200 cursor-pointer w-full">
          <div className="flex items-center gap-2">
            <Icon
              icon="Settings"
              width={16}
              height={16}
            />
            <span>Configuração</span>
          </div>
        </button>
      </div>
    </aside>
  )
}
