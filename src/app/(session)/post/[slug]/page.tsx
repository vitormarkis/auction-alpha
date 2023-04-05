export default function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  return (
    <div>{JSON.stringify(slug, null, 2)}</div>
  )
} 