import dayjs from "dayjs"
import { IUserBid } from "@/schemas/users"

export function getUserActiveBids(userBids: IUserBid[]) {
  return userBids.filter(bid => dayjs().isBefore(bid.post.announcement_date))
}
