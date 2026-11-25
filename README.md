# Co Work Cape Town website

The from-scratch rebuild of coworkcapetown.com in Nuxt 4 (Vue 3). Read `PLAN.md` for the decisions and the build order.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (a Node server), prerenders every page
npm start          # serve the build exactly as DigitalOcean runs it (PORT=3001 npm start for another port)
npm run images     # make web images (WebP) in public/images from the originals in _media-source/
npm run og         # make the share images (Open Graph) in public/images/og from app/data/og.json (needs Chrome)
npm run seo:check  # after a build: titles, descriptions, canonicals, H1s, alt text, images, sitemap, robots.txt
```

Run `npm run build` then `npm run seo:check` before every deploy. Errors fail it; read the warnings too.
`public/robots.txt` follows Codi's format (every search engine and AI crawler welcome, `/admin` and `/api/` closed).
`sitemap.xml` is written at build time from the prerendered pages, one `<loc>` per page; blog posts get a
`<lastmod>` from their `updated` or `date`.

Caching (set in `nuxt.config.ts`, explained at the top of it): pages are prerendered HTML that browsers check on
every visit, so a deploy shows at once; `/_nuxt` files are hashed and kept a year; images and icons are kept 30
days, so give a replaced photo a new file name; `/api` is never cached. Pages, scripts and styles are stored
compressed (Brotli and gzip) at build time. Addresses ending in a slash get a 301 to the one without
(`server/plugins/trailing-slash.ts`). Every blog post is prerendered, even ones only reachable through "Load more".
On any host but coworkcapetown.com (the DigitalOcean preview, localhost) every response says
`X-Robots-Tag: noindex, nofollow` (`server/plugins/preview-noindex.ts`), so the preview never gets indexed.

Needs Node 22 or newer. Copy `.env.example` to `.env` (never commit `.env`).

Original photos and brand files live in `_media-source/` (git-ignored, too big for the repo). `npm run images`
writes small WebP versions to `public/images/` and their sizes and alt text to `app/data/media.generated.json`;
add `-- --force` to remake them all.

## Deploy

DigitalOcean App Platform, from this repo's `main` (decided with Codi, 2026-11-20). Create the app as a
**Web Service**, not a Static Site: the contact form needs the server part.

| Setting | Value |
|---|---|
| Build command | `npm run build` (App Platform runs `npm ci` first) |
| Run command | `npm start` |
| HTTP port | `8080` (App Platform passes it as `PORT`, which the server reads) |
| Node | 22 or newer, from `engines` in `package.json` (builds tested on Node 24) |
| Env, run time (encrypted) | `NUXT_N8N_CONTACT_WEBHOOK`: the **Production URL** (`/webhook/`, not `/webhook-test/`) of the n8n workflow "CWCPT Website Contact Form"; `NUXT_N8N_WEBHOOK_SECRET`: the value of that workflow's `x-cwcpt-secret` Header Auth credential (and the Supabase ones if used) |

The form posts to `/api/contact`, which sends n8n a JSON body (`tab`, `tabLabel`, `name`, `company`, `email`, `phone`,
`country`, `looking`, `people`, `start`, `slot`, `message`, `ref`, `consent`, `page`, `receivedAt`) with the header
`x-cwcpt-secret`. If n8n refuses or doesn't answer within 10 seconds, the visitor sees "The form could not be sent"
and the reason goes to the runtime log (403: the secrets differ; 404: the workflow isn't published).

`NUXT_PUBLIC_SITE_URL` defaults to `https://coworkcapetown.com`. Leave it, even on the preview: canonicals and
the sitemap must name the real address, never the `*.ondigitalocean.app` one. Pushing to `main` deploys, so run
`npm run build` and `npm run seo:check` first. Old addresses that changed get a 301 in `routeRules`
(`nuxt.config.ts`).

## Where things are

| Folder | What lives there |
|---|---|
| `app/assets/styles/tokens.css` | Colours, glows (`--tube`, `--lit-text`, `--glow-icon`), motion, radius, fonts, the type scale (`--fs-display`, `--fs-h1`, `--fs-h2`...), spacing. Change a value here and it changes everywhere |
| `app/assets/styles/base.css` | Reset and type: `.wrap`, `.sec`, `.on-white`, `.mono` (headings), `.label`, `.lead`, `.muted`, `.dot` (the lit full stop), `.script`, `.prose`, `.crumbs` |
| `app/assets/styles/system.css` | The design system's shared classes: buttons, text link, tags with the light bar, chips, cards, facts, FAQ, form fields, tabs, tables, steps, the strip light and the scroll reveal |
| `app/components/ui` | Small reusable parts: Btn, TextLink, Tag, Rating, SectionHeading, Facts, FaqList, FeatureList, ReasonsBand, IconGrid, DataTable, StepsList, MapEmbed, PostCard, LogoStrip, RotatingWords, BackgroundVideo, StripLight, StripDefs |
| `app/components/sections` | Whole page sections: HomeHero, PageHero, PlanCards, OfficeCard, OfficeRow (the Offices list view), ReviewsMarquee, ClosingBand |
| `app/components/layout` | AppHeader (with the phone menu), AppFooter |
| `app/data` | All page content as typed data. Approved copy goes here, word for word |
| `app/composables/usePageSeo.ts` | One call per page for title, description, canonical, Open Graph, breadcrumbs, FAQPage and other JSON-LD |
| `app/pages` | One file per address |
| `content/blog` | Blog posts, one markdown file each (see `content/blog/README.md`) |
| `server/api` | `/api/contact` (form to n8n) and `/api/blog` (read at build time) |
| `public/images` | Web images: `brand/`, `photos/`, `stock/`, `hero/`, `blog/` |

## Add a blog post

Copy `content/blog/_template.md` to `content/blog/your-post-address.md`, fill in the frontmatter, write the post
in markdown, commit and push. The file name is the address (`/blog/your-post-address`). Full guide:
`content/blog/README.md`.

## Rules

- Components are used by file name: `<Btn>`, `<PageHero>`.
- Never type a colour or glow into a component: use a token. Pink is light, never paint: it only appears as glow
  (the lit full stop, the strip light, icon and text glows).
- Content never lives in a component: it comes from `app/data` through props.
- Anything in `[brackets]` in `app/data` is a brief still waiting for copy: never guess a price, size, term or hour.
  Briefs never reach the site: a page renders a block only when `filled(text)` is true (`app/utils/content.ts`).
  A whole page built ahead of its content goes in `hiddenPages` (`app/data/site.ts`): it answers 404, links to it
  disappear and it stays out of the sitemap. PLAN.md lists what each hidden part needs.
- Every main page has its own share image: add the page to `app/data/og.json` and run `npm run og`.
- The Home hero video can skip parts of the clip: `jumps` in `app/data/home.ts` ("at X seconds, jump to Y"). Open
  the Home page with `?video-time` in the address to see the playing time and find the seconds.
- Window sizes: add `?folds` to any address to see each section's height in screens (one screen = the window's
  height minus the header) and a dashed line where each screen ends. It stays on in that tab, across pages and
  reloads, until `?folds=off`. Check at 1920 x 940 (a 1080p screen at 100%), 1536 x 730 (the same at 125%) and
  1366 x 650 (a small laptop). Local dev server only (`npm run dev`): the live site ignores `?folds`.
- Section settling (still being tuned, local dev server only, never on the live site): on laptops and desktops,
  stop near a section's top and the page glides it in under the header (`app/plugins/section-settle.client.ts`;
  `REACH` and `SLACK` set how strongly). It never pulls a slow scroll back, and it is off on phones and for
  visitors who turn animations off. To turn it on for the live site, remove its `import.meta.dev` line.
- British English, no em dashes. Members use "tags", not "access cards". Review and FAQ text word for word.
- Prices in £ first, with the rand figure beside them as the approved copy gives it. Other currencies appear only
  through the Pricing display switch, converted at a confirmed, dated rate.
- Heading, figure and text sizes come from the `--fs-*` tokens, never a typed size (rules: one scale from the H1). Hero sizes follow the window's height too, so
  the whole hero fits a laptop at 125% or 150% scaling (checked at 1536 x 684 and 1280 x 600).
- One H1 per page. On Home the H1 is the keyword line ("Coworking space in Gardens, Cape Town"); the big name is
  decoration.
- FAQ schema comes from the same data the page shows, so the markup never says something the page does not.
- Scroll reveal: give a block `data-rv` and its parts `r-label`, `r-body`, `r-media`, `r-btns` or `r-item`.
  Content is visible without JavaScript and under reduced motion.
- No `:global(...)` inside scoped styles: Vue compiles `:global(.a) .b` to just `.a`, dropping the rest. To style
  a component's own element by a page-level class, write the plain selector (`.rv-ready .x`); scoping only marks
  the last part.
- Addresses have no slash at the end. Contact is `/contact-us`.
