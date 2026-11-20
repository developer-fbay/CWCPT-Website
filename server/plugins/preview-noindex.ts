/**
 * Search engines may only index the site on its real address. On any other host (the *.ondigitalocean.app
 * preview before launch, localhost) every response gets `X-Robots-Tag: noindex, nofollow`, so the preview never
 * shows up in Google beside the real site. Once coworkcapetown.com points at the app, its responses carry no tag.
 * The real address is NUXT_PUBLIC_SITE_URL (default https://coworkcapetown.com); www. counts as the same site.
 *
 * Added as the first handler, like trailing-slash.ts, because Nitro serves files before server/middleware runs.
 */
export default defineNitroPlugin((nitroApp) => {
  const siteHost = new URL(useRuntimeConfig().public.siteUrl).host.replace(/^www\./, '')
  nitroApp.h3App.stack.unshift({
    route: '',
    handler: defineEventHandler((event) => {
      const host = getRequestHost(event, { xForwardedHost: true }).replace(/^www\./, '')
      if (host !== siteHost) setResponseHeader(event, 'X-Robots-Tag', 'noindex, nofollow')
    }),
  })
})
