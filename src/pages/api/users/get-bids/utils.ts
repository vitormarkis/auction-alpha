import { Prisma } from "@prisma/client"

// export const getUserBids = (userId: string) => {
//   const { Bids: user_bids } = await prisma.user.findFirstOrThrow({
//     where: {
//       id: session.user.id,
//     },
//     select: {
//       Bids: {
//         select: {
//           id: true,
//           post_id: true,
//           value: true,
//           post: {
//             select: {
//               announcement_date: true,
//             },
//           },
//         },
//       },
//     },
//   })
// }