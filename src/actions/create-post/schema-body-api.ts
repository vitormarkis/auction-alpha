import { z } from "zod"
import { CreatePostFormOutput, createPostFormSchema } from "@/actions/create-post/schema-form"

export const createPostAPIBodySchema = z.object({
  title: z
    .string()
    .min(10, "[SERVER] Preencha o campo título com mais informações.")
    .max(90, "[SERVER] Limite de caracteres excedido no campo título."),
  text: z
    .string()
    .min(10, "[SERVER] Preencha o campo descrição com mais informações.")
    .max(5000, "[SERVER] Limite de caracteres excedido no campo descrição."),
  medias_url: z.array(z.string().url()),
  price: z.number().positive(),
  announcement_date: z.coerce.string(),
}) as z.Schema<CreatePostFormOutput>

export type CreatePostAPIBody = z.input<typeof createPostAPIBodySchema>
