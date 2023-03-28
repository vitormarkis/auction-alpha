import { queryClient } from "@/services/queryClient"
import "@/styles/globals.css"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import { Roboto } from "next/font/google"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
})

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <main className={roboto.className}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </main>
      </QueryClientProvider>
    </SessionProvider>
  )
}
