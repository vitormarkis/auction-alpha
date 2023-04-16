"use client"

import { newPostSchema, TNewPostBody } from "@/pages/api/posts/schemas"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Plus } from "@styled-icons/boxicons-regular/Plus"
import { Minus } from "@styled-icons/boxicons-regular/Minus"
import clsx from "clsx"
import { useLimitedInput } from "./hook"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "@/services/queryClient"

type MediaString = Record<string, string>

const NewPost: React.FC = () => {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [price, setPrice, handlePrice] = useLimitedInput("", 2)
  const { register, handleSubmit, reset } = useForm<TNewPostBody>()
  const [mediaInput, setMediaInput] = useState<MediaString[]>([
    {
      initial: "",
    },
  ])

  const { mutate, status, isLoading } = useMutation({
    mutationFn: async (newPostData: TNewPostBody) => {
      const headers = new Headers()
      headers.append("Content-Type", "application/json")

      const res = await fetch(`/api/posts`, {
        headers,
        method: "POST",
        body: JSON.stringify(newPostData),
      })
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"])
      reset()
      setMediaInput([
        {
          initial: "",
        },
      ])
      setPrice("")
      setError(null)
      setSuccess(
        "Seu post foi criado com sucesso, ele foi enviado para ser aprovado por algum administrador e logo estará no ar."
      )
    },
  })

  const submitHandler: SubmitHandler<TNewPostBody> = async formData => {
    try {
      const arrMediasURL = mediaInput.map(inp => Object.values(inp)[0])
      const fullFormData = {
        ...formData,
        medias_url: arrMediasURL,
      }
      newPostSchema.parse(fullFormData)
      mutate(fullFormData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const [issue] = error.issues
        setSuccess(null)
        setError(issue.message)
      }
    }
  }

  const maxInputs = 5

  const rand = () => {
    return Math.random().toString(36).substring(2, 9)
  }

  const handleNewMediaInputRow = () => {
    if (mediaInput.length >= maxInputs) return
    setMediaInput(old => [...old, { [rand()]: "" }])
  }

  const handleDeleteMediaInputRow = (mediaString?: MediaString) => {
    const [key] = Object.entries(mediaString ?? {})[0]

    setMediaInput(old =>
      old.filter(oldObj => {
        return !(key in oldObj)
      })
    )
  }

  return (
    <div className="w-full max-w-[560px] h-[calc(100dvh_-_52px)] overflow-y-scroll bg-white mx-auto scroll-thin">
      <div className="p-6 flex items-center justify-between">
        <button className="py-1.5 rounded-lg px-5 bg-black text-white flex items-center justify-center">
          <span>Voltar</span>
        </button>
        <button
          className={clsx(
            "py-1.5 rounded-lg px-5 bg-emerald-500 text-white flex items-center justify-center",
            {
              "bg-emerald-600 text-neutral-300": isLoading,
            }
          )}
          type="submit"
          form="new_post_form"
          disabled={isLoading}
        >
          <span>{isLoading ? "Publicando" : "Publicar"}</span>
        </button>
      </div>
      {error ? (
        <div className="p-6 flex items-center justify-center">
          <p className="p-3 rounded-lg font-semibold d-300 bg-red-200 text-red-500">{error}</p>
        </div>
      ) : success ? (
        <div className="p-6 flex items-center justify-center">
          <p className="p-3 rounded-lg font-semibold erald-200 bg-emerald-100 text-emerald-500">{success}</p>
        </div>
      ) : null}
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col gap-3 p-6"
        id="new_post_form"
      >
        <input
          className="border-neutral-500 border mb-2 bg-white px-3 py-3 rounded-lg focus:outline-1 focus:outline-offset-1 focus:outline-blue-600 focus:outline-double"
          type="title"
          {...register("title")}
          placeholder="Insira o título do seu post aqui..."
        />
        <textarea
          className="border-neutral-500 border mb-2 bg-white px-3 py-3 rounded-lg focus:outline-1 focus:outline-offset-1 focus:outline-blue-600 focus:outline-double"
          {...register("text")}
          placeholder="Descrição do seu post..."
        />
        <div>
          {mediaInput.map(obj => {
            const [key] = Object.entries(obj)[0]

            const { [key]: value } = mediaInput.find(arrObj => {
              return key in arrObj
            })!

            const lastInput = mediaInput.at(-1)?.[key] ?? ""

            return (
              <div
                key={key}
                className="flex flex-row gap-2 mb-2"
              >
                <input
                  type="text"
                  placeholder="URL da mídia..."
                  value={value}
                  onChange={e =>
                    setMediaInput(old =>
                      old.map(oldObj => (key in oldObj ? { ...oldObj, [key]: e.target.value } : oldObj))
                    )
                  }
                  className="border-neutral-500 border w-full bg-white px-3 py-3 rounded-lg focus:outline-1 focus:outline-offset-1 focus:outline-blue-600 focus:outline-double"
                />
                <div className="flex justify-center gap-2">
                  {mediaInput.length === 1 && lastInput.length === 0 ? (
                    <></>
                  ) : lastInput?.length > 0 && mediaInput.length !== maxInputs ? (
                    <>
                      <RowButton
                        mediaString={obj}
                        onClickHandle={handleNewMediaInputRow}
                        action="add"
                      />
                      {mediaInput.length > 1 && mediaInput.length <= maxInputs && (
                        <RowButton
                          mediaString={obj}
                          onClickHandle={handleDeleteMediaInputRow}
                          action="remove"
                        />
                      )}
                    </>
                  ) : (
                    <RowButton
                      mediaString={obj}
                      onClickHandle={handleDeleteMediaInputRow}
                      action="remove"
                    />
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <div className="border-neutral-500 border w-full bg-white px-3 py-3 rounded-lg focus:outline-1 focus:outline-offset-1 focus:outline-blue-600 focus:outline-double flex gap-2 items-center leading-none">
          <span className="text-neutral-500">R$</span>
          <input
            type="number"
            step="0.01"
            {...register("price")}
            value={price}
            onChange={handlePrice}
            placeholder="299,90"
            className="border-none outline-none w-full h-full"
          />
        </div>
        <input
          className="border-neutral-500 border mb-2 bg-white px-3 py-3 rounded-lg focus:outline-1 focus:outline-offset-1 focus:outline-blue-600 focus:outline-double"
          type="date"
          {...register("announcement_date")}
          // placeholder="Insira o título do seu post aqui..."
        />
      </form>
    </div>
  )
}

type RowButtonPropsAction = "add" | "remove"

interface RowButtonProps {
  onClickHandle: (mediaString?: MediaString) => void
  mediaString: MediaString
  action: RowButtonPropsAction
}

const RowButton: React.FC<RowButtonProps> = ({ onClickHandle, mediaString, action }) => {
  const isAdd = action === "add"
  const iconProps = {
    width: 16,
    height: 16,
  }

  const icon: Record<RowButtonPropsAction, JSX.Element> = {
    add: <Plus {...iconProps} />,
    remove: <Minus {...iconProps} />,
  }

  return (
    <button
      type="button"
      onClick={() => (mediaString ? onClickHandle(mediaString) : onClickHandle())}
      className={clsx("p-2 rounded-lg flex items-center leading-none justify-center", {
        "bg-emerald-100 text-emerald-500": isAdd,
        "bg-red-100 text-red-500": !isAdd,
      })}
    >
      <p className="my-auto">{icon[action]}</p>
    </button>
  )
}

export default NewPost
