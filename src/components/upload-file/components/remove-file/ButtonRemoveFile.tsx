import React from "react"
import { tv, VariantProps, defaultConfig, TVDefaultVariants, TVVariants } from "tailwind-variants"
import { IconTrash } from "@/components/icons/IconTrash"

const uploadFileRemoveFileVariants = tv(
  {
    base: "upf-trigger rounded-sm bg-red-500 grid place-items-center transition-[box-shadow,opacity,transform] duration-200 border border-red-500 focus:outline-none focus:ring-1 focus:ring-neutral-800 focus:border-red-200",
    variants: {
      size: {
        regular: "h-4 w-4 [&_svg]:h-2 [&_svg]:w-2",
        medium: "h-8 w-8 [&_svg]:h-4 [&_svg]:w-4",
        large: "h-10 w-10 [&_svg]:h-5 [&_svg]:w-5",
        "2xLarger": "h-16 w-16 [&_svg]:h-8 [&_svg]:w-8",
      },
    },
    defaultVariants: {
      size: "large",
    },
  },
  {
    responsiveVariants: true,
  }
)

export type UploadFileRemoveFileProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof uploadFileRemoveFileVariants> & {}

export const UploadFileRemoveFile = React.forwardRef<
  React.ElementRef<"div">,
  UploadFileRemoveFileProps
>(function UploadFileRemoveFileComponent({ size, className, ...props }, ref) {
  return (
    <div
      {...props}
      ref={ref}
    >
      <button
        data-purpose="remove-upload-file"
        type="button"
        className={uploadFileRemoveFileVariants({ size, className })}
      >
        <IconTrash
          size={16}
          className="text-white"
        />
      </button>
    </div>
  )
})

UploadFileRemoveFile.displayName = "UploadFileRemoveFile"
