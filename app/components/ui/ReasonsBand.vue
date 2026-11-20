<script setup lang="ts">
/**
 * The reasons as one ruled strip drifting past (WhyBlack option A), each with the original site's glowing
 * icon, which stutters on hover; hovering pauses the strip. The list runs twice so the loop is seamless; the
 * second run is hidden from screen readers. Reduced motion: the strip stands still and wraps, so every
 * reason stays on screen.
 */
defineProps<{ items: { icon: string; label: string }[] }>()
</script>

<template>
  <div class="marq-wrap reasons">
    <ul class="marq reasons__track">
      <template v-for="copy in 2" :key="copy">
        <li
          v-for="item in items"
          :key="`${copy}-${item.label}`"
          class="usp reasons__item"
          :aria-hidden="copy === 2 ? 'true' : undefined"
        >
          <img class="ic" :src="`/icons/${item.icon}.svg`" alt="" width="30" height="30">
          <p>{{ item.label }}</p>
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped>
.reasons { border-block: 1px solid var(--line-mid); padding: 22px 0; }
.reasons__track { gap: 0; animation-duration: 45s; }
.reasons__item { display: inline-flex; align-items: center; gap: 14px; padding: 0 40px; white-space: nowrap; }
.reasons__item p { font-size: 17px; font-weight: 800; font-stretch: 104%; line-height: 1.3; }

@media (prefers-reduced-motion: reduce) {
  .reasons__track { width: auto; flex-wrap: wrap; justify-content: center; row-gap: 18px; animation: none; }
  .reasons__item[aria-hidden='true'] { display: none; }
}
</style>
