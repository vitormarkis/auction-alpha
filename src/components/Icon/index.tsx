"use client"

import { AutoGraph } from "@styled-icons/material-sharp/AutoGraph"
import { BookmarkBorder } from "@styled-icons/material-sharp/BookmarkBorder"
import { Notifications } from "@styled-icons/material-sharp/Notifications"
import { Home } from "@styled-icons/material-sharp/Home"
import { Feed } from "@styled-icons/material-sharp/Feed"
import { Settings } from "@styled-icons/material-sharp/Settings"
import React from "react"
import type { StyledIconBase } from "@styled-icons/styled-icon/index"

type PossibleIcons = "AutoGraph" | "BookmarkBorder" | "Notifications" | "Home" | "Settings" | "Feed"

type TStyledIconBase = typeof StyledIconBase

interface Props extends TStyledIconBase {
  icon: PossibleIcons
  height: number
  width: number
}

export function Icon({ icon, ...props }: Props) {
  const iconSchema: Record<PossibleIcons, React.ReactNode> = {
    AutoGraph: <AutoGraph {...props} />,
    BookmarkBorder: <BookmarkBorder {...props} />,
    Home: <Home {...props} />,
    Notifications: <Notifications {...props} />,
    Settings: <Settings {...props} />,
    Feed: <Feed {...props} />,
  }

  return <>{iconSchema[icon]}</>
}
