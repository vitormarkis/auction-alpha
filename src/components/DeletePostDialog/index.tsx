import * as Dialog from "@radix-ui/react-dialog"
import React from "react"
import ReactDOM from "react-dom"
import { IPostFeed } from "@/schemas/posts"

const DeletePostDialog: React.FC<{ children: React.ReactNode; post: IPostFeed }> = ({ children, post }) => {
  const [hasDocument, setHasDocument] = React.useState(false)

  React.useEffect(() => {
    setHasDocument(true)
  })

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      {hasDocument &&
        ReactDOM.createPortal(
          <Dialog.Content className="absolute flex items-center justify-center w-screen h-screen inset-0">
            <Dialog.Overlay className="z-10 w-screen h-screen inset-0 bg-black/40 fixed" />
            <div className="leading-none z-10 p-4 rounded-lg bg-white max-w-[520px] w-full flex flex-col border border-stone-300 shadow-lg">
              <div className="mb-4 flex flex-col">
                <h1 className="mb-0.5 text-xl font-medium text-stone-800">Excluir post</h1>
                <p className="mb-3 text-stone-600">
                  Tem certeza que deseja excluir seu post permanentemente?
                </p>
                <p className="bg-neutral-200 px-3 py-1.5 rounded-lg text-zinc-800 text-sm">{post.title}</p>
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
                  className="py-3 rounded-lg px-5 bg-red-500 text-white flex items-center justify-center"
                >
                  Excluir
                </button>
              </div>
            </div>
          </Dialog.Content>,
          document.getElementById("portal")!
        )}
    </Dialog.Root>
  )
}

export default DeletePostDialog
