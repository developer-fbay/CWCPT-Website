// Turns the original media in _media-source/ (git-ignored) into small web images in public/images,
// and writes app/data/media.generated.json (path, size and alt text for each image).
// Run: npm run images            (skips files already made)
//      npm run images -- --force (remakes everything)
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const source = path.join(root, '_media-source', 'wp')
const out = path.join(root, 'public', 'images')
const force = process.argv.includes('--force')

const manifest = JSON.parse(fs.readFileSync(path.join(source, 'manifest.json'), 'utf8'))

// Brand pieces get fixed names; everything else is named from its alt text plus the original file number.
const brandNames = {
  'CWCT-logo-transparent-background': 'logo-transparent',
  'CWCT_Logo_black': 'logo-black',
  'Frame-76-1': 'neon-divider',
  'Frame-79': 'heading-underline-mobile',
  'Google-Review-Logo-1': 'google-review-logo',
  'Group-12': 'heading-underline',
  'Group-13-1': 'heading-underline-long',
  'Group-13-2': 'heading-underline-wide',
  'Group-13-3': 'heading-underline-thin',
  'The_Legends_Agency-Logo-white': 'partner-the-legends-agency',
  'fbx-logo-horizontal-white': 'partner-fbx-capital-partners',
  'Funding-Bay-Logo-white': 'partner-funding-bay',
  'Employer-of-Record-Logo-white-1': 'partner-employer-of-record-sa',
}

const stem = file => file.replace(/^\d{4}_\d{2}_/, '').replace(/\.(png|jpe?g)$/i, '').replace(/-scaled$/, '')
const slug = s => s.toLowerCase().replace(/\bcwcpt\b/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const fileNumber = s => (s.match(/(\d{4,})(?!.*\d)/) || [])[1] || ''

function nameFor(item) {
  const s = stem(item.file)
  if (item.group === 'brand') return brandNames[s] || slug(s)
  if (item.group === 'hero') return 'home-hero-poster'
  const base = slug(item.alt) || slug(s)
  const num = fileNumber(s)
  return num && !base.endsWith(num) ? `${base}-${num}` : base
}

// Widths per group. Photos get two sizes for srcset; brand pieces keep one.
const widths = { photos: [1600, 800], stock: [1600, 800], hero: [1920, 960], brand: [1600], plans: [2560, 1280] }
// Brand pieces with their own widths: full-width pieces keep 2560px; logos are shown small (header ~106px,
// footer ~180px), so 600px is sharp on any screen and only a few KB.
const brandWidths = { 'neon-divider': [2560], 'heading-underline-long': [2560], 'logo-transparent': [600], 'logo-black': [600] }

const index = []
let made = 0
for (const item of manifest) {
  if (item.file === '2025_07_Favicon.png') continue // handled below
  const input = path.join(source, item.group, item.file)
  const name = nameFor(item)
  const dir = path.join(out, item.group)
  fs.mkdirSync(dir, { recursive: true })
  const meta = await sharp(input).metadata()
  const files = []
  const groupWidths = (item.group === 'brand' && brandWidths[name]) || widths[item.group]
  for (const w of groupWidths) {
    const width = Math.min(w, meta.width)
    const suffix = groupWidths.length > 1 ? `-${w}` : ''
    const file = path.join(dir, `${name}${suffix}.webp`)
    if (force || !fs.existsSync(file)) {
      await sharp(input).rotate().resize({ width, withoutEnlargement: true })
        .webp({ quality: item.group === 'brand' ? 90 : 72, alphaQuality: 100, effort: 5 })
        .toFile(file)
      made++
    }
    const { width: fw, height: fh } = await sharp(file).metadata()
    files.push({ src: `/images/${item.group}/${path.basename(file)}`, width: fw, height: fh, kb: Math.round(fs.statSync(file).size / 1024) })
  }
  index.push({ key: name, group: item.group, alt: item.alt, original: item.source, files })
}

// Favicons from the old site's favicon (white square, black Table Mountain line), in the sizes browsers,
// phones and Google ask for (Google wants a multiple of 48px). Linked in nuxt.config.ts.
const fav = path.join(source, 'brand', '2025_07_Favicon.png')
if (fs.existsSync(fav)) {
  for (const [file, size] of [['favicon-32.png', 32], ['favicon-48.png', 48], ['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
    const target = path.join(root, 'public', file)
    if (force || !fs.existsSync(target)) { await sharp(fav).resize(size, size).png({ compressionLevel: 9 }).toFile(target); made++ }
  }
}

// Default Open Graph image (link previews on LinkedIn, WhatsApp, Facebook, X): the hero view, darkened, with the
// white logo. 1200 x 630 JPEG, because not every app shows WebP previews. Pages without their own image use it
// (usePageSeo). A stand-in until a designed one arrives: replace the file, or change this step.
const ogFile = path.join(out, 'og-default.jpg')
const heroSource = manifest.find((i) => i.group === 'hero')
const logoSource = manifest.find((i) => stem(i.file) === 'CWCT-logo-transparent-background')
if (heroSource && logoSource && (force || !fs.existsSync(ogFile))) {
  const bg = await sharp(path.join(source, 'hero', heroSource.file)).resize(1200, 630, { fit: 'cover' }).modulate({ brightness: 0.5 }).toBuffer()
  const logo = await sharp(path.join(source, 'brand', logoSource.file)).resize({ width: 560 }).toBuffer()
  const { width: lw, height: lh } = await sharp(logo).metadata()
  await sharp(bg).composite([{ input: logo, left: Math.round((1200 - lw) / 2), top: Math.round((630 - lh) / 2) }])
    .jpeg({ quality: 82, mozjpeg: true }).toFile(ogFile)
  made++
}

index.sort((a, b) => a.group.localeCompare(b.group) || a.key.localeCompare(b.key))
fs.writeFileSync(path.join(root, 'app', 'data', 'media.generated.json'), JSON.stringify(index, null, 2) + '\n')

const totalKb = index.flatMap(i => i.files).reduce((n, f) => n + f.kb, 0)
console.log(`${index.length} images, ${made} files written, ${(totalKb / 1024).toFixed(1)} MB in public/images`)
