import Image from "next/image"
import React from "react"
import { tv, VariantProps } from "tailwind-variants"
import { cn } from "@/lib/utils"
import { ProfilePictureIconDefault } from "@/components/quarks"

const classStyles = tv({
  base: "rounded-full shrink-0 relative overflow-hidden",
  variants: {
    size: {
      regular: "w-9 h-9",
      big: "h-14 w-14",
    },
  },
  defaultVariants: {
    size: "regular",
  },
})

export type ProfilePictureIconProps = React.ComponentProps<"div"> &
  VariantProps<typeof classStyles> & {
    photoUrl?: string | null
    userName?: string | null
  }

export const ProfilePictureIcon = React.forwardRef<
  React.ElementRef<"div">,
  ProfilePictureIconProps
>(function ProfilePictureIconComponent({ size, userName, photoUrl, className, ...props }, ref) {
  return (
    <div
      {...props}
      className={classStyles({ size, className })}
      ref={ref}
    >
      {photoUrl && (
        <Image
          src={photoUrl}
          alt={`Foto de perfil de ${userName}`}
          fill
        />
      )}
      {!photoUrl && (
        <ProfilePictureIconDefault size={size}>
          {userName ? userName.charAt(0) : "sn"}
        </ProfilePictureIconDefault>
      )}
    </div>
  )
})
