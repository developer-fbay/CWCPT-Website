import ogCards from '~/data/og.json'
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
  // Share image: the page's own card (app/data/og.json, made by `npm run og`), else an image the page passes
  // (a blog post's photo), else the default card (`npm run images`). Cards are 1200 x 630 JPEGs.
  const card = ogCards.find((c) => c.path === page.path)
  const share = card
    ? { src: `/images/og/${card.path === '/' ? 'home' : card.path.slice(1).replace(/\//g, '-')}.jpg`, alt: `${site.name}: ${card.headline}. ${card.alt}.`, card: true }
    : page.image
      ? { src: page.image, alt: page.title, card: false }
      : { src: '/images/og-default.jpg', alt: `The ${site.name} logo over a view of Table Mountain`, card: true }
  const image = `${siteUrl}${share.src}`
  const defaultImage = share.card ? { ogImageWidth: 1200, ogImageHeight: 630, ogImageType: 'image/jpeg' as const } : {}
  // Blog posts and guides: og:type article and their dates, which also give the sitemap its <lastmod>
  const article = page.schema?.find((s) => s['@type'] === 'Article' || s['@type'] === 'BlogPosting') as
    { datePublished?: string; dateModified?: string } | undefined

  useSeoMeta({
    title: fullTitle,
    description: page.description,
    // Link previews show the site name on their own (og:site_name), so the shared title leaves out the suffix
    ogTitle: page.title,
    ogDescription: page.description,
    ogUrl: url || siteUrl,
    ogType: article ? 'article' : 'website',
    ogImage: image,
    ...defaultImage,
    ogImageAlt: share.alt,
    ogLocale: 'en_GB',
    ogSiteName: site.name,
    twitterCard: 'summary_large_image',
    twitterTitle: page.title,
    twitterDescription: page.description,
    twitterImage: image,
    twitterImageAlt: share.alt,
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
