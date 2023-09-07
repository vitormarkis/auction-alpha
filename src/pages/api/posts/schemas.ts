import dayjs from "dayjs"
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
    .min(10, "Preencha o campo título com mais informações.")
    .max(90, "Limite de caracteres excedido no campo título."),
  text: z
    .string({
      required_error: "Insira um valor válido no campo descrição.",
      invalid_type_error: "Insira uma descrição válida.",
    })
    .min(10, "Preencha o campo descrição com mais informações.")
    .max(5000, "Limite de caracteres excedido no campo descrição."),
  medias_url: mediasPostSchema,
  price: z
    .string({
      required_error: "Insira um preço válido.",
      invalid_type_error: "Insira um preço válido.",
    })
    .transform(Number)
    .refine(old => old > 0, "O preço precisa ser um valor positivo."),
  announcement_date: z
    .string({
      required_error: "Insira uma data válida.",
      invalid_type_error: "Insira uma data válida.",
    })
    .transform(string => new Date(string))
    .refine(date => {
      const upcomingDate = dayjs(date).add(1, "day").startOf("day")
      const comparison = dayjs().add(3, "day").startOf("day")

      return comparison.isBefore(upcomingDate) || comparison.isSame(upcomingDate)
    }, "A data de encerramento do anúncio deve ser pelo menos daqui a 3 dias.")
    .refine(date => {
      const upcomingDate = dayjs(date).add(1, "day").startOf("day")
      const comparison = dayjs().add(30, "day").startOf("day")

      return comparison.isAfter(upcomingDate) || comparison.isSame(upcomingDate)
    }, "A data de encerramento do anúncio deve ser pelo menos dentro de 1 mês."),
})

export type TNewPostBody = z.input<typeof newPostSchema>
export type TNewPostBodyOutput = z.output<typeof newPostSchema>
