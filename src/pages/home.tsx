import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { getSession, signIn, signOut, useSession } from "next-auth/react";

export default function () {
  // const { data: session } = useSession();

  // console.log(session);

  // const { data: users } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: () => api.get("/users").then((res) => res.data),
  // });

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
      {/* <pre className="mb-4">{JSON.stringify(session, null, 2)}</pre> */}
      <h2>Users</h2>
      {/* <pre className="mb-4">{JSON.stringify(users, null, 2)}</pre> */}
      <button className="p-2 rounded-md border bg-red-400 text-white" onClick={() => signOut()}>
        Sair
      </button>
    </div>
  );
}

// export const getServerSideProps = async () => {
//   const session = await getSession();

//   console.log(session)
  
//   if (session) {
//     return {
//       props: {
//         session,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };
