import slugify from "react-slugify"

export function createPostSlug(title: string) {
  const random = () => parseInt(String(Math.random() * 10 ** 10))
  const slug = `${slugify(title)}-${random()}`

  return { slug }
}
