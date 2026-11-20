// Share images (Open Graph, 1200 x 630) for the pages in app/data/og.json, in the site's look: black, the white
// logo, the page's headline in Archivo with the lit pink full stop, and the page's photo under the mountain line.
// They are rendered by headless Chrome (installed on this computer) so the real fonts are used, then saved as
// JPEG to public/images/og/<page>.jpg; usePageSeo points each page's og:image at its file.
//
// Run: npm run og             (makes the missing ones)
//      npm run og -- --force  (remakes all, e.g. after changing a headline or photo)
// Chrome: the usual install path on Windows, macOS or Linux, or set CHROME_PATH.
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const force = process.argv.includes('--force')
const cards = JSON.parse(fs.readFileSync(path.join(root, 'app', 'data', 'og.json'), 'utf8'))
const outDir = path.join(root, 'public', 'images', 'og')
fs.mkdirSync(outDir, { recursive: true })

export const slug = (p) => (p === '/' ? 'home' : p.replace(/^\//, '').replace(/\//g, '-'))
const todo = cards.filter((c) => force || !fs.existsSync(path.join(outDir, `${slug(c.path)}.jpg`)))
if (!todo.length) { console.log('All share images exist (use -- --force to remake them).'); process.exit(0) }

const chromePath = process.env.CHROME_PATH || [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
].find((p) => fs.existsSync(p))
if (!chromePath) { console.error('Chrome not found: set CHROME_PATH.'); process.exit(1) }

// Everything is inlined as data URIs, so the page needs no file access
const dataUri = (file, type) => `data:${type};base64,${fs.readFileSync(file).toString('base64')}`
const font = dataUri(path.join(root, 'node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2'), 'font/woff2')
const logo = dataUri(path.join(root, 'public/images/brand/logo-transparent.webp'), 'image/webp')
const line = dataUri(path.join(root, 'public/images/brand/mountain-line.webp'), 'image/webp')
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
// Words never break; the last word keeps the lit full stop on its line
const headline = (t) => { const w = esc(t).split(' '); const last = w.pop(); return `${w.join(' ')} <span class="last">${last}<span class="dot">.</span></span>` }

const html = (card) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Archivo; src: url(${font}) format('woff2'); font-weight: 100 900; font-stretch: 62% 125%; }
* { margin: 0; box-sizing: border-box; }
html, body { width: 1200px; height: 630px; background: #000; overflow: hidden; }
body { color: #fff; font-family: Archivo, sans-serif; }
.card { width: 1200px; height: 630px; display: grid; grid-template-columns: 1fr 470px; gap: 56px; padding: 64px 72px 64px 72px; align-items: stretch; }
.left { display: flex; flex-direction: column; justify-content: space-between; min-width: 0; }
.logo { height: 74px; width: auto; align-self: flex-start; }
h1 { font-weight: 900; font-stretch: 112%; text-transform: uppercase; line-height: 0.92; font-size: 76px; overflow-wrap: normal; word-break: keep-all; }
.last { white-space: nowrap; }
.dot { text-shadow: 0 0 0.143em #ff0080, 0 0 0.143em #ff0080, 0 0 0.071em #ff0080, 0 0 0.143em #ff0080; }
.foot { display: flex; flex-direction: column; gap: 8px; font-size: 19px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #bdbdbd; }
.foot b { color: #fff; letter-spacing: 0.04em; text-transform: none; font-size: 22px; }
.sq { position: relative; width: 470px; height: 470px; align-self: center; overflow: hidden; background: #111; }
.sq img { width: 100%; height: 100%; object-fit: cover; }
.line { position: absolute; left: -0.5%; top: 0.5%; width: 101%; height: 101%; background: #fff;
  -webkit-mask: url(${line}) center / contain no-repeat; mask: url(${line}) center / contain no-repeat; }
</style></head><body><div class="card">
  <div class="left">
    <img class="logo" src="${logo}" alt="">
    <h1 id="h">${headline(card.headline)}</h1>
    <div class="foot"><span>Wembley Square, Gardens, Cape Town</span><b>coworkcapetown.com</b></div>
  </div>
  <div class="sq"><img src="${dataUri(path.join(root, 'public', card.photo), 'image/webp')}" alt=""><div class="line"></div></div>
</div><script>
  // Shrink the headline until it fits in its space (long headlines get smaller type)
  document.fonts.ready.then(() => {
    const h = document.getElementById('h'); let size = 76
    while (size > 40 && (h.scrollWidth > h.clientWidth || h.offsetHeight > 300)) { size -= 2; h.style.fontSize = size + 'px' }
    document.body.dataset.ready = '1'
  })
</script></body></html>`

// Headless Chrome through the DevTools protocol
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'cwcpt-og-'))
const port = 9400 + Math.floor(Math.random() * 400)
const chrome = spawn(chromePath, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--no-first-run', '--disable-gpu', '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' })
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let target
for (let i = 0; i < 60 && !target; i++) { try { target = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === 'page') } catch {} if (!target) await sleep(200) }
const ws = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((r) => (ws.onopen = r))
let id = 0
const pending = new Map()
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id) } }
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })) })

try {
  await send('Page.enable')
  await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false })
  const { result: { frameId } } = await send('Page.getFrameTree').then((r) => ({ result: { frameId: r.result.frameTree.frame.id } }))
  for (const card of todo) {
    await send('Page.setDocumentContent', { frameId, html: html(card) })
    for (let i = 0; i < 50; i++) {
      const r = await send('Runtime.evaluate', { expression: 'document.body.dataset.ready === "1"', returnByValue: true })
      if (r.result?.result?.value) break
      await sleep(100)
    }
    const shot = await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: 1200, height: 630, scale: 1 } })
    const file = path.join(outDir, `${slug(card.path)}.jpg`)
    await sharp(Buffer.from(shot.result.data, 'base64')).jpeg({ quality: 84, mozjpeg: true }).toFile(file)
    console.log(`${path.relative(root, file)}  ${Math.round(fs.statSync(file).size / 1024)} KB`)
  }
} finally {
  ws.close(); chrome.kill()
  setTimeout(() => fs.rmSync(profile, { recursive: true, force: true }), 500)
}
