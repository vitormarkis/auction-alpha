import dayjs from "dayjs"
import { UserBid } from "@/utils/get-user-bids/getUserBids"

export function getUserActiveBids(userBids: UserBid[]) {
  return userBids.filter(bid => dayjs().isBefore(bid.post.announcement_date))
}
