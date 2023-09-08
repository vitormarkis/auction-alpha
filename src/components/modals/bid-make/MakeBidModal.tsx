import clsx from "clsx"
import { signIn, useSession } from "next-auth/react"
import React from "react"
import ReactDOM from "react-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as Dialog from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"
import { usePost } from "@/hooks/use-post/usePost"
import { usePosts } from "@/hooks/use-posts/usePosts"
import { MakeBidForm, makeBidFormSchema } from "@/actions/make-bid/schema-form"

export type MakeBidModalProps = React.ComponentPropsWithoutRef<"div"> & {
  children: React.ReactNode
}

export const MakeBidModal = React.forwardRef<React.ElementRef<"div">, MakeBidModalProps>(
  function MakeBidModalComponent({ children, ...props }, ref) {
    const { status } = useSession()
    const [hasDocument, setHasDocument] = React.useState(false)
    const [isPriceModalOpen, setIsPriceModalOpen] = React.useState(false)

    const { register, reset, handleSubmit, formState } = useForm<MakeBidForm>({
      defaultValues: {
        value: 200,
      },
      resolver: zodResolver(makeBidFormSchema),
      mode: "onSubmit",
    })

    const { isSubmitting, errors: formErrors } = formState

    const { getMakeBidMutation } = usePosts()
    const { mutateAsync } = getMakeBidMutation({
      onSuccess: () => {
        setIsPriceModalOpen(false)
        reset()
        alert("Lance feito com sucesso.")
      },
    })

    const { post } = usePost()

    if (!post) throw new Error("Post wasn't found.")

    const submitHandler: SubmitHandler<MakeBidForm> = async form => {
      await mutateAsync({
        form,
        subject: { postId: post.id },
      })
    }

    React.useEffect(() => {
      setHasDocument(true)
    })

    const openChangeHandler = (isOpen: boolean) => () => {
      if (isOpen && status === "unauthenticated") signIn()
      return isOpen
    }

    return (
      <Dialog.Root
        open={status === "authenticated" && isPriceModalOpen}
        onOpenChange={isOpen => setIsPriceModalOpen(openChangeHandler(isOpen))}
      >
        <Dialog.Trigger asChild>{children}</Dialog.Trigger>
        {hasDocument
          ? ReactDOM.createPortal(
              <Dialog.Content
                {...props}
                className={cn("fixed inset-0 grid place-items-center", props.className)}
                ref={ref}
              >
                <Dialog.Overlay className="inset-0 bg-black/40 fixed backdrop-blur-sm" />
                <form
                  onSubmit={handleSubmit(submitHandler)}
                  className="z-10 rounded-lg bg-white p-6 max-w-[520px] w-full shadow-lg shadow-black/40 leading-none"
                >
                  <label
                    htmlFor="number"
                    className="font-semibold block mb-1"
                  >
                    Valor do lance
                  </label>

                  <div className="w-full bg-white border border-neutral-400 px-3 py-3 rounded-lg focus:outline-1 focus:outline-offset-1 focus:outline-blue-600 focus:outline-double flex gap-2 items-center leading-none mb-4">
                    <span className="text-neutral-500">R$</span>
                    <input
                      type="number"
                      placeholder="Qual o valor do seu lance?"
                      {...register("value")}
                      step="0.01"
                      className="border-none outline-none w-full h-full"
                    />
                    {formErrors.value && (
                      <span className="font-medium text-red-400">{formErrors.value?.message}</span>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        className="py-3 rounded-lg px-5 bg-black text-white flex items-center justify-center"
                      >
                        Fechar
                      </button>
                    </Dialog.Close>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={clsx(
                        "py-3 rounded-lg px-5 bg-emerald-500 text-white flex items-center justify-center",
                        { "bg-emerald-600 text-neutral-300": isSubmitting }
                      )}
                    >
                      {isSubmitting ? "Enviando" : "Enviar"}
                    </button>
                  </div>
                </form>
              </Dialog.Content>,
              document.getElementById("portal")!
            )
          : null}
      </Dialog.Root>
    )
  }
)

MakeBidModal.displayName = "MakeBidModal"
