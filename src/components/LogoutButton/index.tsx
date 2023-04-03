"use client"

import { signIn, signOut } from "next-auth/react"
import { HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLButtonElement> {
  action: "sign_out" | "sign_in"
}

function AuthButton({ className, onClick, action, ...rest }: Props) {
  const actionLiteral = {
    sign_out: () => signOut(),
    sign_in: () => signIn(),
  }

  return (
    <button
      onClick={e => {
        actionLiteral[action]()
        if (onClick) onClick(e)
      }}
      className={`py-1.5 px-6 rounded-lg bg-black text-white ${className}`}
      {...rest}
    >
      {action === "sign_in" ? "Entrar" : "Sair"}
    </button>
  )
}

export default AuthButton
