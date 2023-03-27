// import { withAuth } from "next-auth/middleware";
// import { api } from "./services/api";

// export default withAuth({
//   callbacks: {
//     authorized: async ({ token }) => {
//       if (token?.accessToken) {
//         api.defaults.headers.common.Authorization = `Bearer ${token.accessToken}`;
//       }

//       // if (token) {
//       // api.interceptors.request.use(async (req) => {
//       //   req.headers.Authorization = `Bearer ${token.accessToken}`;

//       //   return req;
//       // });
//       // }

//       return !!token;
//     },
//   },
//   secret: process.env.NEXT_SECRET,
// });

// export const config = { matcher: ["/admin", "/home"] };
