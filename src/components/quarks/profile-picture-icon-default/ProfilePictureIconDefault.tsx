import React from "react"
import { tv, VariantProps } from "tailwind-variants"
import { cn } from "@/lib/utils"

const classStyles = tv({
  base: "translate-y-[1px]",
  variants: {
    size: {
      regular: "text-base",
      big: "text-2xl",
    },
  },
  defaultVariants: {
    size: "regular",
  },
})

export type ProfilePictureIconDefaultProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof classStyles> & {
    children: React.ReactNode
  }

export const ProfilePictureIconDefault = React.forwardRef<
  React.ElementRef<"div">,
  ProfilePictureIconDefaultProps
>(function ProfilePictureIconDefaultComponent({ size, children, ...props }, ref) {
  return (
    <div
      {...props}
      className={cn(
        "bg-blue-600 text-white grid place-items-center absolute inset-0",
        props.className
      )}
      ref={ref}
    >
      <span className={classStyles({ size })}>{children}</span>
    </div>
  )
})
