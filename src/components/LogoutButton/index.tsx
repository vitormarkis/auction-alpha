"use client"

import { signOut } from "next-auth/react"
import React, { HTMLAttributes } from "react"
import { Logout } from "@styled-icons/material/Logout"

const LogoutButton: React.FC<HTMLAttributes<HTMLButtonElement>> = ({
  className,
  onClick,
  ...rest
}) => {
  return (
    <button
      onClick={e => {
        signOut()
        if (onClick) onClick(e)
      }}
      className={`${className ?? ""} p-1.5 bg-red-100 rounded-lg leading-none`}
      {...rest}
    >
      <Logout
        width={18}
        height={18}
        className="text-red-500"
      />
    </button>
  )
}

export default LogoutButton
