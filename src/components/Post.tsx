import clsx from "clsx"
import moment from "moment"
import "moment/locale/pt-br"
import Link from "next/link"
import { HTMLAttributes } from "react"
import { Eye } from "@styled-icons/fluentui-system-regular/Eye"
import { Poll } from "@styled-icons/fluentui-system-regular/Poll"
import { currency } from "@/lib/utils/currencyConverter"
import { ProfileAvatarPicture } from "@/components/atoms/avatar-picture-profile/ProfileAvatarPicture"
import { PostSession } from "@/requests/get-posts/getPosts"
import { User } from "@/types/interfaces"
import PostMenu from "./PostMenu"

interface Props extends HTMLAttributes<HTMLDivElement> {
  post: PostSession
  user: User | null
}

export const Post: React.FC<Props> = ({ post: postProps, className, user, ...rest }) => {
  const { author_id, created_at, id, post_media, price, text, title, author, slug, _count } =
    postProps

  const [leftPrice, rightPrice] = String(price).split(".")

  const cents = rightPrice?.length === 1 ? rightPrice + "0" : rightPrice
  const isPremium = author.role === "ADMIN"

  return (
    <div
      {...rest}
      className={`${className ?? ""} p-6 whitespace-nowrap`}
    >
      <div className="flex">
        <div>
          <ProfileAvatarPicture src={author.image} />
        </div>
        <div className="leading-4 ml-3">
          <p className="text-lg text-neutral-800">{author.name}</p>
          <span className="text-sm text-neutral-500">
            {moment(created_at).locale("pt-br").fromNow()}
          </span>
        </div>
        <div className="ml-auto flex">
          <PostMenu
            post={postProps}
            authorId={author_id}
            user={user}
          />
        </div>
      </div>
      <div className="mt-3 whitespace-normal">
        <p>{text}</p>
      </div>
      <div className="mt-3 rounded-lg flex flex-col border border-black overflow-hidden cursor-pointer">
        <div className="flex">
          {post_media.map(media => (
            <img
              key={media.id}
              alt="Foto do post"
              src={media.media ?? ""}
              className="object-cover w-full h-72 border-r border-r-neutral-400"
            />
          ))}
        </div>
        <div
          className={clsx("p-2 bg-black", {
            "bg-gradient-to-r to-fuchsia-600 via-indigo-700 from-cyan-600": isPremium,
          })}
        >
          <h2 className="text-white font-semibold whitespace-normal">{title}</h2>
        </div>
        <div className="px-4 py-3 flex items-center">
          <div>
            <span className="font-semibold text-2xl">{currency(price, { trailZero: true })}</span>
            {/* <span className="text-xs text-neutral-500">
              
              {rightPrice && ","}
              {cents}
            </span> */}
          </div>
          <div className="bg-neutral-400 h-5 w-[1px] mx-3" />
          <div className="hidden whitespace-normal sm:flex items-center text-sm">
            <Eye
              width={16}
              height={16}
            />
            {_count.bids > 1 ? (
              <p className="ml-1">{_count.bids} pessoas já fizeram um lance</p>
            ) : (
              <p className="ml-1">{_count.bids} pessoa já fez um lance</p>
            )}
          </div>
          <div className="ml-auto">
            <Link href={`/post/${slug}`}>
              <button className="py-1.5 rounded-lg pr-6 pl-4 bg-black text-white flex items-center">
                <Poll
                  width={16}
                  height={16}
                />
                <p className="ml-2">Ver mais</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
