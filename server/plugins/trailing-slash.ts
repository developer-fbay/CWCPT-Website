/**
 * Addresses never end in a slash: /about/ gets a 301 to /about (the query string is kept), so every page has one
 * address, matching its canonical and the sitemap, and old WordPress links (which end in a slash) pass on fully.
 *
 * On a Node server (DigitalOcean) Nitro serves files before any server/middleware runs, and its file handler
 * treats /about/ as /about, so this goes in as the very first handler instead. On Cloudflare the pages are served
 * before the Worker runs and `html_handling: drop-trailing-slash` (nuxt.config.ts) does the same job there.
 */
export default defineNitroPlugin((nitroApp) => {
  nitroApp.h3App.stack.unshift({
    route: '',
    handler: defineEventHandler((event) => {
      if (event.method !== 'GET' && event.method !== 'HEAD') return
      const [pathname = '/', query] = event.path.split('?', 2)
      if (pathname === '/' || !pathname.endsWith('/') || pathname.startsWith('/api/')) return
      const target = pathname.replace(/\/+$/, '') || '/'
      return sendRedirect(event, query ? `${target}?${query}` : target, 301)
    }),
  })
})
