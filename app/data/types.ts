// Shared content types.
export interface Faq { q: string; a: string; link?: { label: string; to: string } }
export interface Link { label: string; to: string }
export interface Img { src: string; alt: string; srcset?: string }

/** A blog post as listed (from server/api/blog) */
export interface BlogCard {
  slug: string
  title: string
  description: string
  excerpt: string
  category: string
  date: string
  updated?: string
  readingMinutes: number
  image?: string
  imageAlt?: string
}
/** A whole post (from server/api/blog/[slug]) */
export interface BlogPost extends BlogCard {
  html: string
  toc: { id: string; text: string }[]
  faqs: Faq[]
  next?: BlogCard
  related: BlogCard[]
}

/** Both sizes of a photo made by `npm run images` (public/images/<group>/<name>-800.webp and -1600.webp). */
export const photo = (group: string, name: string, alt: string): Img => ({
  src: `/images/${group}/${name}-800.webp`,
  srcset: `/images/${group}/${name}-800.webp 800w, /images/${group}/${name}-1600.webp 1600w`,
  alt,
})
