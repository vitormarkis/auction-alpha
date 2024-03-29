"use client"

import { Session } from "next-auth"
import { useState } from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { MoreHorizontal } from "@styled-icons/fluentui-system-regular/MoreHorizontal"
import { PostSession } from "@/requests/get-posts/getPosts"
import { User } from "@/types/interfaces"
import DeletePostDialog from "../DeletePostDialog"

interface Props {
  authorId: string
  user: User | null
  post: PostSession
  redirect?: string | undefined
  session?: Session
}

const PostMenu: React.FC<Props> = ({ authorId, user, post, redirect, session }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isAuthor = authorId === user?.id ?? false
  const isAdmin = user?.role === "ADMIN"

  return (
    <DropdownMenu.Root
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
    >
      <DropdownMenu.Trigger asChild>
        <p className="h-fit p-1.5 leading-none rounded-lg hover:bg-neutral-200 cursor-pointer">
          <MoreHorizontal
            width={24}
            height={24}
          />
        </p>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          className="p-1 rounded-lg text-sm bg-white flex flex-col border border-stone-300 shadow-lg"
        >
          <DropdownMenu.Item className="text-left py-1 px-6 rounded-md outline-none cursor-pointer hover:bg-gray-200 text-neutral-600 ">
            Salvar
          </DropdownMenu.Item>
          {(isAuthor || isAdmin) && (
            <>
              <DropdownMenu.Separator className="h-[1px] bg-stone-300 m-1" />
              <DropdownMenu.Item asChild>
                <button className="text-left py-1 px-6 rounded-md outline-none cursor-pointer hover:bg-gray-200 text-neutral-600">
                  Editar
                </button>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <DeletePostDialog
                  post={post}
                  setIsModalOpen={setIsModalOpen}
                  redirect={redirect}
                >
                  <button className="text-left py-1 px-6 rounded-md outline-none cursor-pointer hover:bg-gray-200 text-neutral-600">
                    Excluir
                  </button>
                </DeletePostDialog>
              </DropdownMenu.Item>
            </>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default PostMenu
