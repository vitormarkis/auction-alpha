import dayjs from "dayjs"
import { z } from "zod"
import { uploadFileResponseSchema } from "@/schemas/uploadFileResponseSchema"

export const createPostFormSchema = z.object({
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
  medias_url: z
    .array(uploadFileResponseSchema)
    .min(1, "Escolha pelo menos uma imagem para seu post."),
  price: z
    .string()
    .transform(Number)
    .refine(val => val > 0, "O preço precisa ser um valor positivo."),
  announcement_date: z
    .date()
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
  // announcement_date: z
  //   .string({
  //     required_error: "Insira uma data válida.",
  //     invalid_type_error: "Insira uma data válida.",
  //   })
  //   .transform(string => new Date(string))
  //   .refine(date => {
  //     const upcomingDate = dayjs(date).add(1, "day").startOf("day")
  //     const comparison = dayjs().add(3, "day").startOf("day")

  //     return comparison.isBefore(upcomingDate) || comparison.isSame(upcomingDate)
  //   }, "A data de encerramento do anúncio deve ser pelo menos daqui a 3 dias.")
  //   .refine(date => {
  //     const upcomingDate = dayjs(date).add(1, "day").startOf("day")
  //     const comparison = dayjs().add(30, "day").startOf("day")

  //     return comparison.isAfter(upcomingDate) || comparison.isSame(upcomingDate)
  //   }, "A data de encerramento do anúncio deve ser pelo menos dentro de 1 mês."),
})

export type CreatePostFormInput = z.input<typeof createPostFormSchema>
export type CreatePostForm = z.output<typeof createPostFormSchema>
