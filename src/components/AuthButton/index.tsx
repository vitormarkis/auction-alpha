"use client"

import { signIn, signOut } from "next-auth/react"
import { HTMLAttributes } from "react"
import clsx from "clsx"

interface Props extends HTMLAttributes<HTMLButtonElement> {
  action: "sign_out" | "sign_in"
  background: "white" | "black"
  border: "neutral" | "black" | "red"
  textColor: "white" | "black" | "red"
  weight: "normal" | "medium"
  shadow?: boolean
}

function AuthButton({
  className,
  onClick,
  action,
  background,
  border,
  textColor,
  weight,
  shadow,
  ...rest
}: Props) {
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
      className={clsx(`py-1.5 px-6 rounded-lg ${className} `, {
        "shadow-lg": !!shadow,
        "bg-black": background === "black",
        "bg-white": background === "white",
        "text-red-500": textColor === "red",
        "text-black": textColor === "black",
        "text-white": textColor === "white",
        "border-neutral-500": border === "neutral",
        "border-black": border === "black",
        "border-red-500": border === "red",
        "font-normal": weight === "normal",
        "font-medium": weight === "medium",
        "border": !!border,
      })}
      {...rest}
    >
      {action === "sign_in" ? "Entrar" : "Sair"}
    </button>
  )
}

export default AuthButton
