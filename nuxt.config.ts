// Co Work Cape Town: Nuxt 4 (Vue 3). Pages are prerendered to static HTML for fast loads and clean SEO.
// Hosted on DigitalOcean App Platform as a Node server (decided with Codi, 2026-11-20): it serves the prerendered
// pages and files, and runs the small server part (server/api) for form posts to n8n. Settings: README "Deploy".
import { readdirSync } from 'node:fs'
import { hiddenPages } from './app/data/site'

// Every blog post is prerendered, not only the ones the crawler reaches: the blog index shows a few posts and
// loads the rest on "Load more", so older posts would otherwise be missed (and left out of the sitemap).
// Same rule as server/utils/blog.ts: .md files, not starting with "_", not the README.
const blogRoutes = readdirSync(new URL('./content/blog/', import.meta.url))
  .filter((f) => f.endsWith('.md') && !f.startsWith('_') && !/readme/i.test(f))
  .map((f) => `/blog/${f.replace(/\.md$/, '')}`)

// Pages that stay hidden until their content is written (app/data/site.ts), plus the blog until it has a post.
// They are left out of the sitemap and never prerendered, and answer 404 (app/middleware/hidden.global.ts).
const hiddenRoutes = [...hiddenPages, ...(blogRoutes.length ? [] : ['/blog', '/blog/**'])]

// Caching, in three layers (all in routeRules below, except where noted):
// 1. Pages: prerendered HTML with max-age=0, must-revalidate (and an ETag): browsers keep a copy but check it
//    each visit, so a deploy shows at once. Addresses ending in a slash get a 301 to the one without
//    (server/plugins/trailing-slash.ts).
// 2. Files: /_nuxt (JS, CSS, fonts) have a hash in their names and are kept a year (Nuxt's own rule); images and
//    icons are kept 30 days. Pages, scripts and styles are stored compressed (Brotli and gzip) at build time.
// 3. The server part: /api is never cached. Unknown addresses get the 404 page.
export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/sitemap'],

  // Components are used by file name alone: <NeonButton>, not <UiNeonButton>.
  components: [{ path: '~/components', pathPrefix: false }],

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://coworkcapetown.com',
    name: 'Co Work Cape Town',
  },

  // sitemap.xml is written once at build time from the prerendered pages (no server code at runtime), in Codi's
  // plain format: one <loc> per page, no image entries, no stylesheet. Redirects and noindex pages are left out.
  // Blog posts and guides get a <lastmod> from their own dates (article:modified_time, set by usePageSeo).
  sitemap: {
    zeroRuntime: true,
    xsl: false,
    credits: false,
    discoverImages: false,
    discoverVideos: false,
    exclude: hiddenRoutes,
  },

  runtimeConfig: {
    // Server only: never sent to the browser. Set as encrypted environment variables in DigitalOcean, and in .env
    // locally. NUXT_N8N_CONTACT_WEBHOOK, NUXT_N8N_WEBHOOK_SECRET, NUXT_SUPABASE_SERVICE_KEY override these.
    n8nContactWebhook: '',
    n8nWebhookSecret: '',
    supabaseServiceKey: '',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://coworkcapetown.com',
      // The blog (index, links, sitemap) appears once content/blog has a post (see useHiddenPages)
      blogLive: blogRoutes.length > 0,
      // Only if the browser ever reads Supabase directly (e.g. live office availability).
      supabaseUrl: '',
      supabaseAnonKey: '',
    },
  },

  css: [
    '@fontsource-variable/archivo/wdth.css',
    '@fontsource/mr-dafoe/400.css',
    '~/assets/styles/tokens.css',
    '~/assets/styles/base.css',
    '~/assets/styles/system.css',
  ],

  app: {
    head: {
      htmlAttrs: { lang: 'en-GB' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#000000' },
      ],
      // The live site's favicon (white square, black Table Mountain line), made by `npm run images`.
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon-48.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icon-192.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
    },
  },

  // A Node server (run: node .output/server/index.mjs). Every page that has no live data is prerendered.
  nitro: {
    preset: process.env.NITRO_PRESET || 'node-server',
    compressPublicAssets: true,
    // Hidden pages (site.ts hiddenPages) are never linked, so the crawler never prerenders them
    prerender: { crawlLinks: true, routes: ['/', ...(blogRoutes.length ? ['/blog', ...blogRoutes] : [])], ignore: hiddenRoutes },
    // Blog posts are markdown files in content/blog, bundled with the server (see server/utils/blog.ts)
    serverAssets: [{ baseName: 'blog', dir: '../content/blog' }],
  },

  routeRules: {
    // Pages: browsers may keep a copy but must check it each visit, so a deploy shows at once. Without this the
    // server sends no Cache-Control and browsers would guess. The narrower rules below win where they match.
    '/**': { headers: { 'cache-control': 'public, max-age=0, must-revalidate' } },
    // Browsers keep images and icons for 30 days. Their file names don't change when a photo does, so give a
    // replaced photo a new name. /_nuxt files are hashed and cached for a year by Nuxt.
    '/images/**': { headers: { 'cache-control': 'public, max-age=2592000' } },
    '/icons/**': { headers: { 'cache-control': 'public, max-age=2592000' } },
    // Form posts and anything else the server part answers: never stored by browsers or caches in between
    '/api/**': { headers: { 'cache-control': 'no-store' } },
    // Old addresses: real 301s. Add any old WordPress address that changed here before launch.
    '/gallery': { redirect: { to: '/location', statusCode: 301 } },
    '/book-a-tour': { redirect: { to: '/contact-us', statusCode: 301 } },
    '/contact': { redirect: { to: '/contact-us', statusCode: 301 } },
  },
})
