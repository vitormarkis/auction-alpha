import type { AppProps } from "next/app"
import { Roboto } from "next/font/google"
import { Providers } from "@/providers/app-provider/AppProvider"
import "@/styles/globals.css"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <div className={`min-h-screen flex flex-col ${roboto.className}`}>
        <Component {...pageProps} />
      </div>
    </Providers>
  )
}
