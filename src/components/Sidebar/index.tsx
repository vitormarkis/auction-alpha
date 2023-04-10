import Link from "next/link"
import { headers } from "next/headers"
import { getSession } from "../Header"
import Image from "next/image"
import { Icon } from "../Icon"
import { userBidsSchema } from "@/schemas/users"
import { z } from "zod"
import { getActiveUserBids } from "./getActiveUserBids"

export default async function () {
  const cookie = headers().get("cookie")
  const session = await getSession(cookie ?? "")

  const { user } = session ?? {}

  const [parseUserBids, sessionInfo] = await Promise.all([
    fetch("http://localhost:3000/api/users/get-bids", { cache: "no-store", headers: { cookie } })
      .then(res => res.json())
      .then(data => z.array(userBidsSchema).safeParseAsync(data)),
    fetch("http://localhost:3000/api/users/get-bids/test", {
      headers: {
        cookie,
      },
    }).then(res => res.json()),
  ])

  const userBids = parseUserBids.success ? parseUserBids.data : null

  const activeUserBids = userBids ? getActiveUserBids(userBids) : null
  // const activeUserBids = ["q", "dfk"]

  return (
    <aside className="flex flex-col text-base w-60 shrink-0 text-stone-500 whitespace-nowrap">
      <div className="py-6 px-3.5 ">
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
            <Link
              href="/post/new"
              className="py-1.5 rounded-lg px-5 justify-center bg-black text-white flex items-center"
            >
              <p>Novo post</p>
            </Link>
            <Link
              href="/post/new"
              className="py-1.5 rounded-lg px-5 justify-center bg-neutral-200 text-stone-800 flex items-center"
            >
              <p>Ver perfil</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="py-6 px-3.5">
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
          <li className="px-3 py-1 grow rounded-lg bg-zinc-100 text-zinc-800 font-medium flex items-center gap-2">
            <Link
              href="/"
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
              <p className="p-1 rounded-full text-sm text-white w-6 h-6 leading-4 text-center ml-auto bg-rose-500 font-medium">
                {activeUserBids && activeUserBids.length}
              </p>
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
      <div className="mt-auto py-6 px-3.5 ">
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
