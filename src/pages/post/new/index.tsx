import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

type MediaString = Record<string, string>

const mediasPostSchema = z.array(z.string())

const newPostSchema = z.object({
  title: z.string(),
  text: z.string(),
  medias_url: mediasPostSchema,
})

type TNewPostBody = z.input<typeof newPostSchema>

const NewPost: React.FC = () => {
  const { register, handleSubmit } = useForm<TNewPostBody>()
  const [mediaInput, setMediaInput] = useState<MediaString[]>([
    {
      initial: "",
    },
  ])

  const submitHandler: SubmitHandler<TNewPostBody> = async formData => {
    const arrMediasURL = mediaInput.map(inp => Object.values(inp)[0])
    const { medias_url, text, title } = newPostSchema.parse({ ...formData, medias_url: arrMediasURL })
    console.log({ medias_url, text, title })
  }

  const maxInputs = 5

  const rand = () => {
    return Math.random().toString(36).substring(2, 9)
  }

  const handleNewMediaInputRow = () => {
    if (mediaInput.length >= maxInputs) return
    setMediaInput(old => [...old, { [rand()]: "" }])
  }

  const handleDeleteMediaInputRow = (mediaString: MediaString) => {
    const [key] = Object.entries(mediaString)[0]

    setMediaInput(old =>
      old.filter(oldObj => {
        return !(key in oldObj)
      })
    )
  }

  return (
    <div
      className="mx-auto min-h-screen w-full max-w-[680px] bg-gray-200 p-6 
    [&_textarea]:border [&_textarea]:border-black
    [&_input]:border [&_input]:border-black
    "
    >
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col gap-3"
      >
        <input
          type="text"
          {...register("title")}
          placeholder="title"
        />
        <textarea
          {...register("text")}
          placeholder="text"
        />
        <div>
          {mediaInput.map(obj => {
            const [key] = Object.entries(obj)[0]

            const { [key]: value } = mediaInput.find(arrObj => {
              return key in arrObj
            })

            const lastInput = mediaInput.at(-1)[key]

            return (
              <div
                key={key}
                className="flex flex-row gap-2"
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
                />
                {mediaInput.length === 1 && lastInput.length === 0 ? (
                  <></>
                ) : lastInput?.length > 0 && mediaInput.length !== maxInputs ? (
                  <>
                    <RowButton
                      mediaString={obj}
                      onClickHandle={handleNewMediaInputRow}
                      content="Adicionar"
                    />
                    {mediaInput.length > 1 && mediaInput.length <= maxInputs && (
                      <RowButton
                        mediaString={obj}
                        onClickHandle={handleDeleteMediaInputRow}
                        content="Remover"
                      />
                    )}
                  </>
                ) : (
                  <RowButton
                    mediaString={obj}
                    onClickHandle={handleDeleteMediaInputRow}
                    content="Remover"
                  />
                )}

                <pre>{JSON.stringify(obj, null)}</pre>
              </div>
            )
          })}
        </div>
        <button
          className="bg-emerald-500 text-center text-white p-2"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  )
}

interface RowButtonProps {
  onClickHandle: (mediaString?: MediaString) => void
  mediaString: MediaString
  content: string
}

const RowButton: React.FC<RowButtonProps> = ({ onClickHandle, mediaString, content }) => (
  <button
    type="button"
    onClick={() => onClickHandle(mediaString)}
  >
    {content}
  </button>
)

export default NewPost
