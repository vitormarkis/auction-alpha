import { IUserBids } from "@/schemas/users"
import dayjs from "dayjs"

export function getUserActiveBids(userBids: IUserBids[]) {
  return userBids.filter(bid => dayjs().isBefore(bid.post.announcement_date))
}
