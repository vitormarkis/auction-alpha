import { cva, VariantProps } from "class-variance-authority"
import Image from "next/image"
import Link from "next/link"
import React, { useContext } from "react"
import { UploadFileResponse } from "uploadthing/client"
import { cn } from "@/lib/utils"
import { cssVariables } from "@/utils/cssVariables"
import { UploadFileContext } from "../../contexts/upload-file-context"
import { ButtonUploadFile } from "../button-upload-file/ButtonUploadFile"
import { UploadFileRemoveFile } from "../remove-file/ButtonRemoveFile"

export const slotVariants = cva("", {
  variants: {
    size: {
      regular: "h-14 w-14",
      medium: "h-20 w-20",
    },
    ring: {
      // prettier-ignore
      action: `
        [&:has(.upf-trigger.wrapper:focus)]:ring-[1.5px]
        [&:has(.upf-trigger.wrapper:focus)]:ring-[#186868]
        [&:has(.upf-trigger.wrapper:focus)]:border-[#0ff]
      `.replace(/\s+/g, " ").trim(),
      none: "",
    },
  },
  defaultVariants: {
    ring: "action",
    size: "regular",
  },
})

export type UploadFileSlotProps = VariantProps<typeof slotVariants> & {
  className?: string
  response: UploadFileResponse | undefined
  rounded?: number
  borderWidth?: number
}

export const UploadFileSlot = React.forwardRef<React.ElementRef<"div">, UploadFileSlotProps>(
  function UploadFileSlotComponent(
    { ring, size, rounded = 6, borderWidth = 1, className, response },
    ref
  ) {
    const { handleRemoveFile } = useContext(UploadFileContext)

    return (
      <div
        className={cn(
          "relative border-[line-width:var(--borderWidth)] rounded-[var(--rounded)] transition-[transform] duration-200 shrink-0",
          response &&
            cn(
              "[&:has(.upf-trigger:hover)]:-translate-y-2",
              "[&:is(:has(.upf-trigger:hover),_:focus-within)_[data-purpose='remove-upload-file']]:translate-y-0",
              "[&:is(:has(.upf-trigger:hover),_:focus-within)_[data-purpose='remove-upload-file']]:opacity-100",
              "[&:is(:has(.upf-trigger:hover),_:focus-within)_[data-purpose='remove-upload-file']]:scale-100"
            ),
          slotVariants({ className, ring, size })
        )}
        ref={ref}
        style={cssVariables([
          ["rounded", rounded, "px"],
          ["borderWidth", borderWidth, "px"],
        ])}
      >
        {response ? (
          <>
            <div className="absolute inset-0 overflow-hidden rounded-[calc(var(--rounded)_-_var(--borderWidth))]">
              <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
              <Link
                // data-type="trigger"
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
                quality={30}
                fill
              />
            </div>
            <UploadFileRemoveFile
              className="absolute z-20 right-0 top-0 translate-x-1/2 -translate-y-1/2"
              onClick={() => handleRemoveFile({ fileUrl: response.url })}
            />
          </>
        ) : (
          <>
            <ButtonUploadFile className="upf-trigger wrapper" />
          </>
        )}
      </div>
    )
  }
)

UploadFileSlot.displayName = "UploadFileSlot"
