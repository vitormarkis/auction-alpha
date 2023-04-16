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
import PostMenu from "@/components/PostMenu"

export default async function PostPage({ params }: { params: { slug: string } }) {
  const session = await getSession(headers().get("cookie") ?? "")
  const user = session?.user ?? null

  const { slug } = params
  const post = await fetch(`${api_endpoint}/api/posts/single?post_slug=${slug}`, {
    cache: "no-store",
    next: {
      revalidate: 10,
    },
  }).then(async res => postFeedSchema.parse(await res.json()))

  const isAuthor = post.author_id === user?.id
  const hasBids = post._count.bids > 0

  const installment_price = currency(post.price / 12, { trailZero: true })

  const orderedUserBids = post.bids.sort((a, b) => (a.value > b.value ? -1 : a.value < b.value ? 1 : 0))

  const userBid = user?.id ? post.bids.find(post => user?.id === post.user.id) : null

  return (
    <div className="bg-white grow">
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
          <div className="flex justify-between mb-1">
            <div></div>
            <div>
              <PostMenu
                authorId={post.author_id}
                post={post}
                user={user}
                redirect="/"
              />
            </div>
          </div>
          <h1 className="text-2xl font-semibold mb-0.5 whitespace-normal">{post.title}</h1>
          <p className="mb-3 text-xs text-neutral-400">
            <span>Publicado </span>
            <span className="font-semibold">{moment(post.created_at).locale("pt-br").fromNow()}</span>
            {" - encerra em "}
            <span className="font-semibold inline-block px-1.5 py-0.5 rounded-lg bg-indigo-100 text-indigo-500">
              {moment(post.announcement_date).locale("pt-br").toNow(true)}
            </span>
          </p>
          <div>
            <div className="flex mb-3">
              <p className="inline-block mr-4 text-3xl text-black">{currency(post.price)}</p>
              <div className="flex items-end">
                <p className="text-sm text-neutral-500">ou 12x de R${installment_price}</p>
              </div>
            </div>
          </div>
          {isAuthor || userBid ? null : (
            <div className="flex flex-col gap-3 mb-3">
              <MakeBidButton
                postId={post.id}
                userId={user?.id}
              />
              <button className="py-3 bg-white border rounded-lg shadow-lg text-neutral-500 border-stone-300">
                Fazer uma pergunta
              </button>
            </div>
          )}
          <div className="mb-3">
            <p
              className={clsx("py-1 px-1.5 text-sm rounded-lg", {
                "bg-orange-300 text-black": (!isAuthor && hasBids) || (isAuthor && !hasBids),
                "bg-indigo-100 text-indigo-500": (isAuthor && hasBids) || (!isAuthor && !hasBids),
              })}
            >
              {hasBids
                ? `${post._count.bids} lance${post._count.bids > 1 ? "s" : ""} no momento`
                : "Sem lances no momento"}
            </p>
          </div>
          {isAuthor && hasBids ? (
            <div className="flex flex-col gap-2 p-2 bg-white border rounded-lg shadow-lg border-stone-300">
              {orderedUserBids.map((bid, idx) => (
                <div
                  key={bid.id}
                  className="flex items-center"
                >
                  <img
                    src={bid.user.image}
                    alt={`Foto de perfil de ${bid.user.name}`}
                    className="w-8 h-8 mr-2 rounded-lg"
                  />
                  <p className="text-sm text-neutral-800">{bid.user.name}</p>
                  <p className={clsx("ml-auto mr-2 text-sm", { "font-extrabold": idx === 0 })}>
                    {currency(bid.value)}
                  </p>
                  <button className="p-1 leading-none text-white rounded-lg bg-emerald-500">
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

          {userBid ? (
            <div className="flex flex-col gap-2 p-2 bg-white border rounded-lg shadow-lg border-stone-300">
              <div>
                <p className="text-sm font-semibold text-stone-800">Seu lance</p>
              </div>
              <div className="flex items-center">
                <img
                  src={userBid.user.image}
                  alt={`Foto de perfil de ${userBid.user.name}`}
                  className="w-8 h-8 mr-2 rounded-lg"
                />
                <p className="text-sm text-neutral-800">{userBid.user.name}</p>
                <p className="ml-auto mr-2 text-sm font-extrabold mt-[1px]">{currency(userBid.value)}</p>
                <button
                  className="p-1 leading-none text-white bg-red-500 rounded-lg"
                  title="Remover seu lance desse post"
                >
                  <Icon
                    width={18}
                    height={18}
                    icon="Close"
                  />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
