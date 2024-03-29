import Navbar from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import "../../styles/globals.css"

export const metadata = {
  title: "Auction",
  description: "Generated by create next app",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* @ts-expect-error */}
      <Navbar />
      <div className="flex h-full w-full max-w-[1280px] grow mx-auto bg-white">
        <div className="flex">
          {/* @ts-expect-error */}
          <Sidebar className="sm:flex hidden" />
        </div>

        {children}
      </div>
    </>
  )
}
