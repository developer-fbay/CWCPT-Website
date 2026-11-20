<script setup lang="ts">
import { footerColumns, site } from '~/data/site'

const year = new Date().getFullYear()
// Links to hidden pages (useHiddenPages) stay out until those pages are published
const isHidden = useHiddenPages()
const columns = footerColumns.map((c) => ({ ...c, links: c.links.filter((l) => !isHidden(l.to)) }))
</script>

<template>
  <footer class="on-white foot">
    <div class="wrap foot__inner">
      <div class="foot__grid">
        <div class="foot__brand">
          <NuxtLink to="/" class="foot__logo" aria-label="Co Work Cape Town home">
            <img :src="site.logo.dark.src" :width="site.logo.dark.width" :height="site.logo.dark.height" :alt="site.name" loading="lazy" decoding="async">
          </NuxtLink>
          <p class="foot__addr">{{ site.address.street }}<br>{{ site.address.locality }} {{ site.address.postalCode }}</p>
          <a :href="`mailto:${site.email}`" class="foot__mail">{{ site.email }}</a>
          <a :href="site.phoneHref">{{ site.phone }}</a>
        </div>
        <nav v-for="col in columns" :key="col.title" :aria-label="col.title" class="foot__col">
          <p class="label">{{ col.title }}</p>
          <NuxtLink v-for="link in col.links" :key="link.label" :to="link.to">{{ link.label }}</NuxtLink>
        </nav>
      </div>
      <div class="foot__bottom">
        <span>© {{ year }} Co Work Cape Town</span>
        <span class="foot__legal"><NuxtLink to="/privacy-policy">Privacy policy</NuxtLink></span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.foot { padding: 72px 0 40px; }
.foot a { text-decoration: none; font-size: 15px; line-height: 1.4; }
.foot a:hover { text-decoration: underline; text-underline-offset: 4px; }
.foot__inner { display: flex; flex-direction: column; gap: 48px; }
.foot__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr)); gap: 32px; }
@media (min-width: 1080px) { .foot__grid { grid-template-columns: 1.3fr repeat(4, minmax(0, 1fr)); } }
.foot__brand, .foot__col { display: flex; flex-direction: column; gap: 12px; }
.foot__brand { gap: 14px; }
.foot__logo { display: block; align-self: flex-start; line-height: 0; }
.foot__logo img { height: 82px; width: auto; }
.foot__addr { font-size: 15px; line-height: 1.55; color: var(--ink-2); }
.foot__mail { font-weight: 800; }
.foot__bottom { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px; border-top: 2px solid var(--black); padding-top: 22px; font-size: 13px; color: var(--muted-dark); }
.foot__legal { display: flex; gap: 22px; }
.foot__bottom a { font-size: 13px; }
</style>
