import { FieldPath, FieldValues } from "react-hook-form"
import { cn } from "@/lib/utils"
import { UploadFileProvider, UploadFileProviderProps } from "../../contexts/upload-file-context"
import { UploadFileSlot } from "../slot/UploadFileSlot"

export type UploadFileCarouselProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = Omit<UploadFileProviderProps<TFieldValues, TName>, "maxUploads"> & {
  containerClassname?: string
  maxUploads?: number
}

export function UploadFileCarousel<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  maxUploads = 5,
  containerClassname,
  ...providerProps
}: UploadFileCarouselProps<TFieldValues, TName>) {
  return (
    <div className={cn("flex flex-col text-foreground gap-2", containerClassname)}>
      <div className="flex gap-2 overflow-x-auto pb-4 pt-8 px-1">
        <UploadFileProvider
          maxUploads={maxUploads}
          {...providerProps}
        >
          {Array.from({ length: maxUploads }).map((_, i) => (
            <UploadFileSlot
              ring="action"
              size="large"
              response={providerProps.value[i]}
            />
          ))}
        </UploadFileProvider>
      </div>
    </div>
  )
}

UploadFileCarousel.displayName = "UploadFileButton"
