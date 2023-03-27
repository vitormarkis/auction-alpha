import { api } from "@/services/api"
import { useQuery } from "@tanstack/react-query"
import { getSession, signIn, signOut, useSession } from "next-auth/react"

export default function () {
  const { data: session } = useSession()

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => api.get("/users").then((res) => res.data),
  })

  return session ? (
    <div className="flex w-full flex-col">
      <span>Oi {session.user?.name}</span>
      {/* <pre>{users && JSON.stringify(users, null, 2)}</pre> */}
      <pre>{session && JSON.stringify(session, null, 2)}</pre>
      <button onClick={() => signOut({ redirect: false })} className="ml-auto bg-red-500 text-white p-2">
        Sair
      </button>
    </div>
  ) : (
    <div>
      <span>Faça login para ver a página</span>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <button onClick={() => signIn()} className="bg-emerald-500 text-white p-2">
        Entrar
      </button>
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

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx)

  return session
    ? {
        props: { session },
      }
    : {
        props: {},
      }
}
