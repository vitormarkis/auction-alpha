import { postFeedSchema } from "@/schemas/posts"
import { Carousell } from "./Carousell"
import moment from "moment"
import "moment/locale/pt-br"
import { getServerSession } from "next-auth"
import { headers } from "next/headers"
import { getSession } from "@/components/Header"

export default async function PostPage({ params }: { params: { slug: string } }) {
  const session = await getSession(headers().get("cookie") ?? "")
  const { user } = session ?? {}

  const { slug } = params
  const post = await fetch(`http://localhost:3000/api/posts/single?post_slug=${slug}`, {
    cache: "no-store",
    next: {
      revalidate: 10,
    },
  }).then(async res => postFeedSchema.parse(await res.json()))

  const isAuthor = post.author_id === user.id

  const installment_price = String((post.price / 12).toFixed(2)).replace(".", ",")

  return (
    <div className="w-full max-w-[1280px] h-full bg-white border-x border-b border-neutral-400 mx-auto">
      <div className="flex">
        <div className="p-6 border-r border-neutral-400 basis-0 grow-[3]">
          <Carousell postMedias={post.post_media} />
        </div>
        <div className="p-6 basis-0 grow-[2]">
          <h1 className="text-2xl font-semibold mb-0.5">{post.title}</h1>
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
              <p className="text-3xl mr-4 text-black inline-block">R$ {post.price}</p>
              <div className="flex items-end">
                <p className="text-neutral-500 text-sm">ou 12x de R${installment_price}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button className="bg-black py-3 text-white rounded-lg focus:outline-1 focus:outline-offset-1 focus:outline-blue-500 focus:outline-double border border-black">
              Fazer uma proposta
            </button>
            <button className="bg-neutral-100 py-3 text-neutral-500 rounded-lg focus:outline-1 focus:outline-offset-1 focus:outline-blue-100 focus:outline-double border border-neutral-500">
              Fazer uma pergunta
            </button>
          </div>
          {isAuthor && JSON.stringify(session, null, 2)}
        </div>
      </div>
    </div>
  )
}
