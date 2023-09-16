import { NextApiRequest } from "next"
import { z } from "zod"

export type ExtractDataType<TSchema extends z.ZodType<any>> = z.output<TSchema>

type ResponseJSON = {
  message: string
  error: z.ZodError | {}
}

export function payloadParser<
  T extends z.ZodObject<{
    body?: z.ZodType
    query?: z.ZodType
  }>,
>(
  req: NextApiRequest,
  payloadParserSchema: T
): {
  parse: z.SafeParseReturnType<ExtractDataType<T>, ExtractDataType<T>>
  json: ResponseJSON
} {
  const parsedPayload = payloadParserSchema.safeParse({
    body: JSON.parse(req.body),
    query: req.query,
  })

  const json = {
    message: "Bad payload provided.",
    error: parsedPayload.success ? {} : parsedPayload.error,
  }

  return {
    parse: parsedPayload as z.SafeParseReturnType<ExtractDataType<T>, any>,
    json,
  }
}
