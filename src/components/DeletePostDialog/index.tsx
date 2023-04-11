import * as Dialog from "@radix-ui/react-dialog"
import React from "react"
import ReactDOM from "react-dom"

const DeletePostDialog: React.FC<{ children: React.ReactNode, postId: string }> = ({ children, postId }) => {
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
            <div className="z-10 p-3 rounded-lg bg-white flex flex-col border border-stone-300 shadow-lg">
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
                  className="py-3 rounded-lg px-5 bg-black text-white flex items-center justify-center"
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
