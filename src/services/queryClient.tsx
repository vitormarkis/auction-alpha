"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"

export const queryClient = new QueryClient()

export function ReactQueryClientProvider(props: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
}
