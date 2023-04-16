"use client"

import { Home } from "@styled-icons/material-sharp/Home"
import { Feed } from "@styled-icons/material-sharp/Feed"
import { Flag } from "@styled-icons/material-sharp/Flag"
import { Grain } from "@styled-icons/material-sharp/Grain"
import { Close } from "@styled-icons/material-sharp/Close"
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
  | "Close"
  | "Feather"
  | "User"

type TStyledIconBase = typeof StyledIconBase

interface Props extends TStyledIconBase {
  icon: PossibleIcons
  height: number
  width: number
  className?: string
  color?: string
}

export function Icon({ icon, height, width, color, ...props }: Props) {
  const iconSchema: Record<PossibleIcons, React.ReactNode> = {
    Feather: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        width={width}
        height={height}
        fill={color ?? "#000000"}
        viewBox="0 0 256 256"
      >
        <path d="M221.28,34.75a64,64,0,0,0-90.49,0L60.69,104A15.9,15.9,0,0,0,56,115.31v73.38L26.34,218.34a8,8,0,0,0,11.32,11.32L67.32,200H140.7A15.92,15.92,0,0,0,152,195.32l0,0,69.23-70A64,64,0,0,0,221.28,34.75ZM142.07,46.06A48,48,0,0,1,211.79,112H155.33l34.35-34.34a8,8,0,0,0-11.32-11.32L120,124.69V67.87ZM72,115.35l32-31.67v57l-32,32ZM140.7,184H83.32l56-56h56.74Z"></path>
      </svg>
    ),
    User: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        width={width}
        height={height}
        fill={color ?? "#000000"}
        viewBox="0 0 256 256"
      >
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z"></path>
      </svg>
    ),
    Home: (
      <Home
        width={width}
        height={height}
        {...props}
      />
    ),
    Feed: (
      <Feed
        width={width}
        height={height}
        {...props}
      />
    ),
    Flag: (
      <Flag
        width={width}
        height={height}
        {...props}
      />
    ),
    Grain: (
      <Grain
        width={width}
        height={height}
        {...props}
      />
    ),
    Close: (
      <Close
        width={width}
        height={height}
        {...props}
      />
    ),
    Search: (
      <Search
        width={width}
        height={height}
        {...props}
      />
    ),
    Payment: (
      <Payment
        width={width}
        height={height}
        {...props}
      />
    ),
    MoreVert: (
      <MoreVert
        width={width}
        height={height}
        {...props}
      />
    ),
    Settings: (
      <Settings
        width={width}
        height={height}
        {...props}
      />
    ),
    AutoGraph: (
      <AutoGraph
        width={width}
        height={height}
        {...props}
      />
    ),
    Notifications: (
      <Notifications
        width={width}
        height={height}
        {...props}
      />
    ),
    BookmarkBorder: (
      <BookmarkBorder
        width={width}
        height={height}
        {...props}
      />
    ),
    NotificationsNone: (
      <NotificationsNone
        width={width}
        height={height}
        {...props}
      />
    ),
  }

  return <>{iconSchema[icon]}</>
}
