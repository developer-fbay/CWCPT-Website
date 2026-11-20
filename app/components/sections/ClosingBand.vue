<script setup lang="ts">
import { closingBand } from '~/data/site'

/**
 * The closing band from the design canvas: the logo's mountain line as a strip light across the band, and
 * "Book your desk." with the tour buttons at its foot. One per page, at the bottom. Props override the text.
 */
const props = withDefaults(
  defineProps<{
    label?: string
    lines?: string[]
    /** A short line under the heading (from a page's approved copy) */
    text?: string
    actions?: { label: string; to: string; cta?: string; variant?: 'white' | 'ghost' }[]
  }>(),
  {},
)
const label = computed(() => props.label ?? closingBand.label)
const lines = computed(() => props.lines ?? closingBand.lines)
const actions = computed(() => props.actions ?? closingBand.actions)
</script>

<template>
  <section class="band" data-rv aria-label="Book a tour">
    <div class="band__inner">
      <StripLight shape="mountain" />
      <div class="band__text">
        <p class="label r-label">{{ label }}</p>
        <h2 class="mono band__h">
          <span v-for="(line, i) in lines" :key="line" class="mask">
            <span :style="{ '--l': i }">{{ line }}<span v-if="i === lines.length - 1" class="dot">.</span></span>
          </span>
        </h2>
        <p v-if="text" class="lead muted band__p r-body">{{ text }}</p>
        <div class="row r-btns band__btns">
          <Btn v-for="a in actions" :key="a.label" :to="a.to" :variant="a.variant ?? 'white'" :cta="a.cta">{{ a.label }}</Btn>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.band { position: relative; padding: 40px 0 0; overflow: hidden; }
.band__inner { position: relative; max-width: var(--band-max); margin: 0 auto; }
.band__text { position: absolute; right: 6%; bottom: 9%; display: flex; flex-direction: column; gap: 22px; align-items: flex-end; text-align: right; }
.band__h { font-size: var(--fs-band); }
.band__btns { justify-content: flex-end; }
.band__p { max-width: 460px; }
@media (max-width: 960px) {
  .band__text { position: static; padding: 0 var(--gutter) 48px; align-items: flex-start; text-align: left; }
  .band__btns { justify-content: flex-start; }
}
</style>
