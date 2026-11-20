import { site } from '~/data/site'
import type { Faq } from '~/data/types'

interface Crumb { label: string; to?: string }
interface PageSeo {
  title: string
  description: string
  path: string
  /** Use the title as it is (no " | Co Work Cape Town" added) */
  titleWhole?: boolean
  breadcrumbs?: Crumb[]
  /** Questions shown on the page: become FAQPage schema from the same data, so they never drift */
  faqs?: Faq[]
  /** Extra JSON-LD objects (Article, Blog, WebSite...) */
  schema?: Record<string, unknown>[]
  image?: string
  noindex?: boolean
}

/** One call per page: title, description, canonical, Open Graph and structured data. */
export function usePageSeo(page: PageSeo) {
  const { siteUrl } = useRuntimeConfig().public
  const url = `${siteUrl}${page.path === '/' ? '' : page.path}`
  // No " | Co Work Cape Town" when the title already names the brand (no "About Co Work Cape Town | Co Work Cape Town")
  const fullTitle = page.titleWhole || page.path === '/' || page.title.includes(site.name) ? page.title : `${page.title} | ${site.name}`
  // The default share image is made by `npm run images` (1200 x 630 JPEG)
  const image = page.image ? `${siteUrl}${page.image}` : `${siteUrl}/images/og-default.jpg`
  const defaultImage = page.image
    ? {}
    : { ogImageWidth: 1200, ogImageHeight: 630, ogImageType: 'image/jpeg' as const, ogImageAlt: `The ${site.name} logo over a view of Table Mountain` }
  // Blog posts and guides: og:type article and their dates, which also give the sitemap its <lastmod>
  const article = page.schema?.find((s) => s['@type'] === 'Article' || s['@type'] === 'BlogPosting') as
    { datePublished?: string; dateModified?: string } | undefined

  useSeoMeta({
    title: fullTitle,
    description: page.description,
    ogTitle: fullTitle,
    ogDescription: page.description,
    ogUrl: url || siteUrl,
    ogType: article ? 'article' : 'website',
    ogImage: image,
    ...defaultImage,
    ogLocale: 'en_GB',
    ogSiteName: site.name,
    twitterCard: 'summary_large_image',
    articlePublishedTime: article?.datePublished,
    articleModifiedTime: article?.dateModified,
    robots: page.noindex ? 'noindex, follow' : undefined,
  })

  const graph: Record<string, unknown>[] = [...(page.schema ?? [])]
  if (page.breadcrumbs?.length) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: page.breadcrumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.label,
        ...(c.to ? { item: `${siteUrl}${c.to === '/' ? '' : c.to}` } : { item: url }),
      })),
    })
  }
  if (page.faqs?.length) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }

  useHead({
    link: [{ rel: 'canonical', href: url || siteUrl }],
    script: graph.map((g) => ({ type: 'application/ld+json', innerHTML: JSON.stringify(g) })),
  })
}

/** Article schema for the guides and blog posts (dates as YYYY-MM-DD). */
export function articleSchema(a: { headline: string; description: string; path: string; type?: 'Article' | 'BlogPosting'; published?: string; modified?: string; image?: string }) {
  const { siteUrl } = useRuntimeConfig().public
  return {
    '@context': 'https://schema.org',
    '@type': a.type ?? 'Article',
    headline: a.headline,
    description: a.description,
    mainEntityOfPage: `${siteUrl}${a.path}`,
    ...(a.published ? { datePublished: a.published } : {}),
    ...(a.modified ?? a.published ? { dateModified: a.modified ?? a.published } : {}),
    ...(a.image ? { image: `${siteUrl}${a.image}` } : {}),
    publisher: { '@type': 'Organization', name: site.name, logo: { '@type': 'ImageObject', url: `${siteUrl}${site.logo.dark.src}` } },
  }
}
