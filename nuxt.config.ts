// Co Work Cape Town: Nuxt 4 (Vue 3). Pages are prerendered to static HTML for
// fast loads and clean SEO. Hosted on Cloudflare Workers: the static pages are served free
// as assets, and the small server (server/api) only runs for form posts to n8n.
import { readdirSync } from 'node:fs'

// Every blog post is prerendered, not only the ones the crawler reaches: the blog index shows a few posts and
// loads the rest on "Load more", so older posts would otherwise be missed (and left out of the sitemap).
// Same rule as server/utils/blog.ts: .md files, not starting with "_", not the README.
const blogRoutes = readdirSync(new URL('./content/blog/', import.meta.url))
  .filter((f) => f.endsWith('.md') && !f.startsWith('_') && !/readme/i.test(f))
  .map((f) => `/blog/${f.replace(/\.md$/, '')}`)

// Caching, in three layers:
// 1. Pages: prerendered HTML with max-age=0, must-revalidate (and an ETag): browsers keep a copy but check it
//    each visit, so a deploy shows at once. Addresses ending in a slash get a 301 to the one without
//    (Cloudflare: html_handling below; Node server: server/plugins/trailing-slash.ts).
// 2. Files: /_nuxt (JS, CSS, fonts) have a hash in their names and are kept a year (Nuxt's rule); images and
//    icons are kept 30 days (below). modules/cloudflare-headers.ts orders _headers so each file gets one value.
// 3. The Worker: /api is never cached (below). Unknown addresses get the 404 page from the Worker, uncached.
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
  },

  runtimeConfig: {
    // Server only: never sent to the browser. Set as secrets in Cloudflare, and in .env locally.
    // NUXT_N8N_CONTACT_WEBHOOK, NUXT_N8N_WEBHOOK_SECRET, NUXT_SUPABASE_SERVICE_KEY override these at runtime.
    n8nContactWebhook: '',
    n8nWebhookSecret: '',
    supabaseServiceKey: '',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://coworkcapetown.com',
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

  // Prerender every page that has no live data. Builds for Cloudflare Workers unless NITRO_PRESET says otherwise:
  // NITRO_PRESET=node-server builds a Node server for DigitalOcean App Platform (run: node .output/server/index.mjs).
  nitro: {
    preset: process.env.NITRO_PRESET || 'cloudflare_module',
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
      // Pages are built as about/index.html. Cloudflare's default would redirect /about to /about/; this serves
      // /about and sends /about/ to /about, matching our canonicals, links and sitemap (no slash at the end).
      wrangler: { assets: { html_handling: 'drop-trailing-slash' } },
    },
    prerender: { crawlLinks: true, routes: ['/', '/blog', ...blogRoutes] },
    // Blog posts are markdown files in content/blog, bundled with the server (see server/utils/blog.ts)
    serverAssets: [{ baseName: 'blog', dir: '../content/blog' }],
  },

  // Old addresses, and no slash at the end of any address.
  routeRules: {
    // Pages: browsers may keep a copy but must check it each visit, so a deploy shows at once. Cloudflare sends
    // this by default; a Node server (DigitalOcean) sends nothing, and browsers would guess. Narrower rules win.
    '/**': { headers: { 'cache-control': 'public, max-age=0, must-revalidate' } },
    // Browsers keep images and icons for 30 days (written to Cloudflare's _headers). Their file names don't change
    // when a photo does, so give a replaced photo a new name. /_nuxt files are hashed and cached for a year by Nuxt.
    '/images/**': { headers: { 'cache-control': 'public, max-age=2592000' } },
    '/icons/**': { headers: { 'cache-control': 'public, max-age=2592000' } },
    // Form posts and anything else the Worker answers: never stored by browsers or caches in between
    '/api/**': { headers: { 'cache-control': 'no-store' } },
    '/gallery': { redirect: { to: '/location', statusCode: 301 } },
    '/book-a-tour': { redirect: { to: '/contact-us', statusCode: 301 } },
    '/contact': { redirect: { to: '/contact-us', statusCode: 301 } },
  },
})
