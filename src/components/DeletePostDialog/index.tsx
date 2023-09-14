import { PostSession } from "@/requests/get-posts/getPosts"
import * as Dialog from "@radix-ui/react-dialog"
import { useMutation } from "@tanstack/react-query"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import React, { Dispatch, SetStateAction } from "react"
import ReactDOM from "react-dom"

interface Props {
  children: React.ReactNode
  post: PostSession
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  redirect?: string | undefined
}

const DeletePostDialog: React.FC<Props> = ({ children, post, setIsModalOpen, redirect }) => {
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  const router = useRouter()

  const [hasDocument, setHasDocument] = React.useState(false)

  const { mutate, isLoading } = useMutation({
    mutationFn: async (postId: string) => {
      const response = await fetch("/api/posts", {
        headers,
        method: "DELETE",
        body: JSON.stringify({ postId }),
      })

      if (!response.ok) throw new Error("Something went wrong during the deletion of the post.")

      const data = await response.json()
      return data
    },
    onSuccess: () => {
      if (redirect) {
        router.push(redirect)
      } else {
        router.refresh()
      }
      setIsModalOpen(false)
      alert("Post excluido com sucesso.")
    },
    onError: (...args) => {
      setIsModalOpen(false)
      alert("ERRO: Algo deu errado durante a exclusão do post.")
    },
  })

  React.useEffect(() => {
    setHasDocument(true)
  })

  if (hasDocument) {
    ReactDOM.createPortal(
      <Dialog.Content className="absolute flex items-center justify-center w-screen h-screen inset-0">
        <Dialog.Overlay className="z-10 w-screen h-screen inset-0 bg-black/40 fixed" />
        <div className="leading-none z-10 p-4 rounded-lg bg-white max-w-[520px] w-full flex flex-col border border-stone-300 shadow-lg">
          <div className="mb-4 flex flex-col">
            <h1 className="mb-0.5 text-xl font-medium text-stone-800">Excluir post</h1>
            <p className="mb-3 text-stone-600">
              Tem certeza que deseja excluir seu post permanentemente?
            </p>
            <p className="bg-neutral-200 px-3 py-1.5 rounded-lg text-zinc-800 text-sm">
              {post.title}
            </p>
          </div>
          <div className="flex justify-between">
            <Dialog.Close asChild>
              <button
                type="button"
                className="py-3 rounded-lg px-5 bg-black text-white flex items-center justify-center"
              >
                Voltar
              </button>
            </Dialog.Close>
            <button
              type="button"
              disabled={isLoading}
              className={clsx(
                "py-3 rounded-lg px-5 bg-red-500 text-white flex items-center justify-center",
                {
                  "bg-red-600 text-red-300": isLoading,
                }
              )}
              onClick={() => mutate(post.id)}
            >
              {isLoading ? "Excluindo" : "Excluir"}
            </button>
          </div>
        </div>
      </Dialog.Content>,
      document.getElementById("portal")!
    )
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
    </Dialog.Root>
  )
}

export default DeletePostDialog
