import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { PostsProvider } from "@/hooks/use-posts/usePosts"
import { UserProvider } from "@/hooks/use-user/useUser"
import { ReactQueryClientProvider } from "@/services/queryClient"

interface Props {
  children: ReactNode
}

export function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <ReactQueryClientProvider>
        <UserProvider>
          <PostsProvider>{children}</PostsProvider>
        </UserProvider>
      </ReactQueryClientProvider>
    </SessionProvider>
  )
}
