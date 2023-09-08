import React from "react"
import { tv, VariantProps } from "tailwind-variants"
import * as Avatar from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"

export const profileAvatarPictureVariants = tv({
  base: "grid place-items-center relative shrink-0 overflow-hidden",
  variants: {
    size: {
      regular: "h-14 w-14",
      small: "h-9 w-9",
    },
    rounded: {
      full: "rounded-full",
      medium: "rounded-md",
    },
  },
  defaultVariants: {
    rounded: "full",
    size: "regular",
  },
})

export type ProfileAvatarPictureProps = Omit<React.ComponentPropsWithoutRef<"img">, "src"> &
  VariantProps<typeof profileAvatarPictureVariants> & {
    src: string | null | undefined
  }

export const ProfileAvatarPicture = React.forwardRef<
  React.ElementRef<"img">,
  ProfileAvatarPictureProps
>(function ProfileAvatarPictureComponent({ size, rounded, src, className, ...props }, ref) {
  return (
    <Avatar.Root asChild>
      <div className={profileAvatarPictureVariants({ className, rounded, size })}>
        {src && src.length ? (
          <Avatar.Image
            {...props}
            src={src}
            className={cn("absolute inset-0", className)}
          />
        ) : (
          <div className="absolute inset-0 bg-gray-300 animate-pulse" />
        )}
        <Avatar.Fallback
          className="absolute inset-0 bg-gray-300 animate-pulse"
          delayMs={600}
        />
      </div>
    </Avatar.Root>
  )
})

ProfileAvatarPicture.displayName = "ProfileAvatarPicture"
