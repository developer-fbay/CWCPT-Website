<script setup lang="ts">
/**
 * A centred row of logos (white on transparent, all exported on the same 1600x559 canvas so one width fits all).
 * Wraps on small screens. Optional lit label above.
 */
defineProps<{ items: { name: string; src: string }[]; label?: string }>()
</script>

<template>
  <div class="logos">
    <p v-if="label" class="label">{{ label }}</p>
    <ul class="logos__list">
      <li v-for="item in items" :key="item.name">
        <img class="logos__img" :src="item.src" :alt="item.name" width="200" height="70" loading="lazy" decoding="async">
      </li>
    </ul>
  </div>
</template>

<style scoped>
.logos { display: flex; flex-direction: column; align-items: flex-start; gap: 18px; }
.logos__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px clamp(1.25rem, 4vw, 3rem);
  margin: 0;
}
.logos__img { width: clamp(120px, 13vw, 170px); height: auto; opacity: 0.8; transition: opacity var(--dur-quick) var(--ease-out); }
@media (hover: hover) {
  .logos__img:hover { opacity: 1; }
}
</style>
