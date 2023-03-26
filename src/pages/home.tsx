import { signIn, signOut, useSession } from "next-auth/react";

export default function () {
  const { data: session, status } = useSession();

  if (!session) {
    return (
      <div>
        <h1>Faça login para conseguir ver essa página.</h1>
        <button className="p-2 rounded-md border bg-green-400 text-white" onClick={() => signIn()}>
          Entrar
        </button>
      </div>
    );
  }

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <button className="p-2 rounded-md border bg-red-400 text-white" onClick={() => signOut()}>
        Sair
      </button>
    </div>
  );
}
