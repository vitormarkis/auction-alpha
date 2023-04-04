"use client"

import { newPostSchema, TNewPostBody } from "@/pages/api/posts/schemas"
import { api } from "@/services/api"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Plus } from "@styled-icons/boxicons-regular/Plus"
import { Minus } from "@styled-icons/boxicons-regular/Minus"
import clsx from "clsx"

type MediaString = Record<string, string>

const NewPost: React.FC = () => {
  const { register, handleSubmit } = useForm<TNewPostBody>()
  const [mediaInput, setMediaInput] = useState<MediaString[]>([
    {
      initial: "",
    },
  ])

  const submitHandler: SubmitHandler<TNewPostBody> = async formData => {
    const arrMediasURL = mediaInput.map(inp => Object.values(inp)[0])
    const { medias_url, text, title, price } = newPostSchema.parse({ ...formData, medias_url: arrMediasURL })
    await api.post("/posts", { medias_url, text, title, price })
    console.log({ medias_url, text, title, price })
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

  const handleClick = () => {
    api.get("/me").then(res => console.log(res.data))
  }

  return (
    <div className="w-full max-w-[560px] h-full bg-white border-x border-x-neutral-400 mx-auto">
      <div className="p-6 border-b border-neutral-400 flex items-center justify-between">
        <button className="py-1.5 rounded-lg pr-6 pl-4 bg-black text-white flex items-center ">
          {/* <Poll
            width={16}
            height={16}
          /> */}
          <p className="ml-2">Voltar</p>
        </button>
        <button
          className="py-1.5 rounded-lg pr-6 pl-4 bg-emerald-500 text-white flex items-center "
          type="submit"
          form="new_post_form"
        >
          Publicar
        </button>
      </div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col gap-3 p-6 border-b border-neutral-400"
        id="new_post_form"
      >
        <input
          className="mb-2 bg-white border border-neutral-400 px-3 py-3 rounded-lg focus:outline-1 focus:outline-offset-1 focus:outline-blue-600 focus:outline-double"
          type="title"
          {...register("title")}
          placeholder="Insira o título do seu post aqui..."
        />
        <textarea
          className="mb-2 bg-white border border-neutral-400 px-3 py-3 rounded-lg focus:outline-1 focus:outline-offset-1 focus:outline-blue-600 focus:outline-double"
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
                  className="w-full bg-white border border-neutral-400 px-3 py-3 rounded-lg focus:outline-1 focus:outline-offset-1 focus:outline-blue-600 focus:outline-double"
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
        <input
          type="number"
          step="0.01"
          {...register("price")}
          placeholder="price"
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
