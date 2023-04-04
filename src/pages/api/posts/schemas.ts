import { z } from "zod"

export const mediasPostSchema = z.array(
  z
    .string({
      required_error: "Insira um valor válido.",
      invalid_type_error: "Insira URL's válidas.",
    })
    .url("Insira URL's válidas.")
)

export const newPostSchema = z.object({
  title: z
    .string({
      required_error: "Insira um valor válido.",
      invalid_type_error: "Insira um título válido.",
    })
    .min(10, "Preencha o campo com mais informações.")
    .max(90, "Limite de caracteres excedido."),
  text: z
    .string({
      required_error: "Insira um valor válido.",
      invalid_type_error: "Insira uma descrição válida.",
    })
    .min(10, "Preencha o campo com mais informações.")
    .max(260, "Limite de caracteres excedido."),
  medias_url: mediasPostSchema,
  price: z
    .string({
      required_error: "Insira um valor válido.",
      invalid_type_error: "Insira um preço válido.",
    })
    .transform(Number)
    .refine(old => old < 0, "Preço precisa ser um valor positivo."),
  announcement_date: z
    .date({
      required_error: "Insira um valor válido.",
      invalid_type_error: "Insira uma data válida.",
    })
    .min(
      new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      "A data de encerramento do anúncio deve ser pelo menos daqui a 3 dias."
    )
    .max(
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      "A data de encerramento do anúncio deve ser pelo menos dentro de 1 mês."
    ),
})

export type TNewPostBody = z.input<typeof newPostSchema>
