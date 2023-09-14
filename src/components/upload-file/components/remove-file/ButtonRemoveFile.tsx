import React from "react"
import { cn } from "@/lib/utils"
import { IconTrash } from "@/components/icons/IconTrash"

export type UploadFileRemoveFileProps = React.ComponentPropsWithoutRef<"div"> & {}

export const UploadFileRemoveFile = React.forwardRef<
  React.ElementRef<"div">,
  UploadFileRemoveFileProps
>(function UploadFileRemoveFileComponent({ ...props }, ref) {
  return (
    <div
      {...props}
      ref={ref}
    >
      <button
        data-purpose="remove-upload-file"
        type="button"
        className={cn(
          "upf-trigger h-4 w-4 rounded-sm bg-red-500 grid place-items-center transition-[box-shadow,opacity,transform] duration-200 border border-red-500",
          "translate-y-1 opacity-0 scale-90",
          "focus:outline-none focus:ring-1 focus:ring-white focus:border-red-800"
        )}
      >
        <IconTrash size={10} />
      </button>
    </div>
  )
})

UploadFileRemoveFile.displayName = "UploadFileRemoveFile"
