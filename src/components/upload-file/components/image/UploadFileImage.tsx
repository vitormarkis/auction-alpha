import Image from "next/image"
import Link from "next/link"
import React from "react"
import { cn } from "@/lib/utils"
import { UploadFileSlotProps } from "../slot/UploadFileSlot"

export type UploadFileImageProps = React.ComponentPropsWithoutRef<"div"> & {
  imageQuality: React.ComponentProps<typeof Image>["quality"]
  response: NonNullable<UploadFileSlotProps["response"]>
  children: React.ReactNode
}

export const UploadFileImage = React.forwardRef<React.ElementRef<"div">, UploadFileImageProps>(
  function UploadFileImageComponent({ response, imageQuality, children, ...props }, ref) {
    return (
      <div
        {...props}
        className={cn(
          "absolute inset-0 overflow-hidden rounded-[calc(var(--rounded)_-_var(--borderWidth))]",
          props.className
        )}
        ref={ref}
      >
        <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
        <Link
          target="_blank"
          href={response.url}
          className={cn(
            "upf-trigger wrapper peer block before:transition-[transform,brightness] duration-100 ease-in-out absolute z-10 inset-0",
            "focus-visible:outline-none outline-none"
          )}
        />
        <Image
          alt={response.key}
          src={response.url}
          className="object-cover focus:outline-none"
          sizes="(max-width: 768px) 10vw, (max-width: 1200px) 50vw"
          quality={imageQuality}
          fill
        />
      </div>
    )
  }
)

UploadFileImage.displayName = "UploadFileImage"
