<script setup lang="ts">
import { site } from '~/data/site'
/** "4.6 on Google" with the lit outline star (in a black square on white). Optional link after it. */
defineProps<{ link?: { label: string; to: string } }>()
</script>

<template>
  <span class="rating">
    <span class="star-wrap" aria-hidden="true">
      <svg class="star" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round">
        <path d="M12 2.8l2.84 5.76 6.36.92-4.6 4.48 1.09 6.33L12 17.3l-5.69 2.99 1.09-6.33-4.6-4.48 6.36-.92z" />
      </svg>
    </span>
    {{ site.rating }} on Google
    <template v-if="link">
      <span class="muted" aria-hidden="true">·</span>
      <TextLink :to="link.to" light>{{ link.label }}</TextLink>
    </template>
  </span>
</template>

<style scoped>
.rating { display: inline-flex; flex-wrap: wrap; align-items: center; gap: 10px 12px; font-weight: 800; font-size: 15px; }
.star { color: var(--white); }
</style>
