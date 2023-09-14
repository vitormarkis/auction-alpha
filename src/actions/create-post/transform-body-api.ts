import { CreatePostAPIBody } from "@/actions/create-post/schema-body-api";
import { CreatePostForm } from "@/actions/create-post/schema-form";

export function getCreatePostAPIBody(body: CreatePostForm): CreatePostAPIBody {
  return {
    ...body,
    medias_url: body.medias_url.map(m => m.url)
  }
}