import { FieldPath, FieldValues } from "react-hook-form"
import { UploadFileProvider, UploadFileProviderProps } from "../../contexts/upload-file-context"
import { UploadFileSlot } from "../slot/UploadFileSlot"

export type UploadFileCarouselProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = Omit<UploadFileProviderProps<TFieldValues, TName>, "maxUploads"> & {
  maxUploads?: number
}

export function UploadFileCarousel<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ maxUploads = 5, ...providerProps }: UploadFileCarouselProps<TFieldValues, TName>) {
  return (
    <div className="flex flex-col text-foreground gap-2">
      <div className="flex gap-2 overflow-x-auto py-4">
        <UploadFileProvider
          maxUploads={maxUploads}
          {...providerProps}
        >
          {Array.from({ length: maxUploads }).map((_, i) => (
            <UploadFileSlot
              ring="action"
              borderWidth={1}
              rounded={6}
              size="regular"
              response={providerProps.value[i]}
            />
          ))}
        </UploadFileProvider>
      </div>
    </div>
  )
}

UploadFileCarousel.displayName = "UploadFileButton"
