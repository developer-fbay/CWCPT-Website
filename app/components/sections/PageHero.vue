<script setup lang="ts">
/**
 * Top of every inner page, in the logo's layout: a photo square crossed by the white mountain line on the left,
 * breadcrumbs, the heavy H1 ending in a lit full stop, lead text, buttons and the Google rating on the right.
 * Slots: default (lead), `actions`, `after` (anything under the buttons).
 */
withDefaults(
  defineProps<{
    title: string
    crumbs: { label: string; to?: string }[]
    image?: { src: string; alt: string; srcset?: string }
    rating?: boolean
  }>(),
  {
    image: () => ({
      src: '/images/hero/home-hero-poster-960.webp',
      srcset: '/images/hero/home-hero-poster-960.webp 960w, /images/hero/home-hero-poster-1920.webp 1920w',
      alt: "Lion's Head and Table Mountain at dusk",
    }),
  },
)
</script>

<template>
  <section class="ph" data-rv>
    <div class="wrap ph__grid">
      <div class="ph__sq r-media">
        <img :src="image.src" :srcset="image.srcset" sizes="(max-width: 960px) 90vw, 400px" :alt="image.alt" width="400" height="400" fetchpriority="high">
        <div class="line-mask ph__line" aria-hidden="true" />
      </div>
      <div class="ph__text">
        <nav class="crumbs r-label" aria-label="Breadcrumb">
          <template v-for="(c, i) in crumbs" :key="c.label">
            <NuxtLink v-if="c.to" :to="c.to">{{ c.label }}</NuxtLink>
            <span v-else aria-current="page">{{ c.label }}</span>
            <span v-if="i < crumbs.length - 1" aria-hidden="true">/</span>
          </template>
        </nav>
        <h1 class="mono h1"><span class="mask"><span>{{ title }}<span class="dot">.</span></span></span></h1>
        <div v-if="$slots.default" class="lead muted ph__lead r-body"><slot /></div>
        <div v-if="$slots.actions" class="row r-btns"><slot name="actions" /></div>
        <Rating v-if="rating" class="r-btns" :link="{ label: 'read them', to: '/about#reviews' }" />
        <slot name="after" />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* The whole hero fits a laptop screen at 125% scaling: the square follows the window's height as well */
.ph { padding: clamp(28px, 6vh, 64px) 0 clamp(48px, 7vw, 88px); }
.ph__grid { display: grid; grid-template-columns: minmax(0, min(400px, calc(100vh - var(--header-h) - 110px))) 1fr; gap: clamp(32px, 5vw, 64px); align-items: center; }
.ph__sq { position: relative; aspect-ratio: 1 / 1; overflow: hidden; background: #111111; }
.ph__sq img { width: 100%; height: 100%; object-fit: cover; }
.ph__line { position: absolute; left: -0.5%; top: 0.5%; width: 101%; height: 101%; }
.ph__text { display: flex; flex-direction: column; gap: clamp(14px, 2.6vh, 20px); min-width: 0; }
.ph__lead { display: flex; flex-direction: column; gap: 14px; max-width: 640px; }
@media (max-width: 960px) {
  .ph__grid { grid-template-columns: 1fr; }
  .ph__sq { max-width: 420px; }
}
</style>
