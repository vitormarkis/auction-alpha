"use client"

import * as Dialog from "@radix-ui/react-dialog"
import ReactDOM from "react-dom"
import React, { HTMLAttributes } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { IBidBody, bidSchema } from "@/schemas/posts"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { api_endpoint, useURL } from "@/CONSTANTS"

interface Props extends HTMLAttributes<HTMLButtonElement> {
  postId: string
  userId?: string | undefined
}

export function MakeBidButton({ postId, className, userId, ...rest }: Props) {
  const [isPriceModalOpen, setIsPriceModalOpen] = React.useState(false)
  const { register, reset, handleSubmit } = useForm<IBidBody>()
  const [hasDocument, setHasDocument] = React.useState(false)

  const submitHandler: SubmitHandler<IBidBody> = async formData => {
    const { post_id, value } = bidSchema.parse({ ...formData, post_id: postId })

    const headers = new Headers()
    headers.append("Content-Type", "application/json")

    await fetch(useURL("/api/posts/bids"), {
      headers,
      method: "POST",
      body: JSON.stringify({ post_id, value }),
    })

    setIsPriceModalOpen(false)
    reset()
    alert("Lance feito com sucesso.")
  }

  React.useEffect(() => {
    setHasDocument(true)
  })

  return (
    <Dialog.Root
      open={Boolean(userId && isPriceModalOpen)}
      onOpenChange={setIsPriceModalOpen}
    >
      <Dialog.Trigger asChild>
        <button
          onClick={() => {
            if (!userId) signIn()
          }}
          className={`bg-black py-3 text-white rounded-lg focus:outline-1 focus:outline-offset-1 focus:outline-blue-500 focus:outline-double border border-black ${className}`}
          {...rest}
        >
          Fazer uma proposta
        </button>
      </Dialog.Trigger>
      {hasDocument
        ? ReactDOM.createPortal(
            <Dialog.Content>
              <Dialog.Overlay className="w-screen h-screen inset-0 bg-black/40 fixed" />
              <div className="absolute flex items-center justify-center w-screen h-screen inset-0">
                <form
                  onSubmit={handleSubmit(submitHandler)}
                  className="rounded-lg bg-white p-6 max-w-[520px] w-full shadow-lg shadow-black/40 leading-none"
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
                      className="py-3 rounded-lg px-5 bg-emerald-500 text-white flex items-center justify-center"
                    >
                      Enviar
                    </button>
                  </div>
                </form>
              </div>
            </Dialog.Content>,
            document.getElementById("portal")!
          )
        : null}
    </Dialog.Root>
  )
}
