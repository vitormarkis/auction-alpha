import { useContext } from "react"
import { cn } from "@/lib/utils"
import { IconImage } from "@/components/icons/IconImage"
import { UploadButton } from "@/utils/uploadthing"
import { UploadFileContext } from "../../contexts/upload-file-context"

export type ButtonUploadFileProps = React.ComponentProps<"div">

export function ButtonUploadFile({ className, ...props }: ButtonUploadFileProps) {
  const { onOpenChooseFileWindow, ...uploadButtonProps } = useContext(UploadFileContext)

  return (
    <div
      className={cn("absolute inset-0 outline-none focus-visible:outline-none", className)}
      onClick={onOpenChooseFileWindow}
      onKeyUp={e => {
        if (onOpenChooseFileWindow && (e.key === "Enter" || e.key === " ")) {
          onOpenChooseFileWindow()
          const uploadButton = e.currentTarget.querySelector("label")
          if (!uploadButton) return

          uploadButton.dispatchEvent(
            new MouseEvent("click", {
              bubbles: true,
              cancelable: true,
            })
          )
        }
      }}
      tabIndex={0}
      {...props}
    >
      <UploadButton
        appearance={{
          button:
            "absolute inset-0 h-full w-full cursor-pointer data-[state='uploading']:opacity-95",
          allowedContent: "hidden",
        }}
        content={{
          button: ({ ready, isUploading }) => {
            if (!ready || isUploading)
              return (
                <div className="border-[4px] h-6 w-6 border-transparent border-b-white bg-transparent rounded-full animate-spin" />
              )
            return (
              <IconImage
                size={20}
                strokeWidth={2}
                className="text-border"
              />
            )
          },
          allowedContent: ({ fileTypes }) => fileTypes,
        }}
        {...uploadButtonProps}
      />
    </div>
  )
}
