"use client"

import * as Dialog from "@radix-ui/react-dialog"
import ReactDOM from "react-dom"
import React from "react"

export function MakeBidButton() {
  const [hasDocument, setHasDocument] = React.useState(false)

  React.useEffect(() => {
    setHasDocument(true)
  })

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-black py-3 text-white rounded-lg focus:outline-1 focus:outline-offset-1 focus:outline-blue-500 focus:outline-double border border-black">
          Fazer uma proposta
        </button>
      </Dialog.Trigger>
      {hasDocument
        ? ReactDOM.createPortal(
            <Dialog.Content>
              <Dialog.Overlay className="w-screen h-screen inset-0 bg-black/40" />
              <div className="absolute flex items-center justify-center w-screen h-screen inset-0">
                <div className="rounded-lg bg-neutral-300 p-6">oi</div>
              </div>
            </Dialog.Content>,
            document.getElementById("portal")!
          )
        : null}
    </Dialog.Root>
  )
}
