import React from "react"
import { Header } from "@/components/Header"
import { Sidebar } from "@/components/Sidebar"

export type ThreeColumnsLayoutProps = {
  children: React.ReactNode
}

export function ThreeColumnsLayout({ children }: ThreeColumnsLayoutProps) {
  return (
    <>
      <Header />
      <div className="flex h-full w-full max-w-[1280px] grow mx-auto bg-white">
        <div className="flex">
          <Sidebar className="sm:flex hidden" />
        </div>

        {children}
      </div>
    </>
  )
}
