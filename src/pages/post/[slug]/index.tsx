import "moment/locale/pt-br"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { cn } from "@/lib/utils"
import { currency } from "@/lib/utils/currencyConverter"
import { Icon } from "@/components/Icon"
import PostMenu from "@/components/PostMenu"
import { PublishedAt } from "@/components/atoms/published-at/PublishedAt"
import { ThreeColumnsLayout } from "@/components/layouts/three-columns-layout/ThreeColumnsLayout"
import { MakeBidModal } from "@/components/modals/bid-make/MakeBidModal"
import { BidsQuantityIndicator } from "@/components/molecules/bids-quantity-indicator/BidsQuantityIndicator"
import { Carousell } from "@/components/organisms/carousell/Carousell"
import { CarrousellSkeleton } from "@/components/skeletons/carousell/CarrousellSkeleton"
import { PostProvider } from "@/hooks/use-post/usePost"
import { usePosts } from "@/hooks/use-posts/usePosts"
import { PostSession } from "@/requests/get-posts/getPosts"

export default function PostPage() {
  const { getPostPageQuery } = usePosts()
  const router = useRouter()
  const { slug } = router.query
  const { data, status } = useSession()
  const { user } = data ?? {}

  const { data: post, isLoading: isPostLoading } = getPostPageQuery(slug as string, {
    enabled: !!slug,
  })

  const isAuthor = post?.author_id === user?.id
  const hasBids = post?._count.bids ? post._count.bids > 0 : false

  const installment_price = currency((post?.price ?? 0) / 12, { trailZero: true })

  const orderedUserBids = post?.bids.sort((a, b) => b.value - a.value) ?? []
  const userIsPostAuthor = post && user ? post.author_id === user.id : false

  const bidMadeByUser = user?.id ? post?.bids.find(post => user?.id === post.user.id) : null
  const userHasMadeABidOnThisPost = !!bidMadeByUser

  return (
    <PostProvider post={post}>
      <ThreeColumnsLayout>
        <div className="bg-white grow">
          <div className="flex min-h-full h-[calc(100dvh_-_52px)] flex-col scroll-thin md:flex-row overflow-y-scroll md:overflow-y-visible">
            <div className="basis-0 grow-[2] pt-6 flex flex-col scroll-thin md:overflow-y-scroll overflow-y-visible ">
              {!post || isPostLoading ? (
                <CarrousellSkeleton
                  quantity={3}
                  className="lg:mb-3"
                />
              ) : (
                <Carousell
                  postMedias={post.post_media}
                  className="lg:mb-3"
                />
              )}
              <div className="p-6 hidden md:block">
                <h3 className="font-semibold text-neutral-700">Descrição</h3>
                <p className="text-neutral-600">{post?.text}</p>
              </div>
            </div>
            <div className="basis-0 grow p-6 pb-24 whitespace-nowrap">
              <div className="md:flex hidden justify-between mb-1">
                <div></div>
                <div>
                  <PostMenu
                    authorId={post?.author_id ?? ""}
                    post={post ?? ({} as PostSession)}
                    redirect="/"
                  />
                </div>
              </div>
              {post ? (
                // {false ? (
                <h1 className="text-2xl font-semibold mb-0.5 whitespace-normal">{post?.title}</h1>
              ) : (
                <div className="flex flex-col gap-1">
                  <div className="h-[2rem] w-full rounded-md bg-gray-300 animate-pulse" />
                  <div className="h-[2rem] w-full rounded-md bg-gray-300 animate-pulse" />
                  <div className="h-[2rem] w-[7rem] rounded-md bg-gray-300 animate-pulse" />
                </div>
              )}
              <PublishedAt />
              <div>
                <div className="flex mb-3 flex-col mdx:flex-row">
                  <p className="inline-block mr-4 text-3xl text-black">
                    {currency(post?.price ?? 0)}
                  </p>
                  <div className="flex items-end">
                    <p className="text-sm text-neutral-500">ou 12x de R${installment_price}</p>
                  </div>
                </div>
              </div>
              {status === "loading" || isPostLoading ? (
                <div className="flex flex-col gap-3 mb-3">
                  <div className="bg-gray-700 rounded-md h-14 w-full" />
                  <div className="bg-gray-300 rounded-md h-14 w-full" />
                </div>
              ) : userIsPostAuthor || userHasMadeABidOnThisPost ? null : (
                <div className="flex flex-col gap-3 mb-3">
                  <MakeBidModal>
                    <button className="bg-black h-12 px-4 text-white rounded-lg focus:outline-1 focus:outline-offset-1 focus:outline-blue-500 focus:outline-double border border-black">
                      Fazer uma proposta
                    </button>
                  </MakeBidModal>
                  <button className="h-12 px-4 bg-white border rounded-lg shadow-lg text-neutral-500 border-stone-300">
                    Fazer uma pergunta
                  </button>
                </div>
              )}
              <div className="mb-3">
                <BidsQuantityIndicator />
              </div>

              {isAuthor && hasBids ? (
                <div className="flex flex-col gap-2 p-2 bg-white border rounded-lg shadow-lg border-stone-300">
                  {orderedUserBids.map((bid, idx) => (
                    <div
                      key={bid.id}
                      className="flex items-center"
                    >
                      <img
                        src={bid.user.image ?? ""}
                        alt={`Foto de perfil de ${bid.user.name}`}
                        className="w-8 h-8 mr-2 rounded-lg"
                      />
                      <p className="text-sm text-neutral-800">{bid.user.name}</p>
                      <p className={cn("ml-auto mr-2 text-sm", { "font-extrabold": idx === 0 })}>
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

              {bidMadeByUser ? (
                <div className="flex flex-col gap-2 p-2 bg-white border rounded-lg shadow-lg border-stone-300">
                  <div>
                    <p className="text-sm font-semibold text-stone-800">Seu lance</p>
                  </div>
                  <div className="flex items-center">
                    <img
                      src={bidMadeByUser.user.image ?? ""}
                      alt={`Foto de perfil de ${bidMadeByUser.user.name}`}
                      className="w-8 h-8 mr-2 rounded-lg"
                    />
                    <p className="text-sm text-neutral-800">{bidMadeByUser.user.name}</p>
                    <p className="ml-auto mr-2 text-sm font-extrabold mt-[1px]">
                      {currency(bidMadeByUser.value)}
                    </p>
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
      </ThreeColumnsLayout>
    </PostProvider>
  )
}
