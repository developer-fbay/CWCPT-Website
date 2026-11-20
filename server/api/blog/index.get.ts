// All blog posts, newest first, without their bodies (for the index and the homepage's "From the blog").
export default defineEventHandler(async () => (await loadPosts()).map(meta))
