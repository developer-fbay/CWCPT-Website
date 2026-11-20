<script setup lang="ts">
import type { BlogPost } from '~/data/types'

// One template for every post (wireframe BlogPost): built for reading. One column of about 70 characters on one
// left edge, a slim reading bar that takes the header's place once the title scrolls away, a contents list,
// "Questions about this" when the post has questions, share links, the next post and more in its category.
// No author name: the site has no named authors. Schema: BlogPosting, BreadcrumbList, FAQPage when it has questions.
const route = useRoute()
const slug = String(route.params.slug)
const { data: post } = await useFetch<BlogPost>(`/api/blog/${slug}`, { key: `blog-${slug}` })
if (!post.value) throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })

const p = post.value
const path = `/blog/${p.slug}`
const crumbs = [{ label: 'Home', to: '/' }, { label: 'Blog', to: '/blog' }, { label: p.title }]
usePageSeo({
  title: p.title,
  description: p.description,
  path,
  breadcrumbs: crumbs,
  faqs: p.faqs,
  image: p.image,
  schema: [articleSchema({ type: 'BlogPosting', headline: p.title, description: p.description, path, published: p.date, modified: p.updated, image: p.image })],
})

const { siteUrl } = useRuntimeConfig().public
const url = `${siteUrl}${path}`
const fmt = (d?: string) => (d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '')

// Reading bar: shows once the title has scrolled away, with progress
const titleEl = ref<HTMLElement>()
const barOn = ref(false)
const progress = ref(0)
const copied = ref(false)
function onScroll() {
  if (!titleEl.value) return
  barOn.value = titleEl.value.getBoundingClientRect().bottom < 0
  const h = document.documentElement
  progress.value = Math.min(1, h.scrollTop / Math.max(1, h.scrollHeight - innerHeight))
}
onMounted(() => { addEventListener('scroll', onScroll, { passive: true }); onScroll() })
onBeforeUnmount(() => removeEventListener('scroll', onScroll))
async function copyLink() {
  try { await navigator.clipboard.writeText(url); copied.value = true; setTimeout(() => (copied.value = false), 2000) }
  catch { /* clipboard blocked: the link is still on screen in the address bar */ }
}
</script>

<template>
  <div>
    <div class="bar" :class="{ 'bar--on': barOn }" aria-hidden="true">
      <div class="wrap bar__inner">
        <span class="bar__t">{{ p.title }}</span>
        <Btn to="/contact-us?for=tour" sm cta="blog_bar_tour">Book a tour</Btn>
      </div>
      <span class="bar__p" :style="{ transform: `scaleX(${progress})` }" />
    </div>

    <article class="post">
      <header class="wrap post__head" data-rv>
        <nav class="crumbs r-label" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink><span aria-hidden="true">/</span><NuxtLink to="/blog">Blog</NuxtLink>
        </nav>
        <p class="label r-label">{{ p.category }} · {{ p.readingMinutes }} min read · <time :datetime="p.date">{{ fmt(p.date) }}</time><template v-if="p.updated">, updated <time :datetime="p.updated">{{ fmt(p.updated) }}</time></template></p>
        <h1 ref="titleEl" class="mono h1 post__title"><span class="mask"><span>{{ p.title }}<span class="dot">.</span></span></span></h1>
      </header>

      <div class="wrap post__grid">
        <nav v-if="p.toc.length" class="toc" aria-label="Contents">
          <p class="label">Contents</p>
          <a v-for="h in p.toc" :key="h.id" :href="`#${h.id}`">{{ h.text }}</a>
        </nav>
        <div class="post__col">
          <img v-if="p.image" class="post__img" :src="p.image" :alt="p.imageAlt ?? ''" width="1280" height="720">
          <!-- eslint-disable-next-line vue/no-v-html -- our own markdown, rendered at build time -->
          <div class="body" v-html="p.html" />

          <section v-if="p.faqs.length" class="post__faq" aria-labelledby="pq-h">
            <h2 id="pq-h" class="mono h3">Questions about this<span class="dot">.</span></h2>
            <FaqList :items="p.faqs" :first-open="false" />
          </section>

          <div class="share">
            <p class="label">Share</p>
            <div class="row">
              <Btn :to="`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`" variant="ghost" sm>LinkedIn</Btn>
              <Btn :to="`https://wa.me/?text=${encodeURIComponent(`${p.title} ${url}`)}`" variant="ghost" sm>WhatsApp</Btn>
              <Btn variant="ghost" sm @click="copyLink">{{ copied ? 'Link copied' : 'Copy link' }}</Btn>
            </div>
          </div>
        </div>
      </div>
    </article>

    <section v-if="p.next" class="sec on-white" data-rv aria-label="Next post">
      <div class="wrap next">
        <PostCard :post="p.next" large />
        <div class="next__more">
          <p class="label">More in {{ p.category }}</p>
          <TextLink v-for="r in p.related" :key="r.slug" :to="`/blog/${r.slug}`">{{ r.title }}</TextLink>
          <TextLink to="/blog">All posts</TextLink>
        </div>
      </div>
    </section>

    <ClosingBand />
  </div>
</template>

<style scoped>
.bar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 60; background: var(--black); border-bottom: 1px solid #1c1c1c;
  transform: translateY(-100%); transition: transform var(--dur-grow) var(--ease-snap);
}
.bar--on { transform: none; }
.bar__inner { display: flex; align-items: center; justify-content: space-between; gap: 20px; min-height: 64px; }
.bar__t { font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.bar__p { position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; background: var(--white); transform-origin: left; }

.post { padding: clamp(40px, 6vw, 72px) 0 var(--sec-y); }
.post__head { display: flex; flex-direction: column; gap: 18px; padding-bottom: 40px; }
.post__title { font-size: var(--fs-h1); max-width: 18ch; }
.post__grid { display: grid; grid-template-columns: 220px minmax(0, 70ch); gap: 56px; align-items: start; }
.toc { position: sticky; top: calc(var(--header-h) + 24px); display: flex; flex-direction: column; gap: 10px; font-size: 14px; }
.toc a { text-decoration: none; opacity: 0.75; }
.toc a:hover { opacity: 1; text-decoration: underline; }
.post__col { display: flex; flex-direction: column; gap: 40px; min-width: 0; }
.post__img { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; border-radius: var(--radius); }
.body { font-size: var(--fs-lead); line-height: 1.7; }
.body :deep(h2) { font-weight: 900; font-stretch: 112%; text-transform: uppercase; font-size: 30px; line-height: 1; margin: 1.6em 0 0.6em; scroll-margin-top: 90px; }
.body :deep(h3) { font-weight: 800; font-size: 22px; margin: 1.4em 0 0.5em; }
.body :deep(p), .body :deep(ul), .body :deep(ol) { margin: 0 0 1em; }
.body :deep(a) { font-weight: 700; text-underline-offset: 3px; }
.body :deep(figure) { margin: 1.6em 0; }
.body :deep(figure img) { width: 100%; border-radius: var(--radius); }
.body :deep(figcaption) { font-size: 13px; color: var(--muted); margin-top: 8px; }
.body :deep(blockquote) { border-left: 2px solid var(--white); padding-left: 20px; margin: 1.4em 0; font-size: 20px; }
.post__faq { display: flex; flex-direction: column; gap: 24px; }
.share { display: flex; flex-direction: column; gap: 12px; border-top: 2px solid currentColor; padding-top: 22px; }
.next { display: grid; grid-template-columns: 1.4fr 1fr; gap: 48px; align-items: start; }
.next__more { display: flex; flex-direction: column; gap: 8px; align-items: flex-start; }
@media (max-width: 960px) {
  .post__grid, .next { grid-template-columns: 1fr; }
  .toc { position: static; }
}
</style>
