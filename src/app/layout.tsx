import "../styles/globals.css"
import { Providers } from "./providers"

export const metadata = {
  title: "Powa generated by App Directory",
  description: "Generated by create next app",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen bg-neutral-100 overflow-y-scroll">
          {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
