import { IUserLogin, userLoginSchema } from "@/schemas/users"
import { Github, Google } from "@styled-icons/boxicons-logos"
import { GetServerSideProps } from "next"
import { getCsrfToken, signIn } from "next-auth/react"
import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form"

export const getServerSideProps: GetServerSideProps = async ctx => {
  const csrfToken = await getCsrfToken({
    ctx,
  })

  return {
    props: {
      csrfToken,
    },
  }
}

export default function ({ csrfToken }: { csrfToken: string }) {
  const { handleSubmit, reset, register } = useForm<IUserLogin>()

  const handleSignIn = (provider: string) => () => {
    try {
      signIn(provider, { redirect: true, callbackUrl: "/testing" })
    } catch (e) {
      console.log(e)
    }
  }

  const submitHandler: SubmitHandler<IUserLogin> = async formData => {
    try {
      const { email, password } = userLoginSchema.parse(formData)
      await signIn("credentials", { email, password, callbackUrl: "/testing", redirect: true })
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
            <h1 className="text-2xl font-bold">Faça login para continuar</h1>
            <p className="text-gray-400 leading-5 text-sm">
              Insira seus dados para continuar a ver a aplicação.
            </p>
          </div>
          <label className="mb-1 text-gray-700">Seu e-mail</label>
          <input
            className="mb-2 bg-white border border-gray-400 px-3 py-3 rounded-lg focus:outline-1 focus:outline-offset-1 focus:outline-blue-600 focus:outline-double"
            type="email"
            {...register("email")}
            placeholder="seunome@gmail.com"
          />
          <label className="mb-1 text-gray-700">Sua senha</label>
          <input
            className="mb-2 bg-white border border-gray-400 px-3 py-3 rounded-lg focus:outline-1 focus:outline-offset-1 focus:outline-blue-600 focus:outline-double"
            type="password"
            {...register("password")}
            placeholder="Escreva sua senha..."
          />

          <p className="text-gray-700 my-3">
            Ainda não possui uma conta?{" "}
            <Link
              href="/auth/register"
              className="focus:outline-1 focus:outline-offset-1 focus:outline-blue-600 focus:outline-double underline text-blue-500 cursor-pointer"
            >
              Registre-se
            </Link>
          </p>

          <button
            type="submit"
            className="bg-blue-600 py-3 text-white rounded-lg focus:outline-1 focus:outline-offset-1 focus:outline-blue-600 focus:outline-double"
          >
            Entrar
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
              className="focus:outline-1 focus:outline-offset-1 focus:outline-blue-600 focus:outline-double p-1 border relative h-12 border-gray-400 flex items-center justify-center rounded-lg grow"
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
              className="focus:outline-1 focus:outline-offset-1 focus:outline-blue-600 focus:outline-double p-1 border relative h-12 border-gray-400 flex items-center justify-center rounded-lg grow"
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
