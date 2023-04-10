"use client"

import { Home } from "@styled-icons/material-sharp/Home"
import { Feed } from "@styled-icons/material-sharp/Feed"
import { Flag } from "@styled-icons/material-sharp/Flag"
import { Grain } from "@styled-icons/material-sharp/Grain"
import { Search } from "@styled-icons/material-sharp/Search"
import { Payment } from "@styled-icons/material-sharp/Payment"
import { Settings } from "@styled-icons/material-sharp/Settings"
import { MoreVert } from "@styled-icons/material-sharp/MoreVert"
import { AutoGraph } from "@styled-icons/material-sharp/AutoGraph"
import { Notifications } from "@styled-icons/material-sharp/Notifications"
import { BookmarkBorder } from "@styled-icons/material-sharp/BookmarkBorder"
import { NotificationsNone } from "@styled-icons/material-sharp/NotificationsNone"
import React from "react"
import type { StyledIconBase } from "@styled-icons/styled-icon/index"

type PossibleIcons =
  | "AutoGraph"
  | "BookmarkBorder"
  | "Notifications"
  | "Home"
  | "Settings"
  | "Feed"
  | "Grain"
  | "NotificationsNone"
  | "MoreVert"
  | "Search"
  | "Payment"
  | "Flag"

type TStyledIconBase = typeof StyledIconBase

interface Props extends TStyledIconBase {
  icon: PossibleIcons
  height: number
  width: number
  className?: string
}

export function Icon({ icon, ...props }: Props) {
  const iconSchema: Record<PossibleIcons, React.ReactNode> = {
    Home: <Home {...props} />,
    Feed: <Feed {...props} />,
    Flag: <Flag {...props} />,
    Grain: <Grain {...props} />,
    Search: <Search {...props} />,
    Payment: <Payment {...props} />,
    MoreVert: <MoreVert {...props} />,
    Settings: <Settings {...props} />,
    AutoGraph: <AutoGraph {...props} />,
    Notifications: <Notifications {...props} />,
    BookmarkBorder: <BookmarkBorder {...props} />,
    NotificationsNone: <NotificationsNone {...props} />,
  }

  return <>{iconSchema[icon]}</>
}
