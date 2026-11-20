<script setup lang="ts">
import type { Review } from '~/data/reviews'

/**
 * Two rows of review cards drifting past in opposite directions (hover pauses them). Text word for word.
 * The rows repeat their cards so the loop is seamless; the repeats are hidden from screen readers.
 * Visitors who turn animations off get a still grid instead: every review once, inside the page margins.
 * Only one of the two is ever displayed, so screen readers never meet both.
 */
const props = defineProps<{ reviews: Review[] }>()
const half = Math.ceil(props.reviews.length / 2)
const rows = computed(() => [props.reviews.slice(0, half + 1), props.reviews.slice(half - 1)])
const initials = (n: string) => n.split(' ').map((w) => w[0]).join('').slice(0, 2)
</script>

<template>
  <div class="rm-root">
    <div class="marq-wrap rm r-item">
      <div v-for="(row, r) in rows" :key="r" class="marq" :class="{ rev: r === 1 }">
        <template v-for="copy in 2" :key="copy">
          <figure
            v-for="(rv, i) in row"
            :key="`${copy}-${rv.name}`"
            class="lift rv"
            :class="(i + r) % 3 === 1 ? 'card-b' : 'card-w'"
            :aria-hidden="copy === 2 ? 'true' : undefined"
          >
            <blockquote class="rv__q">{{ rv.quote }}</blockquote>
            <figcaption class="rv__who">
              <span class="avatar" :class="(i + r) % 3 === 1 ? 'av-w' : 'av-b'">{{ initials(rv.name) }}</span>
              <span class="rv__meta"><b>{{ rv.name }}</b><span class="rv__src">Google review</span></span>
            </figcaption>
          </figure>
        </template>
      </div>
    </div>

    <div class="wrap rv-still">
      <ul class="rv-grid r-item">
        <li v-for="(rv, i) in reviews" :key="rv.name">
          <figure class="rv" :class="i % 3 === 1 ? 'card-b' : 'card-w'">
            <blockquote class="rv__q">{{ rv.quote }}</blockquote>
            <figcaption class="rv__who">
              <span class="avatar" :class="i % 3 === 1 ? 'av-w' : 'av-b'">{{ initials(rv.name) }}</span>
              <span class="rv__meta"><b>{{ rv.name }}</b><span class="rv__src">Google review</span></span>
            </figcaption>
          </figure>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.rm { display: flex; flex-direction: column; gap: 16px; }
.rv { width: min(370px, 82vw); flex: none; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; gap: 18px; margin: 0; }
.rv__q { font-size: var(--fs-body); line-height: 1.55; font-weight: 500; }
.rv__who { display: flex; gap: 12px; align-items: center; }
.rv__meta { display: flex; flex-direction: column; gap: 2px; }
.rv__src { font-size: 12px; color: var(--muted-dark); }
.card-b .rv__src { color: var(--grey); }
.av-b { background: var(--black); color: var(--white); }
.av-w { background: var(--white); color: var(--black); }

/* The still grid, for visitors who turn animations off */
.rv-still { display: none; }
.rv-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 16px; list-style: none; margin: 0; padding: 0; }
.rv-grid li { display: flex; }
.rv-grid .rv { width: 100%; }
@media (prefers-reduced-motion: reduce) {
  .marq-wrap { display: none; }
  .rv-still { display: block; }
}
</style>
