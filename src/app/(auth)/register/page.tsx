"use client"

import { IUserRegisterInput, userRegisterSchemaClient } from "@/schemas/users"
import { api } from "@/services/api"
import { Github, Google } from "@styled-icons/boxicons-logos"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form"

export default function Register() {
  const { handleSubmit, reset, register } = useForm<IUserRegisterInput>()

  const handleSignIn = (provider: string) => () => {
    try {
      signIn(provider, { redirect: true, callbackUrl: "/" })
    } catch (e) {
      console.log(e)
    }
  }

  const submitHandler: SubmitHandler<IUserRegisterInput> = async formData => {
    try {
      const { email, name, password } = userRegisterSchemaClient.parse(formData)
      await api.post("/users", { email, name, password })
      await signIn("credentials", { email, password, redirect: true, callbackUrl: "/" })
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="h-screen bg-gray-900 flex flex-col justify-center items-center overflow-hidden">
      <div className="p-5 rounded-lg shadow-md shadow-black/20 bg-white w-[520px]">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col"
        >
          <div className="mb-3">
            <h1 className="text-2xl font-bold">Crie sua conta</h1>
            <p className="text-gray-400 leading-5 text-sm">
              Insira seus dados e conclua o registro para continuar a ver a aplicação.
            </p>
          </div>

          <label className="mb-1 text-gray-700">Seu nome</label>
          <input
            className="mb-2 bg-white border border-gray-400 px-3 py-3 rounded-lg focus:outline-1 focus:outline-offset-1 focus:outline-green-500 focus:outline-double"
            type="text"
            {...register("name")}
            placeholder="Escreva seu nome..."
          />
          <label className="mb-1 text-gray-700">Seu e-mail</label>
          <input
            className="mb-2 bg-white border border-gray-400 px-3 py-3 rounded-lg focus:outline-1 focus:outline-offset-1 focus:outline-green-500 focus:outline-double"
            type="email"
            {...register("email")}
            placeholder="seunome@gmail.com"
          />
          <label className="mb-1 text-gray-700">Sua senha</label>
          <input
            className="mb-2 bg-white border border-gray-400 px-3 py-3 rounded-lg focus:outline-1 focus:outline-offset-1 focus:outline-green-500 focus:outline-double"
            type="password"
            {...register("password")}
            placeholder="Escreva sua senha..."
          />
          <label className="mb-1 text-gray-700">Confirme sua senha</label>
          <input
            className="mb-2 bg-white border border-gray-400 px-3 py-3 rounded-lg focus:outline-1 focus:outline-offset-1 focus:outline-green-500 focus:outline-double"
            type="password"
            {...register("confirmPassword")}
            placeholder="Repita sua senha..."
          />

          <p className="text-gray-700 my-3">
            Já possui uma conta?{" "}
            <Link
              href="/signin"
              className="underline text-blue-500 cursor-pointer"
            >
              Entrar
            </Link>
          </p>

          <button className="bg-green-500 py-3 text-white rounded-lg focus:outline-1 focus:outline-offset-1 focus:outline-green-500 focus:outline-double">
            Registrar
          </button>

          <div className="flex gap-3 text-gray-700 my-3">
            <div className="h-[1px] w-full my-3 border-b border-b-gray-400" />
            <p className="whitespace-nowrap">Ou faça login com</p>
            <div className="h-[1px] w-full my-3 border-b border-b-gray-400" />
          </div>

          <div className="text-gray-700 flex gap-3">
            <button
              type="button"
              onClick={handleSignIn("google")}
              className="focus:outline-1 focus:outline-offset-1 focus:outline-green-500 focus:outline-double p-1 border relative h-12 border-gray-400 flex items-center justify-center rounded-lg grow"
            >
              <Google
                className="absolute left-1 top-1/2 -translate-y-1/2"
                width={32}
                height={32}
              />
              <p>Google</p>
            </button>
            <button
              onClick={handleSignIn("github")}
              type="button"
              className="focus:outline-1 focus:outline-offset-1 focus:outline-green-500 focus:outline-double p-1 border relative h-12 border-gray-400 flex items-center justify-center rounded-lg grow"
            >
              <Github
                className="absolute left-1 top-1/2 -translate-y-1/2"
                width={32}
                height={32}
              />
              <p>Github</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
