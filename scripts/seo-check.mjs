// Pre-launch SEO check of the production build in .output/public. Run after `npm run build`:
//   npm run seo:check
// Errors (exit code 1): missing title, description or canonical, not exactly one H1, an <img> without alt,
// a missing image or share image, broken JSON-LD, robots.txt or sitemap.xml missing or wrong, a page missing
// from the sitemap. Warnings: long titles and descriptions, [brackets] in alt text or meta, big images,
// images without width and height, CSS or JS that isn't minified. Info: images in public/images no page uses.
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const pub = path.join(root, '.output', 'public')
const siteUrl = (process.env.NUXT_PUBLIC_SITE_URL || 'https://coworkcapetown.com').replace(/\/$/, '')
const LIMITS = { title: 60, description: 160, imageKb: 300 }

if (!fs.existsSync(pub)) { console.error('No build found. Run `npm run build` first.'); process.exit(1) }

const errors = []
const warnings = []
const err = (where, msg) => errors.push(`${where}: ${msg}`)
const warn = (where, msg) => warnings.push(`${where}: ${msg}`)
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
const attr = (tag, name) => { const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`)); return m ? decode(m[1]) : null }
const meta = (html, key) => { const m = html.match(new RegExp(`<meta (?:name|property)="${key}" content="([^"]*)"`)); return m ? decode(m[1]) : null }
const fileFor = (url) => path.join(pub, decodeURIComponent(url.replace(siteUrl, '').split(/[?#]/)[0]))

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name)
    return e.isDirectory() ? walk(p) : [p]
  })
}
const files = walk(pub)
const used = new Set()

// --- Pages ---
const pages = []
for (const file of files.filter((f) => f.endsWith('index.html'))) {
  const route = '/' + path.relative(pub, path.dirname(file)).split(path.sep).join('/')
  const where = route === '/.' || route === '/' ? '/' : route
  const html = fs.readFileSync(file, 'utf8')
  if (html.includes('http-equiv="refresh"')) continue // a redirect, not a page
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html)
  pages.push({ route: where, noindex })

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]
  if (!title) err(where, 'no <title>')
  else if (decode(title).length > LIMITS.title) warn(where, `title is ${decode(title).length} characters (Google shows about ${LIMITS.title})`)
  const description = meta(html, 'description')
  if (!description) err(where, 'no meta description')
  else if (description.length > LIMITS.description) warn(where, `description is ${description.length} characters (Google shows about ${LIMITS.description})`)

  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1]
  const expected = siteUrl + (where === '/' ? '' : where)
  if (!canonical) err(where, 'no canonical link')
  else if (canonical !== expected) err(where, `canonical is ${canonical}, expected ${expected}`)

  const h1s = (html.match(/<h1[\s>]/g) || []).length
  if (h1s !== 1) err(where, `${h1s} H1 headings (needs exactly one)`)

  const ogImage = meta(html, 'og:image')
  if (!ogImage) err(where, 'no og:image')
  else if (!fs.existsSync(fileFor(ogImage))) err(where, `share image ${ogImage} does not exist`)
  else used.add(path.normalize(fileFor(ogImage)))

  for (const m of html.matchAll(/<meta (?:name|property)="([^"]+)" content="([^"]*\[[^"]*\][^"]*)"/g)) warn(where, `[brackets] in ${m[1]}: "${decode(m[2])}"`)

  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(m[1])
      const brackets = JSON.stringify(data).match(/"[^"]*\[[^"\]]+\][^"]*"/g)
      if (brackets) warn(where, `[brackets] in ${data['@type']} schema: ${brackets.slice(0, 2).join(', ')}`)
    } catch { err(where, 'JSON-LD that does not parse') }
  }

  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    const src = attr(tag, 'src') || ''
    const alt = attr(tag, 'alt')
    if (alt === null) err(where, `image without alt: ${src}`)
    else if (/\[.*\]/.test(alt)) warn(where, `[brackets] in alt text: "${alt}"`)
    if (!attr(tag, 'width') || !attr(tag, 'height')) warn(where, `image without width and height (the page jumps as it loads): ${src}`)
    const urls = [src, ...(attr(tag, 'srcset') || '').split(',').map((s) => s.trim().split(/\s+/)[0])].filter((u) => u && !u.startsWith('data:'))
    for (const u of urls) {
      if (/^https?:/.test(u) && !u.startsWith(siteUrl)) continue
      const f = path.normalize(fileFor(u))
      if (!fs.existsSync(f)) { err(where, `image file missing: ${u}`); continue }
      used.add(f)
    }
  }
  for (const m of html.matchAll(/url\(['"]?(\/[^'")]+)['"]?\)/g)) used.add(path.normalize(fileFor(m[1])))
}

// --- robots.txt ---
const robotsFile = path.join(pub, 'robots.txt')
if (!fs.existsSync(robotsFile)) err('robots.txt', 'missing')
else {
  const robots = fs.readFileSync(robotsFile, 'utf8')
  if (!robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`)) err('robots.txt', `no "Sitemap: ${siteUrl}/sitemap.xml" line`)
  if (!/Disallow: \/api\//.test(robots)) err('robots.txt', 'does not block /api/')
  if (/Disallow: \/\s*$/m.test(robots)) err('robots.txt', 'a "Disallow: /" line blocks the whole site')
}

// --- sitemap.xml ---
const sitemapFile = path.join(pub, 'sitemap.xml')
if (!fs.existsSync(sitemapFile)) err('sitemap.xml', 'missing (not written at build time)')
else {
  const locs = [...fs.readFileSync(sitemapFile, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]))
  const listed = new Set(locs.map((l) => l.replace(siteUrl, '').replace(/\/$/, '') || '/'))
  for (const p of pages) {
    if (!p.noindex && !listed.has(p.route)) err('sitemap.xml', `missing ${p.route}`)
    if (p.noindex && listed.has(p.route)) err('sitemap.xml', `lists ${p.route}, which is noindex`)
  }
  for (const l of locs) {
    if (!l.startsWith(siteUrl)) err('sitemap.xml', `${l} is not on ${siteUrl}`)
    if (l.includes('?')) err('sitemap.xml', `${l} has a query string`)
    const r = l.replace(siteUrl, '') || '/'
    if (r !== '/' && r.endsWith('/')) err('sitemap.xml', `${l} ends with a slash`)
    if (!pages.some((p) => p.route === r.replace(/\/$/, '') || (r === '/' && p.route === '/'))) err('sitemap.xml', `${l} has no page in the build`)
  }
}

// --- Images: format and size ---
for (const f of files.filter((f) => f.includes(`${path.sep}images${path.sep}`) || f.includes(`${path.sep}icons${path.sep}`))) {
  const ext = path.extname(f).toLowerCase()
  const rel = '/' + path.relative(pub, f).split(path.sep).join('/')
  if (!['.webp', '.avif', '.svg', '.jpg', '.jpeg', '.png'].includes(ext)) warn(rel, 'not a web image format')
  if (['.png'].includes(ext) && used.has(path.normalize(f))) warn(rel, 'PNG on a page: WebP is usually far smaller')
  const kb = Math.round(fs.statSync(f).size / 1024)
  if (used.has(path.normalize(f)) && kb > LIMITS.imageKb) warn(rel, `${kb} KB (keep images under ${LIMITS.imageKb} KB)`)
}
// Images used only from stylesheets
for (const css of files.filter((f) => f.endsWith('.css'))) {
  for (const m of fs.readFileSync(css, 'utf8').matchAll(/url\(['"]?(\/(?:images|icons)\/[^'")]+)['"]?\)/g)) used.add(path.normalize(fileFor(m[1])))
}
const unused = files.filter((f) => f.includes(`${path.sep}images${path.sep}`) && !used.has(path.normalize(f)) && !f.endsWith('og-default.jpg'))
const unusedKb = unused.reduce((n, f) => n + fs.statSync(f).size / 1024, 0)

// --- Minified CSS and JS ---
for (const f of files.filter((f) => f.includes(`${path.sep}_nuxt${path.sep}`) && /\.(js|css)$/.test(f))) {
  const lines = fs.readFileSync(f, 'utf8').split('\n').length
  if (lines > 10) warn('/' + path.relative(pub, f).split(path.sep).join('/'), `${lines} lines: not minified`)
}

// --- Report ---
console.log(`SEO check of ${pages.length} pages in .output/public (${siteUrl})\n`)
if (errors.length) console.log(`Errors (${errors.length}):\n  ${errors.join('\n  ')}\n`)
if (warnings.length) console.log(`Warnings (${warnings.length}):\n  ${warnings.join('\n  ')}\n`)
if (unused.length) console.log(`Info: ${unused.length} files in public/images are not used by any page (${(unusedKb / 1024).toFixed(1)} MB). They are deployed but never downloaded.\n`)
console.log(errors.length ? 'Failed.' : 'Passed (read the warnings before launch).')
process.exit(errors.length ? 1 : 0)
