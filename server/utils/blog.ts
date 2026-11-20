// The blog's posts: markdown files in content/blog/ (bundled as Nitro server assets, so it works on Cloudflare
// with no file system). Every post page is prerendered to static HTML at build time.
// A post = YAML frontmatter + markdown body. See content/blog/README.md for how to add one.
import { Marked } from 'marked'
import { parse as parseYaml } from 'yaml'

export interface Faq { q: string; a: string }
export interface PostMeta {
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
export interface Post extends PostMeta {
  html: string
  toc: { id: string; text: string }[]
  faqs: Faq[]
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

function render(md: string) {
  const toc: { id: string; text: string }[] = []
  const marked = new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens)
        const id = slugify(text)
        if (depth === 2) toc.push({ id, text: text.replace(/<[^>]+>/g, '') })
        return `<h${depth} id="${id}">${text}</h${depth}>\n`
      },
      image({ href, title, text }) {
        return `<figure><img src="${href}" alt="${text}" loading="lazy" decoding="async">${title ? `<figcaption>${title}</figcaption>` : ''}</figure>`
      },
    },
  })
  return { html: marked.parse(md) as string, toc }
}

function parseFile(slug: string, raw: string): Post {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!m) throw new Error(`content/blog/${slug}.md has no frontmatter`)
  const fm = (parseYaml(m[1]!) ?? {}) as Record<string, unknown>
  const body = m[2] ?? ''
  const { html, toc } = render(body)
  const words = body.split(/\s+/).filter(Boolean).length
  const firstPara = body.split(/\r?\n\r?\n/).find((p) => p.trim() && !p.trim().startsWith('#'))?.replace(/[*_`[\]]|\(.*?\)/g, '').trim() ?? ''
  const date = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : v ? String(v) : undefined)
  return {
    slug,
    title: String(fm.title ?? slug),
    description: String(fm.description ?? ''),
    excerpt: String(fm.excerpt ?? firstPara.slice(0, 180)),
    category: String(fm.category ?? 'News'),
    date: date(fm.date) ?? '1970-01-01',
    updated: date(fm.updated),
    readingMinutes: Math.max(1, Math.round(words / 220)),
    image: fm.image ? String(fm.image) : undefined,
    imageAlt: fm.imageAlt ? String(fm.imageAlt) : undefined,
    html,
    toc,
    faqs: Array.isArray(fm.faqs) ? (fm.faqs as Faq[]).filter((f) => f?.q && f?.a) : [],
  }
}

/** Every published post, newest first. Files starting with "_" and README are skipped. */
export async function loadPosts(): Promise<Post[]> {
  const store = useStorage('assets:blog')
  const keys = (await store.getKeys()).filter((k) => k.endsWith('.md') && !k.startsWith('_') && !/readme/i.test(k))
  const posts = await Promise.all(
    keys.map(async (k) => {
      const raw = await store.getItemRaw(k)
      const text = typeof raw === 'string' ? raw : new TextDecoder().decode(raw as ArrayBuffer)
      return parseFile(k.replace(/\.md$/, '').replace(/:/g, '/'), text)
    }),
  )
  return posts.sort((a, b) => b.date.localeCompare(a.date))
}

export const meta = ({ html: _h, toc: _t, faqs: _f, ...rest }: Post): PostMeta => rest
