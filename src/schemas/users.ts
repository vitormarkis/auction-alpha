import { z } from "zod"

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  image: z.string().url().nullable(),
})

export const userRegisterSchemaClient = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine(({ confirmPassword, password }) => password === confirmPassword, {
    message: "As senhas não coincidem.",
  })
  .transform(({ confirmPassword, ...rest }) => rest)

export const userRegisterSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const sessionUserSchema = z.object({
  id: userSchema.shape.id,
  name: userSchema.shape.name,
  email: userSchema.shape.email,
  image: userSchema.shape.image,
})

export const userBidsSchema = z.object({
  id: z.string(),
  value: z.number(),
  post_id: z.string(),
  post: z.object({
    announcement_date: z.string(),
  }),
})

export type IUserSession = z.infer<typeof userSchema>
export type IUserRegisterInput = z.input<typeof userRegisterSchemaClient>
export type IUserRegister = z.output<typeof userRegisterSchemaClient>
export type IUserLogin = z.output<typeof userLoginSchema>
export type IUserBids = z.output<typeof userBidsSchema>
