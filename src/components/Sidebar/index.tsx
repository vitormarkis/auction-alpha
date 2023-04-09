import Link from "next/link"
import { headers } from "next/headers"
import { getSession } from "../Header"
import Image from "next/image"
import { Icon } from "../Icon"

export default async function () {
  const session = await getSession(headers().get("cookie") ?? "")

  const { user } = session ?? {}

  return (
    <aside className="flex flex-col border-r border-neutral-400 text-sm w-[200px] shrink-0 text-stone-500 whitespace-nowrap">
      <div className="pb-3 border-b p-3 border-neutral-400">
        <div className="flex flex-col">
          {user && (
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
          )}
          <div className="flex flex-col gap-2">
            <button className="py-1.5 rounded-lg px-5 justify-center bg-black text-white flex items-center">
              <p>Ver perfil</p>
            </button>
            <button className="py-1.5 rounded-lg px-5 justify-center bg-neutral-200 text-stone-500 flex items-center">
              <p>Mais opções</p>
            </button>
          </div>
        </div>
      </div>
      <div className="p-3">
        <ul className="flex flex-col gap-2">
          <li className="px-3 py-1 grow rounded-lg bg-blue-600 text-white font-medium flex items-center gap-2">
            <Link
              href="/"
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
          <li className="px-3 py-1 grow rounded-lg bg-zinc-100 text-zinc-800 font-medium">
            <Link
              href="/"
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
          <li className="px-3 py-1 grow rounded-lg bg-zinc-100 text-zinc-800 font-medium">
            <Link
              href="/"
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
          <li className="px-3 py-1 grow rounded-lg bg-zinc-100 text-zinc-800 font-medium">
            <Link
              href="/"
              className="flex items-center gap-2"
            >
              <Icon
                icon="AutoGraph"
                width={16}
                height={16}
              />
              <span>Lances</span>
            </Link>
          </li>
          <li className="px-3 py-1 grow rounded-lg bg-zinc-100 text-zinc-800 font-medium">
            <Link
              href="/"
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
      <div className="mt-auto p-3 border-t border-neutral-400">
        <button className=" flex items-center gap-2 px-3 py-1 grow rounded-lg bg-zinc-100 text-zinc-800 font-medium">
          <Icon
            icon="Settings"
            width={16}
            height={16}
          />
          <span>Configuração</span>
        </button>
      </div>
    </aside>
  )
}
