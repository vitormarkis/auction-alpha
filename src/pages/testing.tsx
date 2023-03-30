import { api } from "@/services/api"
import { useQuery } from "@tanstack/react-query"
import { GetServerSideProps } from "next"
import { getSession, signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

export default function () {
  const { data: session } = useSession()

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => api.get("/users").then(res => res.data),
  })
  const { data: userRole } = useQuery({
    queryKey: ["userRole", session?.user?.email],
    queryFn: () => api.get("/aint").then(res => res.data),
  })

  return session ? (
    <div className="flex flex-col">
      <span>Oi {session.user?.name}</span>
      <Image
        src={session.user?.image ?? ""}
        width={56}
        height={56}
        alt={"Foto de perfil de " + session.user?.name}
      />
      <pre>{userRole && JSON.stringify(userRole, null, 2)}</pre>
      <pre>{users && JSON.stringify(users, null, 2)}</pre>
      <pre>{session && JSON.stringify(session, null, 2)}</pre>
      <button
        onClick={() => signOut({ redirect: false })}
        className="ml-auto bg-red-500 text-white p-2"
      >
        Sair
      </button>
    </div>
  ) : (
    <div>
      <span>Faça login para ver a página</span>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <div className="flex flex-col gap-2 items-start">
        <button
          onClick={() => signIn()}
          className="bg-emerald-500 text-center text-white p-2"
        >
          Entrar
        </button>
        <Link
          href="/auth/register"
          className="bg-teal-600 text-center text-white p-2"
        >
          Registrar
        </Link>
      </div>{" "}
    </div>
  )

  // console.log(users);

  // if (!session) {
  //   return (
  //     <div>
  //       <h1>Faça login para conseguir ver essa página.</h1>
  //       <button className="p-2 rounded-md border bg-green-400 text-white" onClick={() => signIn()}>
  //         Entrar
  //       </button>
  //     </div>
  //   );
  // }
  return (
    <div>
      <h1>Session</h1>
      {/* <pre className="mb-4">{JSON.stringify(session, null, 2)}</pre>
        <h2>Users</h2>
        <pre className="mb-4">{JSON.stringify(users, null, 2)}</pre>
        <button className="p-2 rounded-md border bg-red-400 text-white" onClick={() => signOut()}>
          Sair
        </button> */}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getSession(ctx)

  return session
    ? {
        props: { session },
      }
    : {
        props: {},
      }
}
