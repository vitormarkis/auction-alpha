"use client"

import { ReactQueryClientProvider } from "@/services/queryClient"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

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
