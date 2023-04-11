import { postFeedSchema } from "@/schemas/posts"
import { Carousell } from "./Carousell"
import moment from "moment"
import "moment/locale/pt-br"
import { headers } from "next/headers"
import { getSession } from "@/components/Header"
import clsx from "clsx"
import { MakeBidButton } from "./MakeBidButton"
import { api_endpoint } from "@/CONSTANTS"
import { Icon } from "@/components/Icon"
import { currency } from "@/utils/currencyConverter"

export default async function PostPage({ params }: { params: { slug: string } }) {
  const session = await getSession(headers().get("cookie") ?? "")
  const { user } = session ?? {}

  const { slug } = params
  const post = await fetch(`${api_endpoint}/api/posts/single?post_slug=${slug}`, {
    cache: "no-store",
    next: {
      revalidate: 10,
    },
  }).then(async res => postFeedSchema.parse(await res.json()))

  const isAuthor = post.author_id === user?.id
  const hasBids = post._count.bids > 0

  const installment_price = String((post.price / 12).toFixed(2)).replace(".", ",")

  const orderedUserBids = post.bids.sort((a, b) => (a.value > b.value ? -1 : a.value < b.value ? 1 : 0))

  return (
    <div className=" bg-white grow">
      <div className="flex min-h-full h-[calc(100vh_-_52px)]">
        <div className="p-6 flex flex-col min-w-[420px] grow overflow-y-scroll scroll-thin">
          <Carousell
            postMedias={post.post_media}
            className="mb-3"
          />
          <div className="p-6">
            <h3 className="font-semibold text-neutral-700">Descrição</h3>
            <p className="text-neutral-600">{post.text}</p>
          </div>
        </div>
        <div className="basis-[400px] p-6 whitespace-nowrap grow shrink-0">
          <h1 className="text-2xl font-semibold mb-0.5 whitespace-normal">{post.title}</h1>
          <p className="text-neutral-400 text-xs mb-3">
            <span>Publicado </span>
            <span className="font-semibold">{moment(post.created_at).locale("pt-br").fromNow()}</span>
            {" - encerra em "}
            <span className="font-semibold inline-block px-1.5 py-0.5 rounded-lg bg-indigo-100 text-indigo-500">
              {moment(post.announcement_date).locale("pt-br").toNow(true)}
            </span>
          </p>
          <div>
            <div className="mb-3 flex">
              <p className="text-3xl mr-4 text-black inline-block">{currency(post.price)}</p>
              <div className="flex items-end">
                <p className="text-neutral-500 text-sm">ou 12x de R${installment_price}</p>
              </div>
            </div>
          </div>
          {isAuthor ? null : (
            <div className="flex flex-col gap-3 mb-3">
              <MakeBidButton
                postId={post.id}
                userId={user?.id}
              />
              <button className="bg-neutral-100 py-3 text-neutral-500 rounded-lg focus:outline-1 focus:outline-offset-1 focus:outline-blue-100 focus:outline-double">
                Fazer uma pergunta
              </button>
            </div>
          )}
          <div className="mb-3">
            <p
              className={clsx("py-1 px-1.5 text-sm rounded-lg", {
                "bg-red-100 text-red-500": (!isAuthor && hasBids) || (isAuthor && !hasBids),
                "bg-indigo-100 text-indigo-500": (isAuthor && hasBids) || (!isAuthor && !hasBids),
              })}
            >
              {hasBids
                ? `${post._count.bids} lance${post._count.bids > 1 ? "s" : ""} no momento`
                : "Sem lances no momento"}
            </p>
          </div>
          {isAuthor && hasBids ? (
            <div className="p-2 rounded-lg bg-white border border-stone-300 shadow-lg flex flex-col gap-2">
              {orderedUserBids.map((bid, idx) => (
                <div
                  key={bid.id}
                  className="flex items-center"
                >
                  <img
                    src={bid.user.image}
                    alt={`Foto de perfil de ${bid.user.name}`}
                    className="w-8 h-8 rounded-lg mr-2"
                  />
                  <p className="text-neutral-800 text-sm">{bid.user.name}</p>
                  <p className={clsx("ml-auto mr-2 text-sm", { "font-extrabold": idx === 0 })}>
                    {currency(bid.value)}
                  </p>
                  <button className="p-1 rounded-lg bg-emerald-500 leading-none text-white">
                    <Icon
                      width={18}
                      height={18}
                      icon="Flag"
                    />
                  </button>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
