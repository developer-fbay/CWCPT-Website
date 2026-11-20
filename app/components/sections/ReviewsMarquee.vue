<script setup lang="ts">
import type { Review } from '~/data/reviews'

/**
 * Two rows of review cards drifting past in opposite directions (hover pauses them). Text word for word.
 * They run inside the page margins and fade in and out of the black at both sides (2026-11-20).
 * The rows repeat their cards so the loop is seamless; the repeats are hidden from screen readers.
 * Visitors who turn animations off get a still grid instead: every review once, inside the page margins.
 * Only one of the two is ever displayed, so screen readers never meet both.
 */
const props = defineProps<{ reviews: Review[] }>()
const half = Math.ceil(props.reviews.length / 2)
// A row needs at least four cards (4 x 386px is wider than the container), or its loop shows a gap at the right
// edge before it wraps. A short row borrows the reviews it doesn't have yet.
const MIN = 4
const pad = (row: Review[]) => [...row, ...props.reviews.filter((rv) => !row.includes(rv)).slice(0, Math.max(0, MIN - row.length))]
const rows = computed(() => [pad(props.reviews.slice(0, half + 1)), pad(props.reviews.slice(half - 1))])
// Every third card is black, starting at a different card in each row, and never two black cards side by side
// where a row's loop joins
const dark = (i: number, r: number) => (i + 2 * r) % 3 === 1
const initials = (n: string) => n.split(' ').map((w) => w[0]).join('').slice(0, 2)
</script>

<template>
  <div class="rm-root">
    <div class="wrap rm-clip">
      <div class="marq-wrap rm r-item">
        <div v-for="(row, r) in rows" :key="r" class="marq" :class="{ rev: r === 1 }">
          <template v-for="copy in 2" :key="copy">
            <figure
              v-for="(rv, i) in row"
              :key="`${copy}-${rv.name}`"
              class="lift rv"
              :class="dark(i, r) ? 'card-b' : 'card-w'"
              :aria-hidden="copy === 2 ? 'true' : undefined"
            >
              <blockquote class="rv__q">{{ rv.quote }}</blockquote>
              <figcaption class="rv__who">
                <span class="avatar" :class="dark(i, r) ? 'av-w' : 'av-b'">{{ initials(rv.name) }}</span>
                <span class="rv__meta"><b>{{ rv.name }}</b><span class="rv__src">Google review</span></span>
              </figcaption>
            </figure>
          </template>
        </div>
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
/* Cut off in line with the page margins; the cards come out of (and go into) the black at both sides. The
   padding (taken back by the margin) leaves room for a card's hover lift and glow. */
.rm {
  --fade: clamp(28px, 7vw, 110px);
  display: flex; flex-direction: column; gap: 16px;
  padding-block: 18px; margin-block: -18px;
  -webkit-mask-image: linear-gradient(90deg, transparent, var(--black) var(--fade), var(--black) calc(100% - var(--fade)), transparent);
  mask-image: linear-gradient(90deg, transparent, var(--black) var(--fade), var(--black) calc(100% - var(--fade)), transparent);
}
/* A margin rather than the track's gap, so half the track is exactly one copy and the loop never jumps */
.rm .marq { gap: 0; }
.rm .marq .rv { margin-right: 16px; }
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
  .rm-clip { display: none; }
  .rv-still { display: block; }
}
</style>
