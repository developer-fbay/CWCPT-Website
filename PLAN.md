# Build plan

Started 2026-11-16, updated 2026-11-20. Jesse builds the whole site; the master to-do list is the Notion task
"Co Work Cape Town rebuild: build the new pages from the wireframes". Sources, in order: the approved copy for each
page (linked from its Notion task; every word and fact), the page wireframes (the structure: sections, order,
links and schema, not the look), the black and white design system (the look: black and white from the logo, pink
used only as light), then the live WordPress site. The first rebuild repo is reference only.

## Decisions

| Topic | Decision | Why |
|---|---|---|
| Framework | Nuxt 4 (Vue 3), TypeScript | Vue with server rendering built in: the best Vue setup for SEO |
| Rendering | Every page prerendered to static HTML at build time | Fastest loads, full HTML for Google, nothing to wait for |
| Styling | Plain CSS with design tokens, scoped styles per component | No framework to download; one place to change the look |
| Fonts | Archivo and Mr Dafoe, self-hosted through `@fontsource` | No call to Google Fonts, faster first paint |
| Content | Typed data files in `app/data`, passed to components as props; the approved copy word for word | Copy changes never touch layout code |
| Components | Small `ui` parts, whole `sections`, `layout` | Every page is a list of sections |
| SEO | `usePageSeo` per page with the SEO title and description from the approved copy; CoworkingSpace schema site-wide; BreadcrumbList on inner pages; FAQPage wherever a page shows questions (Home included), built from the same data; Article on the guides; Blog and BlogPosting on the blog; sitemap module, robots.txt | Same pattern on every page |
| Motion | CSS only, durations and easings from tokens; scroll reveal marks blocks with `data-in`; everything stops under reduced motion | No animation library, no hydration mismatch |
| Blog | Markdown files in `content/blog`, read at build time and prerendered; nothing comes from WordPress | Posts are plain files anyone can add; no CMS to run |
| Home H1 | The keyword line ("Coworking space in Gardens, Cape Town"); the big "Co Work Cape Town" name is decoration | The H1 carries the search phrase |
| Hosting | DigitalOcean App Platform, a Web Service running the Node server (`node-server` preset), deployed from `main` of developer-fbay/CWCPT-Website | Codi's choice (2026-11-20), the same setup as his other sites; the contact form needs the server part, so a Static Site is not enough |
| Forms | Site → `/api/contact` (Nuxt server route) → n8n → a lead in Close, plus a Gravity Forms entry so the existing inbox keeps filling | Webhook URL and secret stay server side; the site itself never talks to WordPress |
| Database | The existing Co Work Cape Town Supabase project (shared with the member booking system), website tables in their own schema | One project to run; booking tables stay untouched |

Decided 2026-11-16 (blog and Home H1: 2026-11-18; hosting changed from Cloudflare Workers to DigitalOcean on
2026-11-20, with Codi).

## To confirm with Codi

- [ ] The DigitalOcean app: plan size, the settings in README "Deploy", the n8n secrets, and pointing `coworkcapetown.com`
      at it at launch (keep the email MX, SPF and DKIM records and `meet.` for the booking system)
- [ ] Where n8n runs (n8n Cloud or self-hosted) and who builds the contact workflow
- [ ] The hostname WordPress keeps after the DNS move, so n8n can still write Gravity Forms entries
- [ ] Switching off the old Zapier contact-form zap at the moment the n8n flow goes live (or Close gets two leads)
- [x] GitHub repo for v2: `developer-fbay/CWCPT-Website`, recreated 2026-11-20 (the first rebuild's branches are gone);
      commits go straight to `main`
- [ ] The CTA section design the marketing team discussed on the DigitalOcean build (the closing band from the
      design canvas stands in for now)
- [ ] "Coworking" in the menu: placed for now, linking to the dedicated desks plan on Pricing
- [ ] Prices: the Notion task says "£ only"; the approved copy shows rand beside pounds, which the site follows
- [ ] Contact form fields and tabs (the wireframe has a set)
- [ ] The open QA points in the approved copy for Offices, Pricing, Meeting rooms and Location
- [ ] The real Google Maps link
- [ ] Copy for the pages that have none yet: Home, About, FAQ, Contact, International Teams, UK, Offshore team cost, Office cost guide
- [ ] Figures for the offshore team cost page, and whether the calculator is built

## Built (2026-11-18)

- [x] Black and white tokens, base type, the design system's shared classes, self-hosted Archivo (width axis) and Mr Dafoe
- [x] Header (phone menu below 1080px), footer (four columns), skip link, breadcrumbs inside each hero
- [x] Shared parts: Btn, TextLink, Tag, Rating, SectionHeading, Facts, FaqList, FeatureList, IconGrid, DataTable,
      StepsList, MapEmbed (loads on click), PostCard, LogoStrip, RotatingWords, BackgroundVideo, StripLight
- [x] Sections: HomeHero, PageHero, PlanCards (with the GBP / ZAR / USD display switch), OfficeCard, ReviewsMarquee, ClosingBand
- [x] SEO helper, CoworkingSpace schema, FAQPage and BreadcrumbList, sitemap, robots.txt
- [x] Redirects: `/gallery` → `/location`, `/book-a-tour` and `/contact` → `/contact-us`
- [x] Every page in the new design: Home, Offices, Pricing, Meeting rooms, Location, Contact, About, FAQ,
      International Teams, UK, Offshore team cost, Office cost guide, Blog, blog post, Privacy policy, 404
- [x] Markdown blog (`content/blog`), with contents list, share links, next post and per-post FAQ schema
- [x] Contact form: four tabs, pre-selected by link, honeypot, GA4 events; `/api/contact` forwards to n8n (needs the webhook set)
- [x] Node server build for DigitalOcean (`npm start`); every page prerenders
- [x] Hosting SEO pass (2026-11-19): robots.txt in Codi's format; sitemap.xml written at build time (plain `<loc>`
      list, `<lastmod>` for blog posts); a stand-in Open Graph image (`og-default.jpg`, 1200 x 630, made by
      `npm run images`); article tags on posts and guides; no doubled brand in titles; 30-day browser cache for
      images and icons; the mountain-line mask as WebP; the Home hero still picks the right size;
      `npm run seo:check` for every deploy. JS, CSS and HTML were already minified by the build
- [x] Caching (2026-11-19, moved to DigitalOcean 2026-11-20): pages checked on every visit, `/_nuxt` a year, images
      and icons 30 days, `/api` never cached; Brotli and gzip copies made at build time; addresses ending in a slash
      301 to the one without; every blog post prerendered; the `*.ondigitalocean.app` preview sends `noindex`.
      Map any old WordPress address that changed in `routeRules` before launch

- [x] QA fixes (2026-11-20): privacy and cookie policy from the live site; unfinished blocks and pages hidden
      (see below); reviews work with animations off; phone menu and form errors work by keyboard and screen reader;
      the open FAQ "?" readable on white; a share image, title and alt text per page; currency switch GBP and ZAR;
      sentence-case buttons; a photo per hero; balanced partner logos; contrast, phone format and office card fixes

## Build order

0. **Git and design foundation:** put v2 in the repo (done 2026-11-20); add `PROJECT_STATE.md`; swap in the black
   and white tokens and base styles; rebuild the shared parts (buttons, headings with the lit full stop, text link
   with arrow, square badges with the light bar, cards, FAQ, header, footer) and add the strip light. The neon parts
   (tube H1, pink buttons, neon wave, glass pills) go.
1. **Fix the facts:** bring `app/data` in line with the approved copy (desk and office prices, desk counts,
   the ninth office's name). Take out office sizes and floors, which are not published. Move copy that sits inside
   page files into `app/data`.
2. **Offices:** rebuild to the approved copy, in the wireframe's order (nine office blocks with anchors, what
   every office includes, moving in, companies abroad, questions, closing CTA)
3. **Pricing:** rebuild to the approved copy (three plans, what's included, terms in plain words, questions) and
   the display-only GBP / ZAR / USD switch (USD at a confirmed, dated rate). No floor plan for now
4. **Meeting rooms:** build from the approved copy (six rooms, members, non-members, what's in every room, questions)
5. **Location:** build from the approved copy (map, getting here, around the square, inside the space, hours,
   contact), LocalBusiness schema
6. **Contact:** four tabs (tour in person, video walkthrough, get a quote, ask a question), pre-selected by link
   (`?for=office&ref=lekker`); `/api/contact` → n8n → Close and Gravity Forms; spam protection (honeypot, maybe
   Cloudflare Turnstile); GA4 events on submit; noindex thank-you state
7. **Home:** the wireframe's structure in the new design: split hero with the video (heading left, video in the
   logo square), key facts, why teams work here, what you can rent, offices, location with the map, reviews, the
   three newest blog posts, four questions, closing band; finish when its approved copy arrives
8. **About**, **FAQ**: built from the live and approved copy; finish when their own copy arrives
9. **International Teams**, **UK**, **Offshore team cost**: when copy and figures arrive
10. **Office cost guide** (Article schema): when copy arrives
11. **Blog**: the index (`/blog`: featured newest post, category chips, grid, Load more) and one post template
    (`/blog/[slug]`: built for reading, contents list, share links, next post), built. Posts are markdown files in
    `content/blog`; old posts that are kept move over by hand with the same addresses. A web upload screen (a
    git-based editor) can come later. **Privacy Policy** (waits for the reviewed text), 404 and Thank You
12. **Before launch:** point `coworkcapetown.com` at the DigitalOcean app, set the secrets, keep WordPress
    reachable for the Gravity Forms step, switch off the old zap, trailing-slash redirects, tracking (CookieYes,
    GTM, GA4, LinkedIn) loaded after consent, checks at 1920, 1366 and 390, Lighthouse, every link tested

Running alongside: **assets** (real logo SVG, favicon, Open Graph image `public/images/og-default.jpg`, photos of
every office, room and zone, hero video).

## Hidden until built (2026-11-20)

Nothing unfinished shows on the site. Two mechanisms, both automatic:

- **Whole pages** in `hiddenPages` (`app/data/site.ts`) answer 404, are never linked (Btn, TextLink and the footer
  skip links to them) and stay out of the sitemap. Take a path out of the list to publish it. The blog does the same
  by itself until `content/blog` has its first post.
- **Blocks inside live pages** whose text is still a `[bracketed]` brief in `app/data` are not rendered (`filled()` in
  `app/utils/content.ts`). Replace the brief with the real copy and the block appears.

| Hidden | What it needs to go live |
|---|---|
| `/international-teams/offshore-team-cost` | Salary, employer of record fee and equipment per seat for sales, support and developer roles, each with a named, dated source (and leadership's yes to publishing the EOR fee); the cost-against-London chart; what the figures leave out; the five-seat worked example |
| `/office-cost-cape-town` | Lease rent per m² and serviced office per person by area, with broker sources and year; what a lease leaves out; the 12-month comparison; when a lease or a serviced office makes sense; an author with a real name |
| `/blog` | The intro (about 40 words) and the first posts (`content/blog/README.md`) |
| About: "Why it exists", "The people", "Part of a group", "Mentions" | The story (2 or 3 paragraphs); names, roles and photos; which sister companies to name; press and directory listings |
| International Teams: "How it works from abroad", "Why Cape Town", two "What's handled" items | The three steps, the forwardable block for employers, onboarding and growing terms |
| UK: London comparison, "A UK client here" | A London desk price with source; a client case snapshot |

## Needs copy or answers from Jesse and the team

Each item fills a hidden block or settles a question; the data file is named so it can be dropped straight in.

- [ ] **Contact** (`contact.ts`): the intro, the three "What happens next" steps (with the tour's length), the
      thank-you line; approve or replace the consent line written from the privacy policy
- [ ] **FAQ** (`faq.ts`): the intro and the two help lines ("Still have a question?", "Rather just see it?")
- [ ] **Home** (`home.ts`): the "More than just desks" copy (about 150 words) and the location teaser (about 60 words)
- [ ] **About** (`about.ts`): the hero paragraph and "Facts checked: month and year", plus the hidden sections above
- [ ] **International Teams and UK** (`international.ts`): both hero intros, plus the hidden blocks above
- [ ] **404** (`site.ts` notFound): the message
- [ ] **Meeting rooms**: which photo is which room. img-5124, img-5150, img-5153 and img-5170 in `public/images/photos`
      look like the rooms; the cards use three stand-ins (capacities stay unpublished, as approved)
- [ ] **Location**: a photo of Table Mountain from the space (the fourth photo in "Around Wembley Square")
- [ ] **Billing currencies**: the copy still says "GBP, USD, ZAR or EUR" (Pricing, Offices, International, About,
      FAQ answers). The display switch is now GBP and ZAR: keep the billing line, or bill in GBP and ZAR only?
- [ ] **Offices FAQ "Is parking included?"** gives rand first (R2,150 (£96.74)); FAQ text is word for word, so it
      stays until the copy owner swaps it to £ first like everywhere else
- [ ] **Offices "How moving in works"**: the approved line "We do not have a walkthrough video" now reads "You can
      also book a video walkthrough" (Jesse, 2026-11-20): tell the copy owner
- [ ] **Social profiles** (Instagram, LinkedIn, Google Business) for the footer and the schema's sameAs
- [ ] **The real Google listing link**, so "Read all reviews" goes to Google instead of the About page

## Known gaps

- Review cards all show five stars: confirm each real rating on Google first (overall rating is 4.6).
- The photo on each office card is a stand-in until each photo is matched to its office.
