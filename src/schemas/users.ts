import { z } from "zod"

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  name: z.string(),
  age: z.number(),
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

export type IUserRegisterInput = z.input<typeof userRegisterSchemaClient>
export type IUserRegister = z.output<typeof userRegisterSchemaClient>
