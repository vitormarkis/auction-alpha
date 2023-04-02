import React, { ReactNode } from "react"

export default function App({ children }: { children: ReactNode }) {
  return (
    <div>
      <h1>App</h1>
      {children}
    </div>
  )
}
