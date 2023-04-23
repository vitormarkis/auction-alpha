"use client"

import * as Dialog from "@radix-ui/react-dialog"
import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import twColors from "tailwindcss/colors"
import { SidebarMenuContent } from "../SidebarMenuContent"
import { User } from "@/types/interfaces"
import { IUserBid } from "@/schemas/users"
import { useRouter } from "next/router"
import { usePathname } from "next/navigation"

interface Props {
  user: User | undefined
  userBids: IUserBid[] | null
}

const SidebarMenu: React.FC<Props> = ({ user, userBids }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasDocument, setHasDocument] = useState(false)

  useEffect(() => {
    setHasDocument(true)
  }, [])

  return (
    <Dialog.Root
      open={isMenuOpen}
      onOpenChange={setIsMenuOpen}
    >
      <Dialog.Trigger asChild>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill={twColors.zinc["800"]}
            viewBox="0 0 256 256"
          >
            <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
          </svg>
        </button>
      </Dialog.Trigger>
      {hasDocument
        ? ReactDOM.createPortal(
            <Dialog.Content className="absolute inset-0 flex z-[20]">
              <Dialog.Overlay
                onClick={() => setIsMenuOpen(false)}
                className="absolute inset-0 bg-black/40 cursor-pointer"
              />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute right-3 top-3 shadow-lg block p-1 bg-zinc-800 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#FFF"
                  viewBox="0 0 256 256"
                >
                  <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
                </svg>
              </button>
              <div className="flex flex-col w-4/5 max-w-[20rem] bg-white relative">
                <SidebarMenuContent
                  user={user}
                  userBids={userBids}
                  setIsMenuOpen={setIsMenuOpen}
                />
              </div>
            </Dialog.Content>,
            document.querySelector("#portal")!
          )
        : null}
    </Dialog.Root>
  )
}

export default SidebarMenu
