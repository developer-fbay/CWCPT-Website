<script setup lang="ts">
/**
 * The site's button. White solid and white outline (`ghost`) on black; black solid and black outline
 * (`ghost-dark`) on white. Hover grows 1.04, then the pink tube catches round the edge 60ms later.
 * `cta` sets data-cta so GTM can count clicks without DOM selectors (hero_book_tour, offices_quote...).
 */
const props = withDefaults(
  defineProps<{
    to?: string
    variant?: 'white' | 'black' | 'ghost' | 'ghost-dark'
    sm?: boolean
    type?: 'button' | 'submit'
    cta?: string
    disabled?: boolean
  }>(),
  { variant: 'white', type: 'button' },
)
const external = computed(() => !!props.to && /^(https?:|mailto:|tel:)/.test(props.to))
const cls = computed(() => ['btn', `btn-${props.variant}`, { 'btn-sm': props.sm }])
</script>

<template>
  <a v-if="to && external" :href="to" :class="cls" :data-cta="cta"><slot /></a>
  <NuxtLink v-else-if="to" :to="to" :class="cls" :data-cta="cta"><slot /></NuxtLink>
  <button v-else :type="type" :class="cls" :data-cta="cta" :disabled="disabled"><slot /></button>
</template>
