import { existsSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { defineNuxtModule } from 'nuxt/kit'

/**
 * Puts Cloudflare's _headers file in the order Cloudflare reads it.
 *
 * Nitro writes one rule per routeRule that sets headers, most specific first. Cloudflare applies every matching
 * rule top to bottom and joins a header set twice with a comma, so "/_nuxt/*" (cache a year) and
 * "/_nuxt/builds/*" (cache a second) gave the build manifest both values at once. After Nitro writes the file,
 * this puts broad rules first and starts each rule with "! Header" for the headers it sets, which removes what a
 * broader rule added before it. Every file then gets exactly one value. Headers still come from routeRules in
 * nuxt.config.ts (and Nuxt's own /_nuxt rules); this only changes the order.
 * Docs: https://developers.cloudflare.com/workers/static-assets/headers/
 */
export default defineNuxtModule({
  meta: { name: 'cloudflare-headers' },
  setup(_, nuxt) {
    if (nuxt.options.dev) return
    nuxt.hook('nitro:init', (nitro) => {
      // Registered after the Cloudflare preset's own hook, so this runs once _headers is written
      nitro.hooks.hook('compiled', async () => {
        const file = join(nitro.options.output.publicDir, '_headers')
        if (!existsSync(file)) return

        const rules: { path: string; headers: string[] }[] = []
        for (const line of (await readFile(file, 'utf8')).split(/\r?\n/)) {
          const text = line.trim()
          if (!text || text.startsWith('#')) continue
          if (/^\s/.test(line)) { if (!text.startsWith('!')) rules.at(-1)?.headers.push(text) }
          else rules.push({ path: text, headers: [] })
        }

        // Broad first: fewer fixed path parts = matches more. The sort is stable, so equal rules keep their order.
        const depth = (p: string) => p.split('/').filter((s) => s && s !== '*').length
        rules.sort((a, b) => depth(a.path) - depth(b.path))

        // Detach a header only when an earlier (broader) rule already sets it
        const setBefore = new Set<string>()
        const blocks = rules.map(({ path, headers }) => {
          const names = [...new Set(headers.map((h) => h.slice(0, h.indexOf(':')).trim()))]
          const detach = names.filter((n) => setBefore.has(n.toLowerCase()))
          names.forEach((n) => setBefore.add(n.toLowerCase()))
          return [path, ...detach.map((n) => `  ! ${n}`), ...headers.map((h) => `  ${h}`)].join('\n')
        })
        await writeFile(file, `# Written at build time from routeRules (nuxt.config.ts), ordered by modules/cloudflare-headers.ts\n\n${blocks.join('\n\n')}\n`)
      })
    })
  },
})
