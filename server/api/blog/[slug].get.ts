// One blog post with its body, contents list and questions, plus the next post (same category first) and
// up to three more in its category.
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const posts = await loadPosts()
  const i = posts.findIndex((p) => p.slug === slug)
  if (i < 0) throw createError({ statusCode: 404, statusMessage: 'Post not found' })
  const post = posts[i]!
  const older = posts.slice(i + 1)
  const next = older.find((p) => p.category === post.category) ?? older[0] ?? posts.find((p) => p.slug !== post.slug)
  const related = posts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3).map(meta)
  return { ...post, next: next ? meta(next) : undefined, related }
})
