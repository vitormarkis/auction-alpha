"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { ReactQueryClientProvider } from "@/services/queryClient"

interface Props {
  children: ReactNode
}

export function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
    </SessionProvider>
  )
}
