"use client"

import { User } from "@/types/interfaces"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { MoreHorizontal } from "@styled-icons/fluentui-system-regular/MoreHorizontal"

interface Props {
  authorId: string
  user: User | null
}

const PostMenu: React.FC<Props> = ({ authorId, user }) => {
  const isAuthor = user ? (authorId === user?.id ? true : false) : false

  return (
    <DropdownMenu.Root>
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
          {isAuthor && (
            <>
              <DropdownMenu.Separator className="h-[1px] bg-stone-300 m-1" />
              <DropdownMenu.Item className="text-left py-1 px-6 rounded-md outline-none cursor-pointer hover:bg-gray-200 text-neutral-600 ">
                Editar
              </DropdownMenu.Item>
              <DropdownMenu.Item className="text-left py-1 px-6 rounded-md outline-none cursor-pointer hover:bg-gray-200 text-neutral-600 ">
                Excluir
              </DropdownMenu.Item>
            </>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default PostMenu
