import { MakeBidForm } from "@/actions/make-bid/schema-form"

export type MakeBidVariables = {
  form: MakeBidForm
  subject: {
    postId: string
  }
}
