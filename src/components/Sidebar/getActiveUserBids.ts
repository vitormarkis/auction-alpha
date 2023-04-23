import { IUserBid } from "@/schemas/users"
import dayjs from "dayjs"

export function getUserActiveBids(userBids: IUserBid[]) {
  return userBids.filter(bid => dayjs().isBefore(bid.post.announcement_date))
}
