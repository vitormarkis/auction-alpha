import { headers } from "next/headers"


export function useHeaders() {
  const cookie = headers().get("cookie")
  const customHeaders = new Headers()
  if (cookie) customHeaders.append("cookie", cookie)


  return { headers: customHeaders, cookie }
}