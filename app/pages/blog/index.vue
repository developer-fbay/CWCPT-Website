<script setup lang="ts">
import type { BlogCard } from '~/data/types'

// The blog index (wireframe BlogArchive): the newest post featured, category chips that filter without leaving
// the page, a grid, and Load more. Posts are markdown files in content/blog (see its README).
const crumbs = [{ label: 'Home', to: '/' }, { label: 'Blog' }]
const { siteUrl } = useRuntimeConfig().public
const seo = {
  title: 'The Co Work Cape Town blog',
  description: 'Working from Cape Town, running a team here and life at Wembley Square, Gardens: the Co Work Cape Town blog.',
}
usePageSeo({ ...seo, path: '/blog', breadcrumbs: crumbs, schema: [{ '@context': 'https://schema.org', '@type': 'Blog', name: seo.title, url: `${siteUrl}/blog` }] })

const { data: posts } = await useFetch<BlogCard[]>('/api/blog', { key: 'blog-all', default: () => [] })
const featured = computed(() => posts.value[0])
const rest = computed(() => posts.value.slice(1))
const categories = computed(() => [...new Set(posts.value.map((p) => p.category))])
const active = ref('All')
const shown = ref(6)
const filtered = computed(() => (active.value === 'All' ? rest.value : rest.value.filter((p) => p.category === active.value)))
const date = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
</script>

<template>
  <div>
    <PageHero title="The Co Work Cape Town blog" :crumbs="crumbs">
      <p>[SEO copy, about 40 words: what the blog covers, such as working from Cape Town, running a team here and life at Wembley Square.]</p>
    </PageHero>

    <section v-if="featured" class="sec feat-sec" data-rv aria-label="Newest post">
      <div class="wrap feat">
        <NuxtLink :to="`/blog/${featured.slug}`" class="zoom feat__img r-media">
          <img v-if="featured.image" :src="featured.image" :alt="featured.imageAlt ?? ''" width="1280" height="720">
        </NuxtLink>
        <div class="feat__text">
          <p class="label r-label">Newest post · {{ featured.category }}</p>
          <h2 class="mono h3 r-body"><NuxtLink :to="`/blog/${featured.slug}`">{{ featured.title }}</NuxtLink></h2>
          <p class="lead muted r-body">{{ featured.excerpt }}</p>
          <p class="cap r-body"><time :datetime="featured.date">{{ date(featured.date) }}</time> · {{ featured.readingMinutes }} min read</p>
          <div class="r-btns"><TextLink :to="`/blog/${featured.slug}`" light>Read the post</TextLink></div>
        </div>
      </div>
    </section>

    <section class="sec on-white" data-rv aria-labelledby="all-h">
      <div class="wrap stack-lg">
        <div class="sec-top">
          <SectionHeading id="all-h" :lines="['All', 'posts']" />
          <div v-if="categories.length > 1" class="chips r-body" role="group" aria-label="Filter posts by category">
            <button v-for="c in ['All', ...categories]" :key="c" type="button" class="chip" :class="{ 'chip--on': active === c }" :aria-pressed="active === c" @click="active = c; shown = 6">{{ c }}</button>
          </div>
        </div>
        <div v-if="filtered.length" class="grid">
          <PostCard v-for="p in filtered.slice(0, shown)" :key="p.slug" :post="p" />
        </div>
        <p v-else class="lead">[The first posts are on their way.]</p>
        <div v-if="filtered.length > shown" class="more"><Btn variant="ghost-dark" @click="shown += 6">Load more posts</Btn></div>
      </div>
    </section>

    <ClosingBand />
  </div>
</template>

<style scoped>
.stack-lg { display: flex; flex-direction: column; gap: 40px; }
.feat-sec { padding-top: 0; }
.feat { display: grid; grid-template-columns: 1.4fr 1fr; gap: 48px; align-items: center; }
.feat__img { display: block; aspect-ratio: 16 / 9; border-radius: var(--radius); background: #111111; }
.feat__text { display: flex; flex-direction: column; gap: 16px; align-items: flex-start; }
.feat__text h2 a { text-decoration: none; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-end; }
.chip { font-family: inherit; background: none; cursor: pointer; }
.chip--on { background: var(--black) !important; color: var(--white) !important; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 40px 16px; }
.more { display: flex; justify-content: center; }
@media (max-width: 960px) { .feat { grid-template-columns: 1fr; } .chips { justify-content: flex-start; } }
</style>
