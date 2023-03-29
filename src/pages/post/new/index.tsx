import { useState } from "react"
import { useForm } from "react-hook-form"

const NewPost: React.FC = () => {
  const { register } = useForm()
  const [mediaInput, setMediaInput] = useState<Record<string, string>[]>([
    {
      initial: "",
    },
  ])

  const maxInputs = 5

  const rand = () => {
    return Math.random().toString(36).substring(2, 9)
  }

  const handleAddNewMediaInput = () => {
    if (mediaInput.length >= maxInputs) return
    setMediaInput((old) => [...old, { [rand()]: "" }])
  }

  return (
    <div
      className="mx-auto min-h-screen w-full max-w-[680px] bg-gray-200 p-6 
    [&_textarea]:border [&_textarea]:border-black
    [&_input]:border [&_input]:border-black
    "
    >
      <form className="flex flex-col gap-3">
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
          {mediaInput.map((obj, idx, arr) => {
            const isLast = idx === arr.length - 1

            const [key] = Object.entries(obj)[0]

            const { [key]: value } = mediaInput.find((arrObj) => {
              return key in arrObj
            })

            const lastInput = mediaInput.at(-1)[key]

            return (
              <div
                key={key}
                className="flex flex-row gap-2"
              >
                <input
                  // {...register(`media-${idx}`)}
                  type="text"
                  placeholder="URL da mídia..."
                  value={value}
                  onChange={(e) =>
                    setMediaInput((old) =>
                      old.map((oldObj) => (key in oldObj ? { ...oldObj, [key]: e.target.value } : oldObj))
                    )
                  }
                />
                {mediaInput.length === 1 && lastInput.length === 0 ? (
                  <></>
                ) : lastInput?.length > 0 && mediaInput.length !== maxInputs ? (
                  <>
                    <button
                      type="button"
                      onClick={handleAddNewMediaInput}
                    >
                      Adicionar
                    </button>
                    {mediaInput.length > 1 && mediaInput.length <= maxInputs && (
                      <button
                        type="button"
                        onClick={() => {
                          const [key] = Object.entries(obj)[0]

                          setMediaInput((old) =>
                            old.filter((oldObj) => {
                              return !(key in oldObj)
                            })
                          )
                        }}
                      >
                        Remover
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const [key] = Object.entries(obj)[0]

                      setMediaInput((old) =>
                        old.filter((oldObj) => {
                          return !(key in oldObj)
                        })
                      )
                    }}
                  >
                    Remover
                  </button>
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

export default NewPost
