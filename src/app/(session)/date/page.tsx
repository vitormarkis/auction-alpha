"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"

export default function () {
  const { register, handleSubmit } = useForm<{ price: number }>()

  const apiRes = {
    price: 500,
  }

  function createSchema(bidPrice: number) {
    return z.object({
      price: z.coerce
        .number()
        .refine(price => bidPrice < price, "O preço precisa ser maior que o preço original."),
    })
  }

  const submitHandler: SubmitHandler<{ price: number }> = async formData => {
    const schema = createSchema(apiRes.price)
    const res = schema.safeParse(formData)
    if (res.success) {
      console.log("Aprovado")
    } else {
      console.log("Reprovado")
    }
  }

  return (
    <div className="border-x border-neutral-400 max-w-[560px] w-full mx-auto">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col gap-3 p-6 border-b border-neutral-400"
      >
        <input
          type="number"
          placeholder="R$200"
          {...register("price")}
          className="p-2 leading-none mb-1 bg-zinc-700 placeholder:text-zinc-400 rounded-lg text-white"
        />
        <button
          type="submit"
          className="p-2 bg-green-600 text-white rounded-lg"
        >
          Enviar
        </button>
      </form>
    </div>
  )
}
